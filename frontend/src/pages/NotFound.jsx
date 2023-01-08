import {Link} from 'react-router-dom'


export const NotFound = () => {
  return (
    <div className='text-center mt-10 text-[#002455]'>
        <p>Sorry, the page you're looking for does not exist</p>
        <button className='mt-5 border border-[#002455] px-3 py-2 rounded'><Link to="/">Return to Home</Link></button>
    </div>
  )
}
