import * as React from 'react';
import logo from '../images/logo-dark.png'
import {Link, useNavigate} from 'react-router-dom'

import { FaHome, FaSignInAlt, FaSignOutAlt, FaBookOpen,
        FaUser, FaHouseUser, FaPhoneSquareAlt, FaAlignJustify 
      } from 'react-icons/fa'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex py-10 px-1 lg:px-6 lg:justify-between">

    <div className='lg:hidden mt-2 sm:mt-3'>
    <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FaAlignJustify className='text-[#002455]'/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
        <MenuItem onClick={handleClose}>About us</MenuItem>
        <MenuItem onClick={handleClose}><Link to="/login">Login</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/signup">Signup</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/dashboard">Dashboard</Link></MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        <MenuItem onClick={handleClose}>Contact us</MenuItem>




      </Menu>
    </div>

    <div className=''>
        <img src={logo} alt="logo" className='w-48 sm:w-60 object-contain'/>
    </div>

    <div className='hidden lg:flex flex-wrap mt-4 text-[#3B4044]'>
      <div className='flex mr-3'>
        <FaHome className='mr-2 mt-1'/>
        <Link to="/">Home</Link>
      </div>

      <div className='flex mr-3 mt-2 md:mt-0'>
        <FaBookOpen className='mr-2 mt-1'/>
        <p>About us</p>
      </div>

      <div className='flex mr-3 mt-2 md:mt-0'>
        <FaSignInAlt className='mr-2 mt-1'/>
        <Link to="/login">Login</Link>
      </div>

      <div className='flex mr-3 mt-2 md:mt-0'>
        <FaUser className='mr-2 mt-1'/>
        <Link to="/signup">Signup</Link>
      </div>

      <div className='flex mr-3 mt-2 md:mt-0'>
        <FaHouseUser className='mr-2 mt-1'/>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      <div className='flex mr-3 mt-2 md:mt-0'>
        <FaSignOutAlt className='mr-2 mt-1'/>
        <p>Logout</p>
      </div>

      <div className='flex mr-3 mt-2 md:mt-0'>
        <FaPhoneSquareAlt className='mr-2 mt-1'/>
        <p>Contact us</p>
      </div>



    </div>

    </div>
  )
}
