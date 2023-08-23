import React from "react";
import "../Stylesheets/Login.css";


export default function Login(props) {

  const auth = () => {
    window.open(`${props.url}/auth/login`, "_self");
  }

  return (
    <div className="wrapper">
      <button 
        className="button" 
        onClick={auth}
        href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=https%3A%2F%2Fjandocord-d39f82b85605.herokuapp.com&response_type=code&scope=identify`}>
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