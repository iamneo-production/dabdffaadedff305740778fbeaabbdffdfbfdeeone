import React from 'react';
import homeImage from '../assests/task_Homepage.jpg'; // Replace 'home-image.jpg' with your image file

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Employee Task Management System</h2>
      <p>This system helps you manage your tasks efficiently.</p>
      <img src={homeImage} alt="Home" className="home-image" />
    </div>
  );
};

export default Home;
