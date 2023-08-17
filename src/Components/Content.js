import React, { useState } from "react";
import "../Stylesheets/Login.css";
import Messages from './Messages'

export default function Login(props) {
    if(props.friend) {
        return <Messages user={props.user} friend={props.friend} socket={props.socket}/>
    }
    return <div>About Page</div>
}