import { FaUser } from "react-icons/fa"

export const Signup = () => {
  return (
    <div className="text-[#002455] lg:mt-2 mb-10">
        <div className="flex justify-center text-center">
        <FaUser className="mt-2 sm:mt-3 mr-2 sm:text-lg"/>
        <h3 className="text-2xl sm:text-4xl">Create an Account</h3>
        </div>

        <div className="flex justify-center">
            <form className="sm:w-5/12 w-11/12 text-xs sm:text-base">
                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none rounded p-3 w-full" type="username" id="username" name="email"
                placeholder='Enter your username'/>
                </div>
                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none rounded p-3 w-full" type="email" id="email" name="email"
                placeholder='Enter your email'/>
                </div>

                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none rounded p-3 w-full" type="password" id="password" name="password"
                placeholder='Enter your password'/>
                </div>

                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none rounded p-3 w-full" type="password" id="confirmPassword" name="confirmPassword"
                placeholder='Confirm password'/>
                </div>

                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none rounded p-3 w-full" type="tel" id="phone" name="phone"
                placeholder='Enter phone number'/>
                </div>

                <div className="mt-5">
                    <button className="border border-[#002455] px-16 py-2 hover:bg-[#002455] hover:text-[#ffffff] rounded">Signup</button>
                </div>
            </form>
        </div>
    </div>
  )
}
