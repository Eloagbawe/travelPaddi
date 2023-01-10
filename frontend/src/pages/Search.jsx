import React, {useState, useEffect} from 'react'
import { searchItinerary, resetItinerary } from '../features/itineraries/itinerarySlice'
import { useSelector, useDispatch } from "react-redux"
import { Spinner} from '../components/Spinner'
import { toast } from "react-toastify"
import Moment from 'react-moment';
import { useNavigate, Link } from 'react-router-dom'
import { resetProfile } from '../features/profile/profileSlice'
import { logout, reset } from '../features/auth/authSlice'
import { requestConnection, getConnections, resetConnection } from '../features/connections/connectionSlice'



export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    city: '',
    start_date: '',
    end_date: ''
  })

  const [searchMode, setSearchMode] = useState(false)

  const {country, state, city, start_date, end_date} = formData

  const {itineraries, itineraryError,
         itineraryLoading, itineraryMessage} = useSelector((state) => state.itinerary)
  
  // const {profile, isError, message} = useSelector((state) => state.profile)

  const {user} = useSelector((state) => state.auth)

  const {connections, connectionError,
         connectionLoading, connectionMessage} = useSelector((state) => state.connection)

  
  useEffect(() => {
    if (itineraryError) {
      toast.error(itineraryMessage)
    }
    if (connectionError) {
      toast.error(connectionMessage)
      if (connectionMessage === 'invalid token' || 
              connectionMessage === 'session expired' ||
              connectionMessage === 'Not authorized') {
              dispatch(logout())
              navigate('/login')
              }
    }
    // if (isError) {
    //   toast.error(message)
    //   if (message === 'invalid token' || 
    //         message === 'session expired' ||
    //         message === 'Not authorized') {
    //         dispatch(logout())
    //         navigate('/login')
    //         }
    // }
    if (!user) {
      navigate('/login')
    } else {
      // dispatch(getMe())
      dispatch(getConnections())
    }

    return () => {
      dispatch(reset())
      dispatch(resetItinerary())
      dispatch(resetProfile())
      dispatch(resetConnection())
    }
  }, [dispatch, itineraryError, 
    itineraryMessage, navigate, connectionError,
    connectionMessage, user])
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const submitSearch = (e) => {
    e.preventDefault()

    if (start_date > end_date) {
      toast.error('Invalid dates!')
      return
    }

    const itineraryData = {country: country.toLowerCase(), 
                          state:  state.toLowerCase(),
                          city: city.toLowerCase(),
                          start_date, end_date}
    
    dispatch(searchItinerary(itineraryData))
    setSearchMode(true)
    // let offsetTop  = document.getElementById("search_results").offsetTop;
    //   window.scrollTo({
    //       top: offsetTop-100, 
    //       behavior: "smooth"
    //   });
  }

  if (itineraryLoading || connectionLoading) {
    return (<Spinner/>)
  }

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const isConnected = (id) => {
    const connection = connections?.filter((data) => 
      (((data.sender._id === id && data.recipient._id === user._id) ||
      (data.sender._id === user._id && data.recipient._id === id)))
    )

    if (connection && connection[0]?.status === 'pending') {
      return 'pending'
    } else if (connection && connection[0]?.status === 'accepted') {
      return 'accepted'
    } else {
      return 'notConnected'
    }
  }

  const requestConnect = (id) => {
    dispatch(requestConnection(id)).then(() => {
      dispatch(getConnections())
    })
  }
  return (
    <div className="text-[#002455] lg:mt-2 mb-10">
        <div className="flex justify-center px-3 sm:px-0">
        <h3 className="text-2xl sm:text-4xl text-center">Search for a travel partner</h3>
        </div>

        <div className={`flex justify-center ${searchMode ? 'hidden' : ''}`}>
            <form className="sm:w-5/12 w-11/12" onSubmit={(e) => submitSearch(e)}>
                <div className="border border-[#999999] mt-8 w-full rounded relative">
                <span className='text-red-300 bg-white absolute top-3.5 right-2 sm:right-3 text-xl'>*</span>
                <input className="outline-none p-3 w-full rounded" type="text" id="country" name="country"
                placeholder='Enter destination country' onChange={onChange} value={country} required/>
                </div>

                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="text" id="state" name="state"
                placeholder='Enter destination state' onChange={onChange} value={state}/>
                </div>

                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="text" id="city" name="city"
                placeholder='Enter destination city' onChange={onChange} value={city}/>
                </div>

                <div className='mt-6'><label htmlFor="start_date"> Enter travel start date <span className='text-red-400'>*</span></label></div>
                <div className="border border-[#999999] mt-2 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="date" id="start_date" name="start_date"
                placeholder='Enter travel start date' onChange={onChange} value={start_date} required/>
                </div>

                <div className='mt-6'><label htmlFor="end_date"> Enter travel end date <span className='text-red-400'>*</span></label></div>
                <div className="border border-[#999999] mt-2 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="date" id="end_date" name="end_date"
                placeholder='Enter travel end date' onChange={onChange} value={end_date} required/>
                </div>

                <div className="mt-5">
                <button type="submit" className="border border-[#002455] px-16 py-2 hover:bg-[#002455] hover:text-[#ffffff] rounded">
                    Search
                  </button>
                </div>
            </form>
        </div>

        <div className='mb-5 mt-10 mx-auto w-11/12 overflow-scroll' id="search_results">
        <div className={`${searchMode ? '' : 'hidden'}`}>
          <h3 className='text-lg'>Results:</h3>

          <div className='border border-[#002455] p-5 rounded mt-5 mb-10 h-96 overflow-scroll'>
          <button className='border border-[#002455] p-2 rounded w-40 mb-5' onClick={() => setSearchMode(false)}>Search Again</button>
          {itineraries?.length > 0 ? (<div>
            {itineraries?.map((itinerary) => (
              <div key={itinerary?._id} >

              <div>
                <div className='grid sm:grid-cols-2 lg:flex lg:justify-between gap-4 place-content-between items-center text-sm xl:text-md my-5'>
                  <p className=''>{itinerary?.user?.username}</p>
                  <p className=''>{capitalize(itinerary?.country)}</p>
                  
                  <p className=''><Moment format="MMM DD, YYYY">{itinerary?.start_date}</Moment>
                           <span> to </span>  
                           <Moment format="MMM DD, YYYY">{itinerary?.end_date}</Moment></p>
                   {isConnected(itinerary.user?._id) === 'accepted'  && (<button className='border border-[#002455] p-2 rounded w-40'><Link to={`/profile/${itinerary?.user?._id}`}>View Profile</Link></button>)}
                   {isConnected(itinerary.user?._id) === 'pending'  && (<button className='border border-[#002455] p-2 rounded w-40'>Pending Request</button>)}
                   {isConnected(itinerary.user?._id) === 'notConnected'  && (<button className='border border-[#002455] p-2 rounded w-40' onClick={() => requestConnect(itinerary?.user?._id)}>Request to Connect</button>)}
                </div>
                <div className='border-t border-[#002455]'></div>
              </div>
              </div>
            ))}
          </div>):(<div>No results</div>)}
          </div>
          
        </div>

        </div>
    </div>
  )
}
