import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./menu.svg";
import Close from "./close.svg";
import Cart from "./cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
  const [cart] = state.userAPI.cart;
  const [search, setSearch] = state.productsAPI.search
  const logOut = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    window.location.href = "/";
  };

  const loggedControl = () => {
    return (
      <>
        <li>
          <Link to="/" onClick={logOut}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const sellerControl = () => {
    return (
      <>
        <li>
          <Link to="/product-management">Product Management</Link>
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
  const Search = (e) => {
    
  }
  return (
    //FE (Thu)
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "rookieSE"}</Link>
        </h1>
      </div>
      <div class="search-box">
        <form onSubmit={Search}>
          <input
            type="text"
            name=""
            placeholder="Search..."
            className="search-field"
            value={search}
            onChange={e => setSearch(e.target.value.toLowerCase())}
          />
          <input type="submit" name="" className="search-btn" />
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
        </li>
      </ul>
      <div className="cart-icon">
        <span>{cart.length}</span>
        <Link to="/cart">
          <img src={Cart} alt="" width="30" />
        </Link>
      </div>
    </header>
  );
}

/*lam icon account, khong xoa log out*/
/**/
