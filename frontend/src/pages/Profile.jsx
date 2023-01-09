import React, {useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import Moment from 'react-moment';
import { getUser, resetProfile } from '../features/profile/profileSlice'
import { Spinner} from '../components/Spinner'
import { toast } from 'react-toastify';
import { logout } from '../features/auth/authSlice'
import { resetConnection } from "../features/connections/connectionSlice"
import { resetItinerary } from "../features/itineraries/itinerarySlice"


export const Profile = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userProfile, isLoading, isError, message} = useSelector((state) => state.profile)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {

        if(isError) {
            toast.error(message)
                if (message === 'invalid token' || 
                message === 'session expired' ||
                message === 'Not authorized') {
                dispatch(logout())
                navigate('/login')
                } else {
                    navigate('*')
                }
        }

        if (!user) {
            navigate('/login')
        } else {
            dispatch(getUser(params.id))
        }

        return () => {
            dispatch(resetProfile())
            dispatch(resetConnection())
            dispatch(resetItinerary())
          }

    },[isError, dispatch, message, user, navigate, params ])

    if (isLoading) {
        return (<Spinner/>)
    }
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

  return (
    <section className='text-[#002455] p-5 xl:px-28 sm:px-10 sm:py-10'>
        {/* <div>{params.id}</div> */}
        <div className="grid sm:grid-cols-2 gap-10 ">

            <div className='border rounded border-[#002455] p-3 sm:p-5 h-[32rem]'>
                <h3 className='mt-2 mb-5 text-xl font-bold'>Username: {userProfile ? userProfile.username : ''}</h3>
                <p className='mb-5'>Bio: {userProfile?.bio ? userProfile.bio : ''}</p>
                <p className='mb-5'>Name: {userProfile?.first_name ? userProfile.first_name : ''} {userProfile?.last_name ? userProfile.last_name : ''}</p>
                <p className='mb-5'>Email: {userProfile ? userProfile.email : ''}</p>
                <p className='mb-5'>Phone: {userProfile ? userProfile.phone : ''}</p>
                <p className='mb-5'>Gender: {userProfile?.gender ? userProfile.gender : ''}</p>
                <p className='mb-5'>Nationality: {userProfile?.nationality ? userProfile.nationality : ''}</p>
                <p className='mb-5'>Interests: {userProfile?.interests ? userProfile.interests : ''}</p>
                <p className='mb-5'>{userProfile ? userProfile?.connections?.length : ''} {userProfile?.connections?.length === 1 ? 'connection' : 'connections'}</p>

            </div>

            <div className='border rounded border-[#002455] p-3 sm:p-5 h-[32rem] overflow-scroll'>
                <h3 className='text-2xl'>Itineraries</h3>

                {userProfile?.itineraries?.length > 0 ? (
                    <div>
                        {userProfile?.itineraries?.map((itinerary) => (
                           <div className='my-5' key={itinerary._id}>
                           <p className='font-bold'>{capitalize(itinerary.country)}{itinerary.state ? ', ' + capitalize(itinerary.state) : ''} {itinerary.city? ', ' + capitalize(itinerary.city) : ''}</p>
                           <p><Moment format="MMM DD, YYYY">{itinerary.start_date}</Moment>
                           <span> to </span>  
                           <Moment format="MMM DD, YYYY">{itinerary.end_date}</Moment></p>
                           <p className='my-1'>Details: {itinerary.details ? itinerary.details : ''}</p>
                       </div> 
                        ))}
                    </div>
                ) : (<div>No itineraries</div>)}
            </div>

        </div>
    </section>
  )
}
