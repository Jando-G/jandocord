import React, { useState, useEffect } from "react";
import "../Stylesheets/Messages.css";
import Message from './Message.js';

export default function Login(props) {

  const [messages, setMessages] = useState(null);

  console.log(props.friend)
  useEffect(() => {
    const getUser = () => {
      fetch(`http://localhost:5000/user/messages?friendId=${props.friend.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(res => {
        if (res.status === 200) return res.json();
        throw new Error("Failed to fetch messages");
      }).then(data => {
        setMessages(data.messages);
      });
    }
    getUser();
  }, [props.user, props.friend.id])

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.MessageBox.value) {
      fetch(`http://localhost:5000/user/send`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ friendId: props.friend.id, message: e.target.MessageBox.value }),
      }).then(res => {
        if (res.status === 200) return res.json();
        throw new Error("Failed to sendMessage");
      }).then(data => {
        setMessages(data.messages);
      });

      //clear input 
      const inputField = document.getElementById("MessageBox");
      inputField.value = "";
    }
  }

  return (
    <div id="MessagesParent">
      <div id="Messages">
        {messages ? messages.map((message, index) => (
          <Message key={index} content={message.content} sender={message.sender === props.user._id ? props.user.username : props.friend.username} image={message.sender === props.user._id ? `https://cdn.discordapp.com/avatars/${props.user.discordId}/${props.user.avatar}` : `https://cdn.discordapp.com/avatars/${props.friend.discordId}/${props.friend.avatar}`} date={message.date} />
        )) : null}
      </div>
      <form onSubmit={handleSubmit}><input type="text" id="MessageBox" placeholder="Message Placeholder" /></form>
    </div>
  );
}