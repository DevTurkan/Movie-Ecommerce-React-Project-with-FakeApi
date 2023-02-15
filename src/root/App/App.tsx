import React, {useState, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import HashLoader from "react-spinners/HashLoader";
import appstyle from "./app.module.scss";

import Routess from '../Routess'

const App = () => {
   const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)

     setTimeout(() => {
       setLoading(false)
     }, 4600);
   }, [])

  return (
    <>
   {
      loading ? 
      
      <div className={appstyle.common}>
      <h3>MOVIEbox</h3>
        <HashLoader
          color={"#4C8FBF"}          
          loading={loading}
          size={70}
        />
      </div>
      :    
      
   <BrowserRouter>
      <Routess />
    </BrowserRouter>
     
    } 
      
      

    </>
    
  )
}

export default App
