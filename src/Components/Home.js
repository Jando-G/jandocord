import React, { useState, useEffect} from "react";
import ServerList from "./ServerList";
import ProfileCard from "./ProfileCard";
import AddFriend from "./AddFriend";
import UserPanel from "./UserPanel";
import Content from "./Content";	
import "../Stylesheets/Home.css";
import { useNavigate  } from 'react-router-dom';

export default function Login(props) {

  const [friend, setFriend] = useState(null);
  const [friends, setFriends] =useState([]);
  const navigate = useNavigate ();

  useEffect(() => {
    if (props.user.friends) {
      const newFriends = props.user.friends.map((friend, index) => (
        <ProfileCard
          user={friend}
          key={index}
          onClick={() => setFriend(friend)}
        />
      ));
      setFriends(newFriends);
    }
  }, [props.user.friends]);

    
  useEffect(() => {
    // Check if the user object is null, and if so, redirect to the login page
    if (!props.user) {
      navigate.push('/login');
    }
  }, [props.user, navigate]);

  return (
    <div id="home">
      <ServerList />
       <div id="sublist">
        <AddFriend setFriends={setFriends} setFriend={setFriend}/>
        <div className="BtnBig" onClick={()=>setFriend(null)}>About</div>
        {friends}
        <UserPanel user={props.user} />
      </div>
      <div id="window">
        <div id="navbar">
          <div id="options"></div>
        </div>
        <Content friend={friend} user={props.user} socket={props.socket}/>
      </div>
    </div>
  );
}