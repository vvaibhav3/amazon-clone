import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import  Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {

    const dispatch = useDispatch();
    const orderMineList = useSelector(state => state.orderMineList);
    const {orders,error,loading}=orderMineList;
    
    let x=0;
    useEffect(() => {
        dispatch(listOrderMine())
    }, [dispatch]);

    return (
        <div className='card card-body'>
            <h1>Order History</h1>
            {
                loading ? (<Loader></Loader>) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) :(
                    <ul>
                            {
                                orders.map((order) => (
                                    <li key={order._id} className='row card card-body' style={{backgroundColor: (x++ % 2 ? "#whitesmoke" :"white")}}>
                                        <div>Id : {order._id}</div>
                                        <div>Date : {order.createdAt.substring(0,10)}</div>
                                        <div>Price : {order.totalPrice.toFixed(2)}</div>
                                        <div>Paid : {order.isPaid ? order.paidAt.substring(0,10) : "No"}</div>
                                        <div>Deliverd : {order.isDelivered ? order.deliveredAt.substring(0,10) : "No"}</div>
                                        <div>
                                            <button type="button" className="small" onClick={() => props.history.push(`/order/${order._id}`)} >
                                                Details
                                            </button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                )
            }
        </div>
    )
}
