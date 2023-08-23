import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Home from './Components/Home';
import io from 'socket.io-client';

const url = "https://jandocord-d39f82b85605.herokuapp.com"

const socket = io(url)

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = ()=> {
      fetch(`${url}/user/profile`, {
        method: "GET",
        credentials: "include",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }).then(res=> {
        if(res.status===200) return res.json();
        throw new Error("authentication failed");
      }).then(resObject => {
        setUser(resObject.user);
      }).catch(err=> {
        console.log(err);
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
          return null; 
        }
      })
    }
    getUser();
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login url={url}/>} />
          <Route path="/" element={<Home socket={socket} user={user  ? user : "null"} url={url} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
