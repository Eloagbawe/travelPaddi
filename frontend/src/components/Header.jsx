import logo from '../images/logo-dark.png'
import {Link, useNavigate} from 'react-router-dom'

import { FaHome, FaSignInAlt, FaSignOutAlt, FaBookOpen, FaUser, FaHouseUser, FaPhoneSquareAlt } from 'react-icons/fa'

export const Header = () => {
  return (
    <div className="lg:flex py-10 px-6 justify-between">

    <div className=''>
        <img src={logo} alt="logo" className='w-60 object-contain'/>
    </div>

    <div className='md:flex flex-wrap md:mt-4 mt-6 text-[#3B4044]'>
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
        <p>Dashboard</p>
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
