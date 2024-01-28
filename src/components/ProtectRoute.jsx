import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/authContext';
import Loading from './UI/Loading';

const ProtectRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state set to null
    const { CheckAuth } = useAuth();
  
    useEffect(() => {
      CheckAuth().then(({ status }) => {
        setIsAuthenticated(status);
      });
    }, []);
  
    return (
      <>
        {isAuthenticated === null ? ( // Render the message only when the status is known
          <Loading loading={true} />
        ) : isAuthenticated ? (
          children
        ) : (
          <div>
            <p className='text-3xl font-normal text-red-600 mt-12'>Please login to see this page :(</p>
          </div>
        )}
      </>
    );
  };
  

export default ProtectRoute
