import React from 'react';
import './EntryPage.css'; 
import { Link } from "react-router-dom"
import achievment from "../../assets/achievement.png"

const EntryPage = () => {
    
  return (
    <div className="entry-page" style={{ backgroundImage: `url(${achievment})` }}>
      <div className="content" style={{ fontFamily: "Roboto" }}>
        <h1>Welcome to "Find the One"</h1>
        <p>
          Find the products you want based on ratings and help others by rating and ranking products.
        </p>
        <Link to="/signup">
        <button className="join-now-button">Join Now</button>
        </Link>
      </div>
    </div>
  );
};

export default EntryPage;
