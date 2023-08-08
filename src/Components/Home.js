import React, { useState } from "react";
import ServerList from "./ServerList";
import ProfileCard from "./ProfileCard";
import AddFriend from "./AddFriend";
import UserPanel from "./UserPanel";
import Content from "./Content";	
import "../Stylesheets/Home.css";

export default function Login(props) {

  const [friend, setFriend] = useState(null);

  const friends = [];
    if(props.user.friends) {
      for(let i = 0; i < props.user.friends.length; i++) {
        friends.push(<ProfileCard user={props.user.friends[i]} key={i} onClick={()=> setFriend(props.user.friends[i])} />)
      }
    }

  return (
    <div id="home">
      <ServerList />
       <div id="sublist">
        <AddFriend/>
        <div className="BtnBig" onClick={()=>setFriend(null)}>About</div>
        {friends}
        <UserPanel user={props.user} />
      </div>
      <div id="window">
        <div id="navbar">
          <div id="options"></div>
        </div>
        <Content friend={friend} user={props.user}/>
      </div>
    </div>
  );
}