import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

export default function CartScreen(props) {
    const prodcutId=props.match.params.id;
    const qty=props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(addToCart(prodcutId,qty));
    },[dispatch,prodcutId,qty]);
    
    return (
        <div>
            <h1>Add to card</h1>
            <p>
                Product Id : {prodcutId} Qty : {qty}
            </p>        
        </div>
    )
}
