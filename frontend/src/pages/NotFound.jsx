import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import { useDispatch } from "react-redux"
import { resetProfile } from '../features/profile/profileSlice'
import { resetConnection } from "../features/connections/connectionSlice"
import { resetItinerary } from "../features/itineraries/itinerarySlice"
import { reset } from "../features/auth/authSlice"



export const NotFound = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(reset())
      dispatch(resetProfile())
      dispatch(resetConnection())
      dispatch(resetItinerary())
    }, 5000)
    
  }, [dispatch])
  return (
    <div className='text-center mt-10 text-[#002455]'>
        <p>Sorry, the page you're looking for does not exist</p>
        <button className='mt-5 border border-[#002455] px-3 py-2 rounded'><Link to="/">Return to Home</Link></button>
    </div>
  )
}
