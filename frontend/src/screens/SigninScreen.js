import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const redirect= props.location.search ? props.location.search.split("=")[1] : "/";

    const userSignin= useSelector(state => state.userSignin);
    const {userInfo,laoding,error} =userSignin;

    console.log(props.location.search.split("=")); 
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password));
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
                    <h1>Signin</h1>
                </div>
                {laoding && <Loader></Loader>}
                {error && <MessageBox variant="danger">{error}</MessageBox> }
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
                        Email password
                    </label>
                    <input type="password" id="password" placeholder="Enter password"
                        onChange={e => { setPassword(e.target.value)}}
                    required>
                    </input>
                </div>
                <div>
                    <button type="submit" className="primary" >Sign In</button>
                </div>
                <div>
                    New customer ? {" "} <Link to="/register" >Create new account</Link>
                </div>
            </form>
        </div>
    )
}
