import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { listUsers} from '../actions/userActions';
import  Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';

export default function ShowUserScreen(props) {

    const dispatch = useDispatch();
    const showUserList = useSelector(state => state.showUserList);
    const {users,error,loading}=showUserList;
    

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch]);

    return (
        <div>
            <h1>Users</h1>
            {
                loading ? (<Loader></Loader>) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) :(
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created Date</th>
                                <th>Admin</th>
                                <th>Updated Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.createdAt.substring(0,10)}</td>
                                        <td>{user.isAdmin===true ? "Yes" : "No"}</td>
                                        <td>{user.updatedAt.substring(0,10)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
