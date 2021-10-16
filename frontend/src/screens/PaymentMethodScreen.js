import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {useDispatch, useSelector} from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentMethodScreen(props) {

    const cart = useSelector(state => state.cart);
    const {shippingDetails} = cart;
    if(!shippingDetails.address){
        props.history.push('/shipping');
    }

    const [paymentMethod,setPayentMethod] = useState("Paypal");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                <span>
                    <input type="radio" name="paymentMethod" id="paypal" value="PayPal" checked required
                        onChange={(e) => setPayentMethod(e.target.value)}
                    ></input>
                    <label htmlFor="paypal">PayPal</label>
                </span>
                </div>
                <div>
                <span>
                    <input type="radio" name="paymentMethod" id="stripe" value="Stripe" required
                        onChange={(e) => setPayentMethod(e.target.value)}
                    >
                    </input>
                    <label htmlFor="stripe">Stripe</label>
                </span>
                </div>
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}
