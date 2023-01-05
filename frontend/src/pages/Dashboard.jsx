import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { EditProfileModal } from '../components/modals/EditProfileModal'
import { ConnectionsModal } from '../components/modals/ConnectionsModal'
import { ItineraryModal } from '../components/modals/ItineraryModal'
import { Spinner} from '../components/Spinner'
import { getMe, getUser, updateProfile, resetProfile } from '../features/profile/profileSlice'
import { logout } from '../features/auth/authSlice'


export const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [openConnections, setOpenConnections] = useState(false)
    const [openItinerary, setOpenItinerary] = useState(false)
    const [itineraryMode, setItineraryMode] = useState('')

    const {profile, userProfile, isLoading, isSuccess, isError, message} = useSelector((state) => state.profile)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
            if (message === 'invalid token' || 
            message === 'session expired' ||
            message === 'Not authorized') {
            dispatch(logout())
            navigate('/login')
            }
        }

        if (!user) {
            navigate('/login')
        } else {
            dispatch(getMe()) 
        }

        return () => {
            dispatch(resetProfile())
          }
    }, [navigate, user, isError, message, dispatch])
    
    const editProfile = () => {
        setOpenEditProfile(true)
    }

    const closeEditProfile = () => {
        setOpenEditProfile(false)
    }

    const getConnections = () => {
        setOpenConnections(true)
    }

    const closeConnections = () => {
        setOpenConnections(false)
    }

    const handleItinerary = (mode) => {
        setOpenItinerary(true)
        setItineraryMode(mode)
    }

    const closeItinerary = () => {
        setOpenItinerary(false)
    }

    // const editItinerary = () => {
    //     setOpenEditItinerary(true)
    // }

    if (isLoading) {
        return (<Spinner/>)
      }

  return (
    <>
    <section className='text-[#002455] p-5 xl:px-28 sm:px-10 sm:py-10'>
        <div className="grid sm:grid-cols-2 gap-10 ">

            <div className='border rounded border-[#002455] p-3 sm:p-5'>
                <h3 className='mt-2 mb-5 text-xl font-bold'>Hello, {profile ? profile.username : ''}!</h3>
                <p className='mb-5'>Bio: {profile?.bio ? profile.bio : ''}</p>
                <p className='mb-5'>Name: {profile?.first_name ? profile.first_name : ''} {profile?.last_name ? profile.last_name : ''}</p>
                <p className='mb-5'>Email: {profile ? profile.email : ''}</p>
                <p className='mb-5'>Phone: {profile ? profile.phone : ''}</p>
                <p className='mb-5'>Gender: {profile?.gender ? profile.gender : ''}</p>
                <p className='mb-5'>Nationality: {profile?.nationality ? profile.nationality : ''}</p>
                <p className='mb-5'>Interests: {profile?.interests ? profile.interests : ''}</p>
                <p className='mb-5'>{profile ? profile.connections.length : ''} connections</p>
            </div>

            <div className='flex my-3 text-[0.8rem] sm:text-base sm:hidden'>
            <button onClick={() => editProfile()} className='border mr-3 sm:mr-5 sm:px-3 px-1.5 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Edit Profile</button>
            <button onClick={() => getConnections()} className='border sm:px-3 px-2 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>View Connections</button>
            </div>

            <div className='border rounded border-[#002455] p-3 sm:p-5'>
                <h3 className='text-lg'>Itineraries</h3>
                <button onClick={() => handleItinerary('add')} className='border text-sm my-3 px-3 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Add Itinerary</button>
                {profile?.itineraries?.length > 0 ? (
                    <div>
                        {profile.itineraries.map((itinerary) => (
                           <div className='my-5'>
                           <p className='font-bold'>{itinerary.country}, {itinerary.state ? itinerary.state : ''}, {itinerary.city? itinerary.city : ''}</p>
                           <p>{itinerary.start_date} to {itinerary.end_date}</p>
                           <button onClick={() => handleItinerary('edit')} className='border text-xs my-3 px-3 py-1 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Edit</button>
                       </div> 
                        ))}
                    </div>
                ) : (<div>You have no itineraries yet</div>)}
            </div>

        </div>
        <div className='flex my-5 text-[0.8rem] sm:text-base hidden sm:block'>
            <button onClick={() => editProfile()} className='border mr-3 sm:mr-5 sm:px-3 px-1.5 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Edit Profile</button>
            <button onClick={() => getConnections()} className='border sm:px-3 px-2 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>View Connections</button>
        </div>
    </section>
    <EditProfileModal open={openEditProfile} handleClose={closeEditProfile}/>
    <ConnectionsModal open={openConnections} handleClose={closeConnections}/>
    <ItineraryModal open={openItinerary} handleClose={closeItinerary} mode={itineraryMode}/>
    </>
  )
}
