import { FaSignInAlt } from "react-icons/fa"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Spinner} from '../components/Spinner'
import { login, reset } from "../features/auth/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  const {email, password} = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user ) {
      navigate('/dashboard')
    }

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (email.length === 0 || password.length === 0){
      toast.error('Please fill in all details')
    } else {
      const userData = {email, password}
      dispatch(login(userData))
    }
  }

  if (isLoading) {
    return (<Spinner/>)
  }

  return (
    <div className="text-[#002455] lg:mt-2">
        <div className="flex justify-center text-center">
        <FaSignInAlt className="mt-2 sm:mt-3 mr-2 text-lg"/>
        <h3 className="text-2xl sm:text-4xl">Login</h3>
        </div>

        <div className="flex justify-center">
            <form className="sm:w-5/12 w-11/12" onSubmit={onSubmit}>
                <div className="border border-[#999999] mt-10 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="email" id="email" name="email"
                placeholder='Enter your email' value={email} onChange={onChange}/>
                </div>

                <div className="border border-[#999999] mt-10 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="password" id="password" name="password"
                placeholder='Enter your password' value={password} onChange={onChange}/>
                </div>
                <div className="mt-5">
                    <button className="border border-[#002455] px-16 py-2 hover:bg-[#002455] hover:text-[#ffffff] rounded">Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}
