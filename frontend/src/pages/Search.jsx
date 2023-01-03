import React from 'react'
// import {Link, useNavigate} from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link';


export const Search = () => {
  // const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault()
    console.log('search submitted')
    // navigate('/search#search_results');
  }

  return (
    <div className="text-[#002455] lg:mt-2 mb-10">
        <div className="flex justify-center px-3 sm:px-0">
        <h3 className="text-2xl sm:text-4xl text-center">Search for a travel partner</h3>
        </div>

        <div className="flex justify-center">
            <form className="sm:w-5/12 w-11/12" onSubmit={(e) => submitSearch(e)}>
                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="text" id="country" name="country"
                placeholder='Enter destination country'/>
                </div>

                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="text" id="state" name="state"
                placeholder='Enter destination state'/>
                </div>

                <div className="border border-[#999999] mt-8 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="text" id="city" name="city"
                placeholder='Enter destination city'/>
                </div>

                <div className='mt-6'><label htmlFor="start_date"> Enter travel start date</label></div>
                <div className="border border-[#999999] mt-2 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="date" id="start_date" name="start_date"
                placeholder='Enter travel start date'/>
                </div>

                <div className='mt-6'><label htmlFor="end_date"> Enter travel end date</label></div>
                <div className="border border-[#999999] mt-2 w-full rounded">
                <input className="outline-none p-3 w-full rounded" type="date" id="end_date" name="end_date"
                placeholder='Enter travel end date'/>
                </div>

                <div className="mt-5">
                <button type="submit" className="border border-[#002455] px-16 py-2 hover:bg-[#002455] hover:text-[#ffffff] rounded">
                  {/* <HashLink to="/search#search_results"> */}
                    Search
                  {/* </HashLink> */}
                  </button>
                </div>
            </form>
        </div>

        <div className='h-96 border border-2 border-[blue] my-5' id="search_results">

        </div>
    </div>
  )
}
