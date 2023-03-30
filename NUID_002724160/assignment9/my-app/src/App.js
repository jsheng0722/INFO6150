import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import LoginPage from './Login/LoginPage';
import MainPage from './Main/MainPage';

import AboutUs from './components/AboutUs';
import Jobs from './components/Jobs';
import Home from './components/Home';
import Contact from './components/Contact';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoginSubmit() {
    setIsLoggedIn(true);
  }

  return (
    <>
      <Router>
        {isLoggedIn && <MainPage/>}
        <Routes>
          <Route path='/' element={<LoginPage onLoginSubmit={handleLoginSubmit} />} />
          {isLoggedIn &&
            <>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/aboutus' element={<AboutUs/>}></Route>
            <Route path='/jobs' element={<Jobs/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            </>
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
