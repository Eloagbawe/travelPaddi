import { FaUser } from "react-icons/fa"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Spinner} from '../components/Spinner'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { register, reset } from "../features/auth/authSlice"
import { resetProfile } from '../features/profile/profileSlice'
import { resetConnection } from "../features/connections/connectionSlice"
import { resetItinerary } from "../features/itineraries/itinerarySlice"


export const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  const {username, email, password, confirmPassword, phone} = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user ) {
      navigate('/dashboard')
    }

    dispatch(reset())
    dispatch(resetProfile())
    dispatch(resetConnection())
    dispatch(resetItinerary())

  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (username === '' || email === '' || password === ''
        || confirmPassword === '' || phone === '') {
          toast.error('Please fill in all details')
          return
        }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
    } else {
      const userData = {username, email, password, phone}
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return (<Spinner/>)
  }
  return (
    <div className="text-[#002455] lg:mt-2 mb-10">
        <div className="flex justify-center text-center">
        <FaUser className="mt-2 sm:mt-3 mr-2 sm:text-lg"/>
        <h3 className="text-2xl sm:text-4xl">Create an Account</h3>
        </div>

        <div className="flex justify-center">
            <form className="sm:w-5/12 w-11/12 text-xs sm:text-base" onSubmit={onSubmit}>
                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none rounded p-3 w-full" type="username" id="username" name="username"
                placeholder='Enter your username' value={username} onChange={onChange} required/>
                </div>
                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none rounded p-3 w-full" type="email" id="email" name="email"
                placeholder='Enter your email' value={email} onChange={onChange} required/>
                </div>

                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none rounded p-3 w-full" type="password" id="password" name="password"
                placeholder='Enter your password' value={password} onChange={onChange} required/>
                </div>

                <div className={`${password && password !== confirmPassword ? 'border-[red]' : 'border-[#999999]'} border mt-8 w-full rounded`}>
                <input className="outline-none rounded p-3 w-full" type="password" id="confirmPassword" name="confirmPassword"
                placeholder='Confirm password' value={confirmPassword} onChange={onChange} required/>
                </div>

                <div className="border-[#999999] border  mt-8 w-full rounded">
                <input className="outline-none rounded p-3 w-full" type="tel" id="phone" name="phone"
                placeholder='Enter phone number' value={phone} onChange={onChange} required/>
                </div>

                <div className="mt-5">
                    <button className="border border-[#002455] px-16 py-2 hover:bg-[#002455] hover:text-[#ffffff] rounded">Signup</button>
                </div>
            </form>
        </div>
    </div>
  )
}
