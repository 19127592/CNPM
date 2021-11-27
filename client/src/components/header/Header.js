import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./menu.svg";
import Close from "./close.svg";
import Cart from "./cart.svg";
import User from "./user.svg";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
  const [cart] = state.userAPI.cart;

  const logOut = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    window.location.href = "/";
  };

  const [infor, setInfor] = state.userAPI.infor;

  const loggedControl = () => {
    return (
      <>
        <li>
          <div className="usericon">
            <div className="icon">
              <img src={User} alt="" width="30" />
              <p>{infor.name}</p>
            </div>
            <div className="dropdown-menu">
              <li>
                <Link to="/">
                  {isAdmin
                    ? adminControl2()
                    : isSeller
                    ? sellerControl2()
                    : userControl()}
                </Link>
              </li>
              <li>
                <Link to="/" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </div>
          </div>
        </li>
      </>
    );
  };

  const userControl = () => {
    return (
      <>
        <li>
          <Link to="/">Your order</Link>
        </li>
        <li>
          <Link to="/">Oder history</Link>
        </li>
      </>
    );
  };

  const sellerControl2 = () => {
    return (
      <>
        <li>
          <Link to="/product-management">Data management</Link>
        </li>
      </>
    );
  };

  const sellerControl = () => {
    return (
      <>
        <li>
          <Link to="/product-management">Your shop</Link>
        </li>
      </>
    );
  };
  /*create product nam trong product management */

  const adminControl = () => {
    return (
      <>
        <li>
          <Link to="/user-management">Data management</Link>
        </li>
      </>
    );
  };

  const adminControl2 = () => {
    return (
      <>
        <li>
          <Link to="/user-management">User Management</Link>
        </li>
        <li>
          <Link to="/product-management">Product Management</Link>
        </li>
      </>
    );
  };

  return (
    //FE (Thu)
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">
            {isAdmin ? "Admin" : isSeller ? "Seller" : "rookieSE"}
          </Link>
        </h1>
      </div>
      <div class="search-box">
        <form>
          <input
            type="text"
            name=""
            placeholder="Search..."
            className="search-field"
          />
          <input type="submit" name="" value="Search" className="search-btn" />
        </form>
      </div>
      <ul>
        <li>
          <Link to="/">
            {isAdmin ? adminControl() : isSeller ? sellerControl() : "Product"}
          </Link>
        </li>
        {isLogged ? (
          loggedControl()
        ) : (
          <li>
            <Link to="/login">Login & Register</Link>
          </li>
        )}
        <li>
          <img src={Close} alt="" width="30" className="menu" />
          <div className="cart-icon">
            <span>{cart.length}</span>
            <Link to="/cart">
              <img src={Cart} alt="" width="30" />
            </Link>
          </div>
        </li>
      </ul>
    </header>
  );
}
/*Trong drop down của user có your cart, your order (aka order history)*/
