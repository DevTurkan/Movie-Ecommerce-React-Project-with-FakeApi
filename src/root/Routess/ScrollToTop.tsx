// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }



import React, { useState, useEffect } from 'react'
import scrlstyle from './scrolltop.module.scss'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

function ScrollToTop() {

    const [showScrollButton, setScrollButton] = useState(false)

    useEffect(() => {

        window.addEventListener('scroll', () => {

            if (window.scrollY > 300) {
                setScrollButton(true)
            }
            else {
                setScrollButton(false)
            }
        })

        // if(showScrollButton === true){
        //     window.scrollTo = 200
        // }

     

    }, []);

   const scrolup = () =>{
            window.scrollTo({
                top:0,
                behavior: "smooth"
            })
        }

    return (
        <div>
            {
                showScrollButton && <button className={scrlstyle.top} onClick={scrolup} ><FontAwesomeIcon icon={faArrowUp} /></button>
                // showScrollButton && <a href='#top' className={scrlstyle.top} ><FontAwesomeIcon icon={faArrowUp} /></a>
            }

        </div>
    )


}

export default ScrollToTop
