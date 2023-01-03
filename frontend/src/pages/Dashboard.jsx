import React, {useState} from 'react'
import { EditProfileModal } from '../components/modals/EditProfileModal'
import { ConnectionsModal } from '../components/modals/ConnectionsModal'
import { ItineraryModal } from '../components/modals/ItineraryModal'

export const Dashboard = () => {
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [openConnections, setOpenConnections] = useState(false)
    const [openItinerary, setOpenItinerary] = useState(false)
    const [itineraryMode, setItineraryMode] = useState('')

    // const [openEditItinerary, setOpenEditItinerary] = useState(false)




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

    // const closeEditItinerary = () => {
    //     setOpenEditItinerary(false)
    // }
  return (
    <>
    <section className='text-[#002455] p-5 xl:px-28 sm:px-10 sm:py-10'>
        <div className="grid sm:grid-cols-2 gap-10 ">

            <div className='border rounded border-[#002455] p-3 sm:p-5'>
                <h3 className='mt-2 mb-5 text-xl font-bold'>Hello, janeDoe!</h3>
                <p className='mb-5'>Bio: I love travelling to different places and meeting new people!</p>
                <p className='mb-5'>Name: Jane Doe</p>
                <p className='mb-5'>Email: janedoe@gmail.com</p>
                <p className='mb-5'>Phone: +1901278917</p>
                <p className='mb-5'>Gender: Female</p>
                <p className='mb-5'>Nationality: Ghanian</p>
                <p className='mb-5'>Interests: travel, hospitality</p>
                <p className='mb-5'>7 connections</p>
            </div>

            <div className='flex my-3 text-[0.8rem] sm:text-base sm:hidden'>
            <button onClick={() => editProfile()} className='border mr-3 sm:mr-5 sm:px-3 px-1.5 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Edit Profile</button>
            <button onClick={() => getConnections()} className='border sm:px-3 px-2 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>View Connections</button>
            </div>

            <div className='border rounded border-[#002455] p-3 sm:p-5'>
                <h3 className='text-lg'>Itineraries</h3>
                <button onClick={() => handleItinerary('add')} className='border text-sm my-3 px-3 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Add Itinerary</button>
                <div className='my-5'>
                    <p className='font-bold'>Ethiopia, Addis Ababa</p>
                    <p>23-01-2023 to 14-02-2023</p>
                    <button onClick={() => handleItinerary('edit')} className='border text-xs my-3 px-3 py-1 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Edit</button>
                </div>

                <div className='my-5'>
                    <p className='font-bold'>Nigeria, Lagos</p>
                    <p>23-02-2023 to 14-04-2023</p>
                    <button onClick={() => handleItinerary('edit')} className='border text-xs my-3 px-3 py-1 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Edit</button>
                </div>
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
