import React, { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading,error,user}= userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdateProfile;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        //TODO : dispatch profile update

        if(password!==confirmPassword){
            alert("Password doesn't match");
        }
        else{
            dispatch(updateUserProfile({userId:user._id,name,email,password}));
        }
    }

    useEffect(()=>{
        if(!user){
            dispatch({type:USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        }
        else{
            setName(user.name);
            setEmail(user.email);
        }
    },[dispatch, userInfo,user]);

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
                        {loadingUpdate && <Loader></Loader>}
                        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox> }
                        {successUpdate && <MessageBox variant="success">Profile updated successfully</MessageBox> }
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" id="confirmPassword" placeholder="Enter confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <div>
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>
                }
            </form>            
        </div>
    )
}
