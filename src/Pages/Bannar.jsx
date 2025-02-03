
import { Link } from 'react-router-dom';
import bloodbg from '../assets/bloodbg.jpg'
const Bannar = () => {
    return (
        <div
  className="hero min-h-screen"
  style={{
    backgroundImage: `url(${bloodbg})`,
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
     <div className='grid gap-5 grid-cols-1 lg:grid-cols-2'>
        <div className='bg-red-500 rounded-3xl p-5'>
           <Link to='/signup' className='btn'>Join as a donor</Link>


        </div>
        <div className='bg-red-500 rounded-3xl p-5'>
           <Link to='/dashboard/searchdonors' className='btn'>Search Donors</Link>


        </div>

     </div>
     
      
    </div>
  </div>
</div>
    );
};

export default Bannar;