import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";
// import headerstyle from "./header.module.scss";
import "./header.scss";
import slogo from "../../assets/images/MovieLogo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {togglefunk} from '../../app/features/OpenSlice';
import {deleteSelectedUsers, UserData} from '../services/UserInfo'
// import hom from "../pages/Home/index"
import {changeLang} from '../../app/features/Language';

const HeaderComponent:React.FC<any> = ({translate}) => {
    const[active, setActive] = useState("nav__menu");
    const[toggleIcon, setToggleIcon] = useState("nav__toggler");

    const[clicks, setClicks] = useState(false);

    const clickactive = () => {
      setClicks(false) ? setActive('nav__menu nav__active') : setActive('nav__menu');
      setClicks(false) ? setToggleIcon('nav__toggler toggle') : setToggleIcon('nav__toggler');
  
    }
    const navToggle = () => {
        active === "nav__menu" ? setActive('nav__menu nav__active') : setActive('nav__menu');
        toggleIcon === "nav__toggler" ? setToggleIcon('nav__toggler toggle') : setToggleIcon('nav__toggler')
    
    }

    const [loggedUserr, setLoggedUser] = useState(false);
    // useEffect(() => {
    // }, []);
    // const [loggedjsUserr, setLoggedjsUser] = useState(false);
    const [presentUser, setPresentUser] = useState(localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')) : []);

    const [newuser, setNewuser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);

    const langg = useSelector(state => state.language.lang)
    const contnt = useSelector(state => state.language.content)

    const tgl = useSelector(state => state.openn.toggleact)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const totalitems = useSelector(state => state.cardd.totalitem);
    const favcount = useSelector(state => state.cardd.favoritecount);
    const watchcount = useSelector(state => state.cardd.watchlistcount);


    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {

        setLoggedUser(old_data => localStorage.getItem('loggedUser'))   

        setPresentUser(JSON.parse(localStorage.getItem('loggedUser')))   

        // setLoggedjsUser(old_data => JSON.parse(localStorage.getItem('loggedUser')))

    }, [translate])

            // useEffect(() => {

            //     setLoggedjsUser(old_data => JSON.parse(localStorage.getItem('loggedUser')))
            
            // }, [loggedUserr])

    const logout = (e) => {
        e.preventDefault();             
        localStorage.removeItem('loggedUser');
        setLoggedUser(old_data => (false));
        navigate('/');  
        dispatch(togglefunk(false));

        localStorage.removeItem('storageselectusermovie');
        // localStorage.removeItem('storageallusermovie');
        
            // deleteSelectedUsers(loggedjsUserr.id).then(res => {
            //     console.log(res)
            // })

    }
    


    return (
        <>

        <div className={"header"}>
          <div className={"navbar"}>
                <div className={"container"}>
                    <div className={"sitelogo"}>
                        <NavLink to="/"><img src={slogo} /></NavLink>
                    </div>

                    <nav className={"pages"}>
                        <ul className={active}>
                            <li onClick={clickactive} className={clicks}><NavLink to="/">{contnt.home}</NavLink></li>
                            <li onClick={clickactive} className={clicks}><NavLink to="/about">{contnt.about}</NavLink></li>
                            <li onClick={clickactive} className={clicks}><NavLink to="/mediacenter">{contnt.mcenter}</NavLink></li>
                            <li onClick={clickactive} className={clicks}><NavLink to="/contact">{contnt.contact}</NavLink></li>
                        </ul>
                    </nav>
	                {/* <select className={translateselect} onChange={(e) => {dispatch(changeLang(e.target.value))}}>
                        <option value={"EN"} selected={langg === 'EN'}>EN</option>
                        <option value={"AZ"} selected={langg === 'AZ'}>AZ</option>
                    </select> */}

                    <nav className={"icons"}>
                        <ul>
                            <li>
                            <select className={"translateselect"} onChange={(e) => {dispatch(changeLang(e.target.value))}}>
                                <option value={"EN"} selected={langg === 'EN'}>EN</option>
                                <option value={"AZ"} selected={langg === 'AZ'}>AZ</option>
                            </select>
                            </li>
                        {
                            !loggedUserr && <>
                                <li id='sIn'><NavLink to="/signIn"> {contnt.signin} </NavLink></li>
                                <li id='sUp'><NavLink to="/signUp"> {contnt.signup} </NavLink></li>
                            </>
                        }
                        
                        {
                            loggedUserr && <>
                                <li><NavLink to="/favorite"> <FontAwesomeIcon icon={faHeart} /> </NavLink>
                                <span className={"countshow"} >
                                    {favcount}</span></li>
                                
                                <li><NavLink to="/basket"><FontAwesomeIcon icon={faBasketShopping} /></NavLink>
                                <span className={"countshow"} >
                                    {totalitems.reduce((a, b) => a + b, 0)}</span>
                                </li>
                                <li id='usericon' onClick={() => {
                                    dispatch(togglefunk(false))                       
                                }}><FontAwesomeIcon icon={faUser} /></li>
                                <li id='downupicon' onClick={() => {
                                    dispatch(togglefunk(false))                       
                                }}><FontAwesomeIcon icon={tgl ? faChevronUp : faChevronDown} /></li>
                                {
                                    tgl && 
                                    <div className={"usermenu"}>
                                        <ul>
                                           
                                        <li id='username'>{presentUser.name}</li>
                                        <li id='useracnt'><NavLink to="/myaccount" onClick={() => {
                                            dispatch(togglefunk(false))                       
                                        }}>{contnt.myact}</NavLink></li>

                                        <li id='userwatch'><NavLink to="/watchlist" onClick={() => {
                                            dispatch(togglefunk(false))                       
                                        }}>{contnt.watch} <span className={"countshow"} >
                                        {watchcount}</span></NavLink></li>

                                        {/* <li id='usersupport'><NavLink to="/support" onClick={() => {
                                            dispatch(togglefunk(false))                       
                                        }}>Support</NavLink></li> */}

                                        <li id='userset'><NavLink to="/settings" onClick={() => {
                                            dispatch(togglefunk(false))                       
                                        }}>{contnt.settng}</NavLink></li>
                                        
                                        <span></span>
                                        <li id='userout'><NavLink to="/" onClick={logout}>{contnt.sout}</NavLink></li>
                                            
                                            
                                        </ul>
                                    </div>
                                }
                            </>
                        }

                            <div onClick={navToggle} className={toggleIcon}>
                                <div className='line1'></div>
                                <div className='line2'></div>
                                <div className='line3'></div>
                            </div>

                            {/* <li><NavLink to="/favorite"> <FontAwesomeIcon icon={faHeart} /> </NavLink></li>
                            <li><NavLink to="/basket"><FontAwesomeIcon icon={faBasketShopping} /></NavLink></li>
                            <li><NavLink to="/"><FontAwesomeIcon icon={faUser} /></NavLink></li> */}
                        </ul>

                        
                    </nav>

                </div>
          </div>
        </div>

        
        
        

            
        </>
    )
}


const mapStateToProps = (state: any) => {
    return {
        translate:  [],
    }
}

export default connect(mapStateToProps, {})(HeaderComponent)