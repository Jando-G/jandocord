import React, { useState, useEffect, useRef} from "react";
import "../Stylesheets/Messages.css";
import Message from './Message.js';

export default function Login(props) {
  const bottomEl = useRef(null);

  const [messages, setMessages] = useState(null);
  const [threadId, setThreadId] = useState(null);

  useEffect(() => {
    bottomEl.current.scrollIntoView({ behavior: "smooth", block: "end" })
  }); 
  
  useEffect(() => {
     // Listen for new messages
     props.socket.on('recieve-message', (message) => {
       console.log(message)
       setMessages((prevMessages) => [...prevMessages, message]);
     });

     // Clean up when component unmounts
     return () => {
      props.socket.off('recieve-message', (message) => {
        console.log(message)
        setMessages((prevMessages) => [...prevMessages, message]);
      }).off();
     };
  }, []);

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
        props.socket.emit('send-message', data.message, threadId);
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      //clear input 
      const inputField = document.getElementById("MessageBox");
      inputField.value = "";
    }
  }

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
        setThreadId(data.threadId);
      });
    }
    getUser();
  }, [props.user, props.friend.id])

  useEffect(()=> {
    props.socket.emit('join-thread', threadId);
    return () => {
      props.socket.emit('leave-thread', threadId);
    }
  }, [threadId, props.socket])



  return (
    <div id="MessagesParent">
      <div id="Messages">
        {messages ? messages.map((message, index) => (
          <Message 
            key={index} 
            content={message.content} 
            sender={message.sender === props.user._id ? props.user.username : props.friend.username} 
            image={message.sender === props.user._id ? `https://cdn.discordapp.com/avatars/${props.user.discordId}/${props.user.avatar}` : `https://cdn.discordapp.com/avatars/${props.friend.discordId}/${props.friend.avatar}`} 
            date={message.date} />
        )) : null}
        <div ref={bottomEl}></div>
      </div>
      <form onSubmit={handleSubmit}><input minLength="1" maxLength="2000" autoComplete="off" type="text" id="MessageBox" placeholder={`Message @${props.friend.username}`} /></form>
    </div>
  );
}