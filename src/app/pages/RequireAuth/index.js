import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../Login';

function RequireAuth({Component}) {
  const [loggedUser, setLoggedUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {      
      if(!localStorage.getItem('loggedUser')){
        navigate('/login')
      }

    setLoggedUser(old_data => JSON.parse(localStorage.getItem('loggedUser'))) // NIYE JSON OLDU KI?
  }, []);

  return (
    <>
       {
         loggedUser && Component
       }

       {/* {
         !loggedUser && <Login />
       } */}

       {/* {
         loggedUser && Logg
       } */}
    </>
  )
}

export default RequireAuth