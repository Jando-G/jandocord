import React from "react";
import "../Stylesheets/About.css";

export default function Login() {
    return(
        <div>
            <section className="about-section">
    <div className="about-content">
      <h1>What is this?</h1>
      <p>This is a messaging app I made for my portfolio which will hopefully help me get a job.</p>
      <p>Technologies utilized are React for the frontend; Express, Socket.io, Passport.js and MongoDB for the backend.</p>
    </div>
    <div className="about-image">
      <img src="https://cdn.discordapp.com/attachments/765107990256287782/1143832424338444319/20210513_072317.jpg" alt="Alejandro Gutierrez Selfie" />
    </div>
      <ul>
        <li><a href="mailto:alexandroguterez@gmail.com">alexandroguterez@gmail.com</a></li>
        <li><a href="https://github.com/Jando-G" target="_blank" rel="noreferrer">Github</a></li>
      </ul>
  </section>

  <footer>
    <p>&copy; 2023 Alejandro Gutierrez</p>
  </footer>
        </div>
    )
}