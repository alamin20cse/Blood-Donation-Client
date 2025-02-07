import { useEffect } from 'react';
import errorpic from '../assets/error.avif'
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {

    return (
        <div>
                 <Helmet>
       <title>Blood Donation Application | Error</title>
   </Helmet>
            <img className='w-full h-full' src={errorpic} alt="" />
            
        </div>
    );
};

export default ErrorPage;