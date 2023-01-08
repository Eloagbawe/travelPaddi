import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import Moment from 'react-moment';
import moment from 'moment';
import { Modal } from '../components/Modal'
import { Spinner} from '../components/Spinner'
import { getMe, updateProfile, resetProfile } from '../features/profile/profileSlice'
import { addItinerary, updateItinerary, resetItinerary, deleteItinerary } from '../features/itineraries/itinerarySlice'
import { logout } from '../features/auth/authSlice'
import { acceptConnection, deleteConnection, getConnections, resetConnection } from '../features/connections/connectionSlice'



export const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [editProfileModal, setEditProfileModal] = useState(false)
    const [connectionsModal, setConnectionsModal] = useState(false)
    const [addItineraryModal, setAddItineraryModal] = useState(false)
    const [editItineraryModal, setEditItineraryModal] = useState(false)
    const [itineraryToUpdate, setItineraryToUpdate] = useState({
        id: '',
        country: '',
        state: '',
        city: '',
        start_date: '',
        end_date: '',
        details: ''
    })



    const {profile, isLoading, isSuccess, isError, message} = useSelector((state) => state.profile)
    const {user} = useSelector((state) => state.auth)
    const {itineraryLoading, itineraryError, itinerarySuccess, itineraryMessage} = useSelector((state) => state.itinerary)
    const {connections, connectionError, connectionSuccess,
        connectionLoading, connectionMessage} = useSelector((state) => state.connection)

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
        if (itineraryError) {
            toast.error(itineraryMessage)
        }
        if (connectionError) {
            toast.error(itineraryMessage)
        }

        if (!user) {
            navigate('/login')
        } else {
            dispatch(getMe()) 
            dispatch(getConnections())
        }

        return () => {
            dispatch(resetProfile())
            dispatch(resetItinerary())
            dispatch(resetConnection())
          }
    }, [navigate, user, isError, message,
        dispatch, itineraryError, itineraryMessage, 
        connectionError, connectionMessage])
    
    const openEditProfile = () => {
        setEditProfileModal(true)
    }

    const closeEditProfile = () => {
        setEditProfileModal(false)
    }

    const openConnections = () => {
        setConnectionsModal(true)
    }

    const closeConnections = () => {
        setConnectionsModal(false)
    }

    const openAddItinerary = () => {
        setAddItineraryModal(true)
    }

    const closeAddItinerary = () => {
        setAddItineraryModal(false)
    }

    const openEditItinerary = (id, country, state, city, start_date, end_date, details) => {
        setEditItineraryModal(true)
        setItineraryToUpdate({
            id: id,
            country: country,
            state: state,
            city: city,
            start_date: start_date,
            end_date: end_date,
            details: details
        })
    }

    const closeEditItinerary = () => {
        setEditItineraryModal(false)
    }

    const EditProfileModal = ({open, handleClose}) => {
        const [formData, setFormData] = useState({
            first_name: profile?.first_name ? profile.first_name : '',
            last_name: profile?.last_name ? profile.last_name : '',
            phone: profile?.phone ? profile.phone : '',
            bio: profile?.bio ? profile.bio : '',
            interests: profile?.interests ? profile.interests : '',
            gender: profile?.gender ? profile.gender : '',
            nationality: profile?.nationality ? profile.nationality : ''
        })

        const {first_name, last_name, phone, bio, interests, gender, nationality} = formData

        const onChange = (e) => {
            setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
            }))
        }

        const onSubmit = (e) => {
            e.preventDefault()
            const userData = {first_name, last_name, phone, bio, interests, gender, nationality}
            dispatch(updateProfile(userData)).then(() => {
                if (isSuccess) {
                    toast.success('Profile Successfully Updated')
                    dispatch(getMe())
                }
            })
            setEditProfileModal(false)
        }

        const onCancel = (e) => {
            setEditProfileModal(false)
        }
        return (
            <Modal open={open} handleClose={handleClose} className={'sm:w-6/12 lg:w-4/12'}>
                <div>
                    <h3 className='text-lg font-bold mb-5'>Edit Profile</h3>
                    <form onSubmit={onSubmit}>
                        <div className='mt-2 mb-4'>
                        <label htmlFor='first_name' className='mr-2 block'>First Name: </label>
                        <input maxLength={30} id="first_name" type="text" name="first_name" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={first_name}/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='last_name' className='mr-2 block'>Last Name: </label>
                        <input maxLength={30} id="last_name" name="last_name" type="text" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={last_name}/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='phone' className='mr-2 block'>Phone: </label>
                        <input maxLength={15} id="phone" name="phone" type="tel" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={phone}/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='bio' className='mr-2 block'>Bio: </label>
                        <textarea maxLength={100} id="bio" name="bio"
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={bio}></textarea>
                        </div>

                        <div className='my-4'>
                        <label maxLength={50} htmlFor='interests' className='mr-2 block'>Interests: </label>
                        <input id="interests" name="interests" type="text" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={interests}/>
                        </div>

                        <div className='my-4'>
                        <label maxLength={20} htmlFor='gender' className='mr-2 block'>Gender: </label>
                        <input id="gender" name="gender" type="text" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={gender}/>
                        </div>

                        <div className='my-4'>
                        <label maxLength={30} htmlFor='nationality' className='mr-2 block'>Nationality: </label>
                        <input id="nationality" name="nationality" type="text" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={nationality}/>
                        </div>

                        <div className='my-8 flex justify-between'>
                        <button type="submit" className='border w-4/12 rounded border-[#002455] px-3 py-2'>Save</button>
                        <button type="reset" onClick={onCancel}className='border rounded w-4/12 border-[#002455] px-3 py-2'>Cancel</button>
                        </div>

                    </form>
                </div>
            </Modal>
        )
    }

    const ConnectionsModal = ({open, handleClose}) => {
        const accept = (id) => {
            dispatch(acceptConnection(id)).then(() => {
                dispatch(getConnections())
            })
        }

        const deleteConnect = (id) => {
            dispatch(deleteConnection(id)).then(() => {
                dispatch(getConnections())
                dispatch(getMe())
            })
        }

        const viewProfile = (senderId, recipientId) => {
            if (senderId === user._id) {
                navigate(`/profile/${recipientId}`)
            } else {
                navigate(`/profile/${senderId}`)
            }
        }
        return (
            <Modal open={open} handleClose={handleClose} className={'sm:w-8/12 md:w-7/12 xl:w-4/12'}>
                <div className=''>
                    <h3 className='font-bold'>Connections</h3>
                    {connections?.length > 0 ? 
                    (<div className='mt-5 overflow-scroll'>
                        {connections?.map((connection) => (
                            <div key={connection?._id}>
                                <div className='flex my-5 sm:justify-between items-center'>
                                    <p className='mr-5'>{connection?.sender?._id === user._id ? 
                                    connection?.recipient?.username : 
                                    connection?.sender?.username}</p>
                                    {connection?.status === 'pending' && <>
                                    {connection?.sender?._id === user?._id ? <span className="mr-5">Pending</span> :
                                        <button onClick={() => accept(connection?._id)} className='border border-[#002455] px-3 py-2 rounded text-sm mr-3 shrink-0'>Accept Request</button>
                                    }
                                    <button onClick={() => deleteConnect(connection?._id)} className='border border-[#002455] px-3 py-2 rounded text-sm shrink-0'>Delete</button></>}
                                    {connection?.status === 'accepted' && <>
                                    <button onClick={() => viewProfile(connection?.sender._id, connection?.recipient._id)} className='border border-[#002455] px-3 py-2 rounded text-sm mr-5 shrink-0'>View Profile</button>
                                    <button onClick={() => deleteConnect(connection?._id)} className='border border-[#002455] px-3 py-2 rounded shrink-0'>Delete</button></>}
                                    
                                </div>
                                <div className='border-t border-[#002455]'></div>
                            </div>
                        ))}
                    </div>):
                    (<p className='my-5'>No Connections yet</p>)}
                </div>
            </Modal>
        )
    }

    const AddItineraryModal = ({open, handleClose}) => {

        const [formData, setFormData] = useState({
            country: '',
            state: '',
            city: '',
            start_date: '',
            end_date: '',
            details: ''
        })

        const {country, state, city, start_date, end_date, details} = formData

        const onChange = (e) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
                }))
        }

        const onSubmit = (e) => {
            e.preventDefault()

            if (start_date > end_date) {
                toast.error('Invalid dates!')
                return
            }

            const itineraryData = {country: country.toLowerCase(), 
                                   state:  state.toLowerCase(),
                                   city: city.toLowerCase(),
                                   details, start_date, end_date}

            dispatch(addItinerary(itineraryData)).then(() => {
                dispatch(getMe())
            })
            setAddItineraryModal(false)
        }

        const onCancel = (e) => {
            setAddItineraryModal(false)
        }

        return (
            <Modal open={open} handleClose={handleClose} className={'sm:w-6/12 lg:w-4/12'}>
                <div>
                    <h3 className='text-lg font-bold mb-5'>Add Itinerary</h3>
                    <form onSubmit={onSubmit}>
                        <div className='mt-2 mb-4'>
                        <label htmlFor='country' className='mr-2 block'>Country: </label>
                        <input maxLength={30} id="country" type="text" name="country" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={country} required/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='state' className='mr-2 block'>State: </label>
                        <input maxLength={30} id="state" name="state" type="text" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={state}/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='city' className='mr-2 block'>City: </label>
                        <input maxLength={30} id="city" name="city" type="text" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={city}/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='details' className='mr-2 block'>Details: </label>
                        <textarea maxLength={100} id="details" name="details"
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={details}></textarea>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='start_date' className='mr-2 block'>Start Date: </label>
                        <input id="start_date" name="start_date" type="date" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={start_date} required/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='end_date' className='mr-2 block'>End Date: </label>
                        <input id="end_date" name="end_date" type="date" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={end_date} required/>
                        </div>

                        <div className='my-8 flex justify-between'>
                        <button type="submit" className='border w-4/12 rounded border-[#002455] px-3 py-2'>Save</button>
                        <button type="reset" onClick={onCancel} className='border rounded w-4/12 border-[#002455] px-3 py-2'>Cancel</button>
                        </div>

                    </form>
                </div>
            </Modal>
        )
    }

    const EditItineraryModal = ({open, handleClose}) => {
        const [formData, setFormData] = useState({
            country: capitalize(itineraryToUpdate.country),
            state: capitalize(itineraryToUpdate.state),
            city: capitalize(itineraryToUpdate.city),
            start_date: moment(itineraryToUpdate.start_date).format('YYYY-MM-DD'),
            end_date: moment(itineraryToUpdate.end_date).format('YYYY-MM-DD'),
            details: itineraryToUpdate.details
        })

        const {country, state, city, start_date, end_date, details} = formData

        const onChange = (e) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
                }))
        }


        const onSubmit = (e) => {
            e.preventDefault()

            if (start_date > end_date) {
                toast.error('Invalid dates!')
                return
            }

            const itineraryData = {country: country.toLowerCase(), 
                state:  state.toLowerCase(),
                city: city.toLowerCase(),
                details, start_date, end_date}

            const params = {
                id: itineraryToUpdate.id,
                data: itineraryData
            }

            dispatch(updateItinerary(params)).then(() => {
                dispatch(getMe())
            })
            setEditItineraryModal(false)
        }

        const onCancel = () => {
            setEditItineraryModal(false)
        }
        return (
            <Modal open={open} handleClose={handleClose} className={'sm:w-6/12 lg:w-4/12'}>
                <h3 className='text-lg font-bold mb-5'>Edit Itinerary</h3>
                <form onSubmit={onSubmit}>
                        <div className='mt-2 mb-4'>
                        <label htmlFor='country' className='mr-2 block'>Country: </label>
                        <input maxLength={30} id="country" type="text" name="country" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={country} required/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='state' className='mr-2 block'>State: </label>
                        <input maxLength={30} id="state" name="state" type="text" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={state}/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='city' className='mr-2 block'>City: </label>
                        <input maxLength={30} id="city" name="city" type="text" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={city}/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='details' className='mr-2 block'>Details: </label>
                        <textarea maxLength={100} id="details" name="details"
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={details}></textarea>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='start_date' className='mr-2 block'>Start Date: </label>
                        <input id="start_date" name="start_date" type="date" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={start_date} required/>
                        </div>

                        <div className='my-4'>
                        <label htmlFor='end_date' className='mr-2 block'>End Date: </label>
                        <input id="end_date" name="end_date" type="date" 
                        className='border rounded p-1.5 w-full xl:w-8/12
                        focus:outline-none' onChange={onChange} value={end_date} required/>
                        </div>

                        <div className='my-8 flex justify-between'>
                        <button type="submit" className='border w-4/12 rounded border-[#002455] px-3 py-2'>Save</button>
                        <button type="reset" onClick={onCancel} className='border rounded w-4/12 border-[#002455] px-3 py-2'>Cancel</button>
                        </div>

                    </form>
            </Modal>
        )
    }

    const onDeleteItinerary = (id) => {
        dispatch(deleteItinerary(id))
    }

    if (isLoading || itineraryLoading || connectionLoading) {
        return (<Spinner/>)
      }

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

  return (
    <>
    <section className='text-[#002455] p-5 xl:px-28 sm:px-10 sm:py-10'>
        <div className="grid sm:grid-cols-2 gap-10 ">

            <div className='border rounded border-[#002455] p-3 sm:p-5 h-[32rem]'>
                <h3 className='mt-2 mb-5 text-xl font-bold'>Hello, {profile ? profile?.username : ''}!</h3>
                <p className='mb-5'>Bio: {profile?.bio ? profile?.bio : ''}</p>
                <p className='mb-5'>Name: {profile?.first_name ? profile?.first_name : ''} {profile?.last_name ? profile?.last_name : ''}</p>
                <p className='mb-5'>Email: {profile ? profile?.email : ''}</p>
                <p className='mb-5'>Phone: {profile ? profile?.phone : ''}</p>
                <p className='mb-5'>Gender: {profile?.gender ? profile?.gender : ''}</p>
                <p className='mb-5'>Nationality: {profile?.nationality ? profile?.nationality : ''}</p>
                <p className='mb-5'>Interests: {profile?.interests ? profile?.interests : ''}</p>
                <p className='mb-5'>{profile ? profile?.connections?.length : ''} {profile?.connections?.length === 1 ? 'connection' : 'connections'}</p>

                <button className='border mt-2 text-md sm:px-3 px-2 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>
                    <Link to="/search">Search for a travel partner</Link>
                    </button>

            </div>

            <div className='flex my-3 text-[0.8rem] sm:text-base sm:hidden'>
            <button onClick={openEditProfile} className='border mr-3 sm:mr-5 sm:px-3 px-1.5 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Edit Profile</button>
            <button onClick={openConnections} className='border sm:px-3 px-2 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>View Connections</button>
            </div>

            <div className='border rounded border-[#002455] p-3 sm:p-5 h-[32rem] overflow-scroll'>
                <h3 className='text-2xl'>Itineraries</h3>
                <button onClick={openAddItinerary} className='border text-sm my-3 px-3 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Add Itinerary</button>
                {profile?.itineraries?.length > 0 ? (
                    <div>
                        {profile?.itineraries.map((itinerary) => (
                           <div className='my-5' key={itinerary?._id}>
                           <p className='font-bold'>{capitalize(itinerary?.country)}{itinerary?.state ? ', ' + capitalize(itinerary?.state) : ''} {itinerary?.city? ', ' + capitalize(itinerary?.city) : ''}</p>
                           <p><Moment format="MMM DD, YYYY">{itinerary?.start_date}</Moment>
                           <span> to </span>  
                           <Moment format="MMM DD, YYYY">{itinerary?.end_date}</Moment></p>
                           <p className='my-1'>Details: {itinerary?.details ? itinerary?.details : ''}</p>
                           <button onClick={() => openEditItinerary(itinerary?._id, itinerary?.country, itinerary?.state, itinerary?.city, itinerary?.start_date, itinerary?.end_date, itinerary?.details)} 
                           className='border mr-5 text-xs my-3 px-3 py-1 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Edit</button>
                           <button onClick={() => onDeleteItinerary(itinerary?._id)} 
                           className='border text-xs my-3 px-3 py-1 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Delete</button>
                       </div> 
                        ))}
                    </div>
                ) : (<div>You have no itineraries yet</div>)}
            </div>

        </div>
        <div className='flex my-5 text-[0.8rem] sm:text-base hidden sm:block'>
            <button onClick={openEditProfile} className='border mr-3 sm:mr-5 sm:px-3 px-1.5 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>Edit Profile</button>
            <button onClick={openConnections} className='border sm:px-3 px-2 py-2 rounded border-[#002455] hover:bg-[#002455] hover:text-[#ffffff]'>View Connections</button>
        </div>
    </section>
    <EditProfileModal open={editProfileModal} handleClose={closeEditProfile}/>
    <AddItineraryModal open={addItineraryModal} handleClose={closeAddItinerary} />
    <EditItineraryModal open={editItineraryModal} handleClose={closeEditItinerary} />
    <ConnectionsModal open={connectionsModal} handleClose={closeConnections} />
    </>
  )
}
