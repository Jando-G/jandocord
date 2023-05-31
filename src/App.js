import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useHistory } from "react-router-dom";
import Login from './Components/Login';
import Home from './Components/Home';
import Cookies from 'js-cookie';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = ()=> {
      fetch("http://localhost:5000/user/profile", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      }).then(res=> {
        if(res.status===200) return res.json();
        throw new Error("authentication failed");
      }).then(resObject => {
        setUser(resObject.user);
      }).catch(err=> {
        console.log(err);
      })
    }
    getUser();
  }, [])

  console.log(user);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home user={user  ? user._id : "null"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
