import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Footer() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
  const [isLogged] = state.userAPI.isLogged;

  const loggedControl = () => {
    return (
      <>
        <li>
          <Link to="/">
            {isAdmin
              ? adminControl2()
              : isSeller
              ? sellerControl2()
              : userControl()}
          </Link>
        </li>
        <li>{!isAdmin ? <Link to="/account">Your account</Link> : ""}</li>
        <li>
          {!isAdmin ? <Link to="/account/history">History Order</Link> : ""}
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
          <Link to="/product-management">Shop management</Link>
        </li>
      </>
    );
  };

  return (
    <>
      <footer class="footer">
        <div class="footer__addr">
          <h1 class="footer__logo">About Us</h1>
          <img
            src="https://drive.google.com/uc?id=1oUSZSP1Uo90Wnai9ir4csJUBwH23YRO8"
            alt="Logo"
            width="150px"
            className="image"
          ></img>
        </div>

        <ul class="footer__nav">
          <li className="nav__item">
            <h2 class="nav__title">Contact</h2>
            <address>
              227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh,
              Vietnam
            </address>
          </li>
          <liv class="nav__item">
            <h2 class="nav__title">Services</h2>
            <ul class="nav__ul">
              {isLogged ? (
                loggedControl()
              ) : (
                <li>
                  <Link to="/login">Login & Register</Link>
                </li>
              )}
            </ul>{" "}
          </liv>

          <li class="nav__item">
            <h2 class="nav__title">Team Information</h2>
            <ul class="nav__ul">
              <li>
                <p>Lê Minh Trí – 19127592</p>
              </li>
              <li>
                <p>Phan Tường Duy – 19127380</p>
              </li>
              <li>
                <p>Nguyễn Phú Quí – 19127647</p>
              </li>
              <li>
                <p>Nguyễn Thành Luân – 19127467</p>
              </li>
              <li>
                <p>Nguyễn Huy Anh Thư – 19127569</p>
              </li>
            </ul>
          </li>
        </ul>
        <div class="legal">
          <p>&copy; 2021 created by rookieSE</p>
        </div>
      </footer>
    </>
  );
}
