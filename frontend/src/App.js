import React, {useEffect} from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import {Routes, Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import {Home } from './pages/Home'
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Search } from './pages/Search';
import { Dashboard } from './pages/Dashboard'

import './App.css';

function App() {
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.remove('bg-image-static')
      document.body.classList.add('bg-image')
    } else {
      document.body.classList.add('bg-image-static')
      document.body.classList.remove('bg-image')
    }
  }, [location])

  return (
    <>
    {/* <Router> */}
    {/* <div className={useLocation().pathname === '/' ? 'bg-image' : 'bg-image-static'}> */}
    <div className='pb-5'>
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/dashboard' element={<Dashboard/>} />

      </Routes>
    <Footer/>
    </div>
    {/* </Router> */}
    </>
  );
}

export default App;
