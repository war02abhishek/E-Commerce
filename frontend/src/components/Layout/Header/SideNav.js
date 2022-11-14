import React from 'react'
import "./SideNav.css";
import { Link } from "react-router-dom";
import logo from "../../../images/logoE1.jpg";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useState } from 'react';

import { useGlobalContext } from './context';

const SideNav = () => {

  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <div className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <Link to="/">
          <img src={logo} className="logo" alt="coding addict" />
        </Link>
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <ul className="links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/About">About</a>
        </li>
        <li className="Products">
          <a href="/Products">Products</a>
        </li>
        <li className="Cart">
          <a href="/Cart">Cart</a>
        </li>
        <li className="search">
          <a href="/Search">Search</a>
        </li>
        <li className="search">
          <a href="/Login">Login</a>
        </li>
        <li className="search">
          <a href="/Profile">Profile</a>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;