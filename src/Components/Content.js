import React from "react";
import Messages from './Messages'

export default function Login(props) {
    if(props.friend) {
        return <Messages url={props.url} user={props.user} friend={props.friend} socket={props.socket}/>
    }
    return <div>Hello welcome to my app</div>
}