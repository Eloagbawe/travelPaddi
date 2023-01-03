import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import {Routes, Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import {Home } from './pages/Home'
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

import './App.css';

function App() {

  return (
    <>
    {/* <Router> */}
    <div className={useLocation().pathname === '/' ? 'bg-image' : 'bg-image-static'}>
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />

      </Routes>
    <Footer/>
    </div>
    {/* </Router> */}
    </>
  );
}

export default App;
