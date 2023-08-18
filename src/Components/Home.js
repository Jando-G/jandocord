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

  const removeFriend = (friendId) => {
    fetch(`http://localhost:5000/user/removefriend/${friendId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      }).then(res => {
        if(!res.ok) {
          throw new Error('Request failed with status: ' + res.status);
        }
        return res.json();
      }).then(() => {
         //clear friend if currently viewing deleted friend
         if(friend.id === friendId) {
          setFriend(null);
         }
         // for some reason mongoose not returning updated friends. it is what it is.
         const newFriends = friends.filter((friend) => friend.id !== friendId);
         setFriends(newFriends);
      }).catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    if (props.user.friends) {
      setFriends(props.user.friends);
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
       <div className="BtnBig" onClick={()=>setFriend(null)}>About</div>
        <AddFriend setFriends={setFriends} setFriend={setFriend}/>
        {friends.map((friend, index) => (
        <ProfileCard
          user={friend}
          key={index}
          onClick={() => setFriend(friend)}
          removeFriend={() => removeFriend(friend.id)}
        />
      ))}
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