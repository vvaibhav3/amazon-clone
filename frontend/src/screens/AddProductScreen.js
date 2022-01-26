import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct} from '../actions/productActions';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';

export default function AddProductScreen(props) {

    const [name,setName] = useState("");
    const [brand,setBrand] = useState("");
    const [price,setPrice]=useState(0);
    const [category,setCategory] = useState("");
    const [rating,setRating] = useState(5);
    // const [reviews,setReviews]=useState(0);
    const [description,setDescription]=useState("");
    const [image,setImage]=useState();
    const [stock,setStock]=useState(0);

    const redirect= props.location.search ? props.location.search.split("=")[1] : "/";

    const insertProduct= useSelector(state => state.insertProduct);
    const {product,laoding,error} =insertProduct;
    
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        const data=new FormData();
        data.append("name",name);
        data.append("file",image);
        data.append("price",price);
        data.append("brand",brand);
        data.append("category",category);
        data.append("rating",rating);
        data.append("stock",stock);
        data.append("description",description);
        dispatch(addProduct(data));
    }

    useEffect(() => {
        if(product){
            alert("Product added...");
            props.history.push(redirect);
        }
    },[product,redirect,props.history]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Add Product</h1>
                </div>
                {laoding && <Loader></Loader>}
                {error && <MessageBox variant="danger">{error}</MessageBox> }
                <div>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" id="name" placeholder="Enter name"
                        onChange={e => { setName(e.target.value)}}
                    required>
                    </input>
                </div>
                
                <div>
                    <label htmlFor="brand">
                        Brand
                    </label>
                    <input type="text" id="brand" placeholder="Enter brand name"
                        onChange={e => { setBrand(e.target.value)}}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="category">
                        Category
                    </label>
                    <input type="text" id="category" placeholder="Enter category i.e shirts or pants"
                        onChange={e => { setCategory(e.target.value)}}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="price">
                        Pice
                    </label>
                    <input type="number" id="price" placeholder="Enter price"
                        onChange={e => { setPrice(e.target.value)}}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="stock">
                        Stock
                    </label>
                    <input type="number" id="stock" placeholder="Enter stock"
                        onChange={e => { setStock(e.target.value)}}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="rating">
                        Rating
                    </label>
                    <input type="number" id="rating" placeholder="Enter rating"
                        onChange={e => { setRating(e.target.value)}}
                    required>
                    </input>
                </div>

                <div>
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea id="description"
                        onChange={e => { setDescription(e.target.value)}}
                    required>
                    </textarea>
                </div>

                <div>
                    <label htmlFor="image">
                        Image
                    </label>
                    <input type='file' id="image"
                        onChange={e => { setImage(e.target.files[0])}}
                    required>
                    </input>
                </div>

                <div>
                    <button type="submit" className="primary" >Add</button>
                </div>
            </form>
        </div>
    )
}
