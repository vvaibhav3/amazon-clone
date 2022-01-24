import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter,Link,Route} from 'react-router-dom';
import { signout } from "./actions/userActions";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ShowUserList from "./screens/ShowUserScreen";
import AddProductScreen from "./screens/AddProductScreen";

function App() {

  const cart = useSelector(state => state.cart);
  const {cartItems }= cart; 

  const userSignin= useSelector(state => state.userSignin);
  const {userInfo} =userSignin;
   
  const dispatch = useDispatch();

  const signoutHandler=() =>{
    dispatch(signout());
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            <i className="fa fa-superpowers"></i> PolyPlayer<span style={{fontSize:"10px",fontStyle:"italic"}}>Men's clothing.</span>
          </Link>
        </div>

        <div>
          <Link to="/cart">
            <i className="fa fa-shopping-cart"></i> Cart
            {
              cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)
            }  
          </Link>

          {
            userInfo ? (
            <div className="dropdown">
              <Link to="/#"><i className="fa fa-user-circle"></i> {userInfo.name.split(" ")[0]} <i className="fa fa-caret-down"></i> {" "}</Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile"><i className="fa fa-user"></i> My Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory"><i className="fa fa-book"></i> My Orders</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                  <i className="fa fa-sign-out"></i> Sign-out
                  </Link>
                </li>
              </ul>
            </div>
            ) : (
                <Link to="/signin"><i class="fa fa-sign-in"></i> Sign-in</Link>
              )
          }

          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
                <Link to="#admin">
                  <i className="fa fa-cog"></i> Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                <li>
                  <Link to="/userslist"><i className="fa fa-list"></i> Users</Link>
                </li>
                <li>
                  <Link to="/addProduct"><i className="fa fa-plus-square"></i> Add products</Link>
                </li>
              </ul>
            </div>
          )}
          
        </div>
      </header>

      <main>
        <Route path='/cart/:id?' component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/addProduct" component={AddProductScreen}></Route>
        <Route path="/signin" component={SigninScreen} ></Route>
        <Route path="/register" component={RegisterScreen} ></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <Route path="/userslist" component={ShowUserList}></Route>
        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>

      <footer className="row center">created by vvaibhav3 #</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
