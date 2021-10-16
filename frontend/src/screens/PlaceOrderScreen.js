import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }
    const {cartItems} =cart;
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading,success,error,order}=orderCreate;

    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(cartItems.reduce((a,c) => a+c.qty*c.price , 0));
    cart.shippingAddressPrice= cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingAddressPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const plcaeOrderHandler = () =>{
        //TODO : dispatch place order action
        dispatch(createOrder({...cart,orderItems:cartItems}));
    }
    
    useEffect(()=>{
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type:ORDER_CREATE_RESET});
        }
    },[dispatch, order, props.history, success]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name : </strong> {cart.shippingDetails.fullName}<br/>
                                    <strong>Address : </strong> {cart.shippingDetails.address}<br/>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method : </strong> {cart.paymentMethod}<br/>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>{
                                cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img alt={item.name} src={item.image} className="small">
                                                </img>
                                                </div>
                                                <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    {item.qty} x {item.price} = {item.qty*item.price}
                                                </div>
                                        </div>
                                    </li>
                                ))
                            }
                            </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Order Summary</h2>
                        </li>
                        <li>
                            <div className="row">
                                <div>Items</div>
                                <div>${cart.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        
                        <li>
                            <div className="row">
                                <div>Shipping Address Price</div>
                                <div>${cart.shippingAddressPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        
                        <li>
                            <div className="row">
                                <div>Tax</div>
                                <div>${cart.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        
                        <li>
                            <div className="row">
                                <div><strong>Total</strong></div>
                                <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                            </div>
                        </li>

                        <li>
                            <button type="button" className="primary block" onClick={plcaeOrderHandler} disabled={cartItems.length===0}>
                                Place Order
                            </button>
                        </li>
                        {loading && <Loader></Loader>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
