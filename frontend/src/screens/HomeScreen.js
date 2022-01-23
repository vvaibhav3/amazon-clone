import React, { useEffect } from 'react'
import Product from "../components/Product";
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';
import {useSelector,useDispatch} from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
   
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading,error,products}=productList;
     useEffect(()=>{
         dispatch(listProducts());
     },[dispatch]);

    return (
        <div className="row center">
            {
            loading ? <Loader /> :
            error ? <MessageBox variant="danger"> {error} </MessageBox> : 
                products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                )
            )}
        </div>
    )
}
