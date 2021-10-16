import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const redirect= props.location.search ? props.location.search.split("=")[1] : "/";

    const userRegister= useSelector(state => state.userRegister);
    const {userInfo,laoding,error} =userRegister;

    console.log(props.location.search.split("=")); 
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password===confirmPassword)
            dispatch(register(name,email,password));
        else
            alert("confrim password doesn't match...");
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    },[userInfo,redirect,props.history]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {laoding && <Loader></Loader>}
                {error && <MessageBox variant="danger">{error}</MessageBox> }
                <div>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" id="name" placeholder="Enter name"
                        onChange={e => { setName(e.target.value)}}
                    required>
                    </input>
                </div>
                
                <div>
                    <label htmlFor="email">
                        Email Address
                    </label>
                    <input type="email" id="email" placeholder="Enter email address"
                        onChange={e => { setEmail(e.target.value)}}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" placeholder="Enter password"
                        onChange={e => { setPassword(e.target.value)}}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="confirmPassword">
                        Confirm password
                    </label>
                    <input type="password" id="confirmPassword" placeholder="Enter confirm password"
                        onChange={e => { setConfirmPassword(e.target.value)}}
                    required>
                    </input>
                </div>

                <div>
                    <button type="submit" className="primary" >Register</button>
                </div>
                <div>
                    Already have an account ? {" "} <Link to={`/signin?redirect=${redirect}`}>Sign-in</Link>
                </div>
            </form>
        </div>
    )
}
