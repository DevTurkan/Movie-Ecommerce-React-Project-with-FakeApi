import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";

import slogo from "../../assets/images/MovieLogo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HeaderComponent from '../Header'

const LoginAuthfuct:React.FC<any> = ({translate}) => {
  
  const [loggedUser, setLoggedUser] = useState(false)
  const navigate = useNavigate();

    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {

      if(localStorage.getItem('loggedUser')){
        navigate('/')
      }

      setLoggedUser(old_data => JSON.parse(localStorage.getItem('loggedUser')))

    }, [translate])

    

    

    return (
        <>
          <div>
            {
              !loggedUser && <>
                <HeaderComponent signinn={'/signIn'} signupp={'/signUp'} favoritee={'/signUp'} baskett={'/signUp'} />
              </>

            }

            {/* {
              loggedUser && <>
                <HeaderComponent signinn={'/'} signupp={'/'} favoritee={'/favorite'} baskett={'/basket'} />
              </>

            } */}

            </div>
        </>
    )
}


const mapStateToProps = (state: any) => {
    return {
        translate:  [],
    }
}

export default connect(mapStateToProps, {})(LoginAuthfuct)
