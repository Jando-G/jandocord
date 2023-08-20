import React, { useState } from "react";
import "../Stylesheets/Login.css";

const auth = () => {
  window.open("http://localhost:5000/auth/login", "_self");
}

export default function Login() {
  return (
    <div className="wrapper">
      <button 
        className="button" 
        onClick={auth}
        href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2F&response_type=code&scope=identify`}>
        Login
        <div className="button__horizontal"></div>
        <div className="button__vertical"></div>
      </button>
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}