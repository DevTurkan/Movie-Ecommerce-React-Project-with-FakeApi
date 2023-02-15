import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";
// import contactstyle from "../Contact/contact.module.scss";
import signinstyle from "./signin.module.scss";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginfunk} from '../../features/LoginSlice';
import {getuserfunk, selecteduserfunk} from '../../features/UserSlice';
// import immg from '../../../assets/images/signinup.png'
// import contactstyle from "./contact.module.scss";
import { getContact, ContactData } from "../../services/Contactmessages";
// import ButtonComponentone from "../../ComponentsTwo/buttonn/button";
import { getAllUsers, postSelectedUsers, UserData } from "../../services/UserInfo";

import swal from 'sweetalert';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignInPage:React.FC<any> = ({translate}) => {
    const [paroltype, setParoltype] = useState('password');
    const [parolicon, setParolicon] = useState(faEye);

    const [useremail, setUseremail] = useState<String>("");
    const [userparol, setUserparol] = useState<String>("");

    // const log = useSelector(state => state.loginn.inpval);
    const userslist = useSelector(state => state.userr.alluserslist);

    const dispatch = useDispatch()
    const [inputValue, setInputValue]=useState('');
    const navigate = useNavigate();

    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {
        getUsersList();

        if(localStorage.getItem('loggedUser')){
            navigate('/')
        }
    
        // setLoggedUser(old_data => JSON.parse(localStorage.getItem('loggedUser')))
      
    }, [translate])

    const getUsersList = async () => {
        const get_users= await getAllUsers();

        dispatch(getuserfunk(get_users))
      
    }
       
    const signinSystem = async(e) => {
        e.preventDefault(); 

        if(useremail && userparol){
            const user = userslist.find((finduser) => finduser.email == useremail && finduser.password == userparol)
            if(user){

                

                // postSelectedUsers(user).then(res => {
                //     console.log(res)
                // })

                    localStorage.setItem('storageselectusermovie', JSON.stringify({id: user.id, watchlist: user.watchlist, card: user.card, wishlist: user.wishlist}));
                    // dispatch(selecteduserfunk(JSON.parse(localStorage.getItem('storageselectusermovie'))))
                // dispatch(selecteduserfunk(user))   

                // localStorage.setItem('loggedUser', JSON.stringify({name: useremail, id: user.id}));
                dispatch(loginfunk([useremail, user.id, user.userName]))
                navigate('/')
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Credentials',
                    confirmButtonColor: '#01b9da',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                // alert("Invalid Credentials");
            }
// console.log(user);
           
        }
        
        // else{
        //     alert("Please fill all the fields");
        // }
       

        
           return false;
    }

    const handletoggle =()=> {
        if(paroltype==='password'){
            setParolicon(faEyeSlash);
            setParoltype('text');
        }
        else{
            setParolicon(faEye);
            setParoltype('password');
        }
    }
    return (
        <>

            <div className={signinstyle.bgimage}>
                <div className={signinstyle.signin}>
                    <h1>Sign in to Moviebox.</h1>
                    <p>Enter your detail below</p>

                    <form onSubmit={signinSystem}>
                        <input value={useremail} onChange={(e) => setUseremail(e.target.value)} required type={'email'} placeholder='Email' />

                        <div className={signinstyle.parolicon}>
                            <input value={userparol} onChange={(e) => setUserparol(e.target.value)} minLength={8} required type={paroltype} placeholder='Password' /> 
                            <FontAwesomeIcon onClick={handletoggle} icon={parolicon} />
                        </div>

                        <div className={signinstyle.signin_forget}><button type="button"><NavLink to="/"> Forget password? </NavLink></button></div> 
                        <div className={signinstyle.signin_btns}>
                            <button type="submit">Sign In </button>
                            <button type="button"><NavLink to="/signUp"> SignUp </NavLink></button>
                        </div>
                    </form>
                </div>
                
            </div>

                    {/* <form style={{display:"flex", marginTop:'150px'}}>
                        <input onChange={(e) => setInputValue(e.target.value)} style={{border: '1px solid green', marginRight:'20px'}} type={'text'}  placeholder='First Name'/>
                        <button type='button' onClick={() => {
                            dispatch(loginfunk(inputValue))
                            navigate('/')                        
                        }}>Login</button>
                    </form> */}

               
        </>
    )
}


const mapStateToProps = (state: any) => {
    return {
        translate:  [],
    }
}

export default connect(mapStateToProps, {})(SignInPage)
