import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import "./App.css";
import AddCollection from './components/AddCollection';
import Displaycollection from './components/DisplayCollection';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addCollection" element={<AddCollection/>} />
          <Route path="/displaycollection" element={<Displaycollection/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
