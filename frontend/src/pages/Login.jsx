import { FaSignInAlt } from "react-icons/fa"
import { useState } from "react"

export const Login = () => {
  return (
    <div className="text-[#002455] mt-10">
        <div className="flex justify-center">
        <FaSignInAlt className="mt-3 mr-2 text-lg"/>
        <h3 className="text-4xl">Login</h3>
        </div>

        <div className="flex justify-center">
            <form className="sm:w-4/12 w-11/12">
                <div className="border border-[#999999] mt-10 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="email" id="email" name="email"
                placeholder='Enter your email'/>
                </div>

                <div className="border border-[#999999] mt-10 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="password" id="password" name="password"
                placeholder='Enter your password'/>
                </div>
                <div className="mt-5">
                    <button className="border border-[#002455] px-16 py-2 hover:bg-[#002455] hover:text-[#ffffff] rounded">Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}
