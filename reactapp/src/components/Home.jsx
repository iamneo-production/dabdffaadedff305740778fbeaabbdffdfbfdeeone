import React from 'react';
import home_background from '../assests/lib_Homepage.jpg';

const Home = () => {
  return (
    <div className="home">
      <h2 className="home-title">Welcome to the Library Collection App</h2>
      <img
        src={home_background} 
        alt="Library_App_Background"
        className="home-image"
        />
    </div>
  );
};

export default Home;
