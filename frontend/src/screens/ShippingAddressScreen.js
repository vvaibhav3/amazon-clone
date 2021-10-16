import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingDetails } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen(props) {

    const userSignin=useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const cart=useSelector(state => state.cart);
    const {shippingDetails}=cart;

    if(!userInfo){
        props.history.push('/signin');
    }
    const [fullName,setFullName]=useState(shippingDetails.fullName);    
    const [address,setAddress]=useState(shippingDetails.address);
    const [city,setCity]=useState(shippingDetails.city);
    const [postalCode,setPostalCode]=useState(shippingDetails.postalCode);
    const [country,setCountry]=useState(shippingDetails.country);
    const dispatch=useDispatch();

    const submitHandler=(e) =>{
        e.preventDefault();
        dispatch(saveShippingDetails({fullName,address,city,postalCode,country}));
        props.history.push('/payment');
        //TODO : dispatch save shipping address
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1 style={{borderBottom:"2px solid #c0c0c0"}}>Shipping Details</h1>
                </div>
                <div>
                    <label htmlFor="fullName">
                        Full Name
                    </label>
                    <input type="text" id="fullName" placeholder="Enter Full Name"
                        onChange={e => { setFullName(e.target.value)}}
                        value={fullName}
                    required>
                    </input>
                </div>
                
                <div>
                    <label htmlFor="address">
                        Address
                    </label>
                    <input type="address" id="address" placeholder="Enter address"
                        onChange={e => { setAddress(e.target.value)}}
                        value={address}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="city">
                        City
                    </label>
                    <input type="city" id="city" placeholder="Enter city"
                        onChange={e => { setCity(e.target.value)}}
                        value={city}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="postalCode">
                        Postal Code 
                    </label>
                    <input type="postalCode" id="postalCode" placeholder="Enter postal code"
                        onChange={e => { setPostalCode(e.target.value)}}
                        value={postalCode}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="country">
                        Country
                    </label>
                    <input type="country" id="country" placeholder="Enter country"
                        onChange={e => { setCountry(e.target.value)}}
                        value={country}
                    required>
                    </input>
                </div>

                <div>
                    <button type="submit" className="primary" >Continue</button>
                </div>
            </form>
        </div>
    )
}
