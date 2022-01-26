import React, { useEffect } from 'react'
import Product from "../components/Product";
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';
import {useSelector,useDispatch} from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';

export default function HomeScreen(props) {
   
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    let {loading,error,products}=productList;
    
    let searchKey=props.location.search ? props.location.search.split("=")[1].toLowerCase() :"/";
    if(products && searchKey!=="/"){
        products=products.filter((product) => product.name.toLowerCase().includes(searchKey));
     }

     useEffect(()=>{
         dispatch(listProducts());
     },[dispatch]);

    return (
        <div className="row center">
            
            {
            loading ? <Loader /> :
            error ? <MessageBox variant="danger"> {error} </MessageBox> :
            products.length===0 ? <MessageBox variant="danger">Result not found... <Link to={"/"}>Go back</Link> </MessageBox> : 
                products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                )
            )}
        </div>
    )
}
