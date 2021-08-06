import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import Loader from '../components/Loader';
import { detailsProduct } from '../actions/productActions';
export default function ProductScreen(props) {

        const dispatch=useDispatch();
        const productId=props.match.params.id;
        const details=useSelector( (state) => state.productDetails);
        const {product,error,loading} =details;

        useEffect(() => {
            dispatch(detailsProduct(productId));
        },[dispatch,productId]);

        return (
           <div className="row center">
            {
            loading ? <Loader /> :
            error ? <MessageBox variant="danger"> {error} </MessageBox> :    
                <div>
                <Link to="/">Back to results</Link>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name} />
                    </div>
                    
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating rating={product.rating} numReviews={product.numReviews} ></Rating>
                            </li>
                            <li>
                                Price - ${product.price}
                            </li>
                            <li>
                                Discription - {product.decription}
                            </li>
                        </ul>
                    </div>
                    
                    <div className="col-1">
                        <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price </div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            
                            <li>
                                <div className="row">
                                    <div>Status </div>
                                    <div>{product.countInStock>0 ? <span className="success"> In stock </span> : <span className="danger"> Out of stock </span> }</div>
                                </div>
                            </li>
                            <li>
                            <button className="primary block">Add to cart</button>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
                </div>    
            }
            </div>
    )
}
