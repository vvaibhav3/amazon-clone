import React, { useEffect, useState } from 'react'
import Product from "../components/Product";
import axios from 'axios';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';


export default function HomeScreen() {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError]= useState(false);
    useEffect(()=>{
        const fetchData=async () => {
            try{
                setLoading(true);
                const {data}=await axios.get('/api/products');
                setLoading(false);
                setProducts(data);
            }catch(e){
                    setLoading(false);
                    setError(e.message);
                }
            };
        fetchData();
    },[]);
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
