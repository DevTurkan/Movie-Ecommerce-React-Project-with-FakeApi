import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Loginauth({Logcomponent}) {
    const [loggedUser, setLoggedUser] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {       
       if(localStorage.getItem('loggedUser')){
          navigate('/')
        }
  
      setLoggedUser(old_data => JSON.parse(localStorage.getItem('loggedUser')))
    }, []);
  
    return (
    <div>
    {
      !loggedUser && Logcomponent

    }

    </div>
  )
}

export default Loginauth