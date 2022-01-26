import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { listUsers} from '../actions/userActions';
import  Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';

export default function ShowUserScreen(props) {

    const dispatch = useDispatch();
    const showUserList = useSelector(state => state.showUserList);
    const {users,error,loading}=showUserList;
    
    let x=0;
    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch]);

    return (
        <div className='card card-body'>
            <h1>Users</h1>
            {
                loading ? (<Loader></Loader>) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) :(
                    <ul>
                            {
                                users.map((user) => (
                                    <li key={user._id} className='row card card-body' style={{backgroundColor: (x++ % 2 ? "#whitesmoke" :"white")}}>
                                        <div>Id : {user._id}</div>
                                        <div>Name : {user.name}</div>
                                        <div>Email : {user.email}</div>
                                        <div>CreatedAt : {user.createdAt.substring(0,10)}</div>
                                        <div>isAdmin : {user.isAdmin===true ? "Yes" : "No"}</div>
                                        <div>UpdatedAt : {user.updatedAt.substring(0,10)}</div>
                                    </li>
                                ))
                            }
                    </ul>
                )
            }
        </div>
    )
}
