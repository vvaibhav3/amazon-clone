import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { detailsUser } from '../actions/userActions';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading,error,user}= userDetails;
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        //TODO : dispatch profile update
    }

    useEffect(()=>{
        dispatch(detailsUser(userInfo._id));
    },[dispatch, userInfo._id]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? (<Loader></Loader>) :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    <> 
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter name" value={user.name} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter email" value={user.email} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter password" />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" id="confirmPassword" placeholder="Enter confirm password" />
                        </div>

                        <div>
                            <lable />
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>
                }
            </form>            
        </div>
    )
}
