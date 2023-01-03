import {Link} from 'react-router-dom'

export const Home = () => {

  return (
    <section className="">

    <div className="px-6 py-10 lg:mt-10 flex justify-center items-center text-[#002455]">
    <div>

        
    <h2 className=" text-5xl sm:text-8xl">Welcome!</h2>

    <div className="text-3xl sm:text-4xl mt-6">Connect With travellers from all over the world!</div>

    <button className="mt-10 border border-[#002455] rounded  px-2 sm:px-4 py-2 text-base sm:text-lg hover:bg-[#002455] hover:text-[#ffffff]"><Link to="/search">Search for a travel partner</Link></button>
    </div>
    </div>

    </section>
  )
}
