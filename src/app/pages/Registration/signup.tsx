import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";
// import contactstyle from "../Contact/contact.module.scss";
import signupstyle from "./signup.module.scss";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginfunk} from '../../features/LoginSlice';
import {getuserfunk, selecteduserfunk} from '../../features/UserSlice';

// import immg from '../../../assets/images/signinup.png'
// import contactstyle from "./contact.module.scss";
import { getAllUsers, postAllUsers, UserData } from "../../services/UserInfo";
// import ButtonComponentone from "../../ComponentsTwo/buttonn/button";

import swal from 'sweetalert';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUpPage:React.FC<any> = ({translate}) => {
    const [paroltype, setParoltype] = useState('password');
    const [parolicon, setParolicon] = useState(faEye);

    const [username, setUsername] = useState<String>("");
    const [useremail, setUseremail] = useState<String>("");
    const [userparol, setUserparol] = useState<String>("");

    // const log = useSelector(state => state.loginn.inpval);
    const userslist = useSelector(state => state.userr.alluserslist);
    const selectuser = useSelector(state => state.userr.selecteduser);

// const userlist = [];
    const dispatch = useDispatch()
    const [inputValue, setInputValue]=useState('');
    const navigate = useNavigate();

    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {
        getUsersList();
        // console.log("userrrrr:", userslist);

        if(localStorage.getItem('loggedUser')){
            navigate('/')
        }      
    }, [translate])
    
    const getUsersList = async () => {
        const get_users= await getAllUsers();
        dispatch(getuserfunk(get_users))    
      
    }
    // const klik = () => {
    //     console.log(userslist);
    // }
    const signupSystem = async(e) => {
        e.preventDefault(); 

        if(username && useremail && userparol){

            const user = userslist.find((finduser) => finduser.email == useremail && finduser.password == userparol)

            if(!user){
                let dataa = {
                    userName: username,
                    email: useremail,
                    password: userparol,
                    watchlist:[],
                    card:[],
                    wishlist:[]
                }
    
                postAllUsers(dataa).then(res => {
                    console.log(res)
                })
    
               
                navigate('/signIn')
            }
            else{
                Swal.fire({
                    title: 'This user already exists',
                    confirmButtonColor: '#01b9da',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
                // alert("This user already exists");
            }
            
        }

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

            <div className={signupstyle.bgimage}>
                <div className={signupstyle.signup}>
                    <h1>I'm New Here</h1>
                    <p>Enter your detail below</p>

                    <form onSubmit={signupSystem}>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} required type={'text'} placeholder='User Name' />
                        <input value={useremail} onChange={(e) => setUseremail(e.target.value)} required type={'email'} placeholder='Email' />
                        
                        <div className={signupstyle.parolicon}>
                            <input value={userparol} onChange={(e) => setUserparol(e.target.value)} minLength={8} required type={paroltype} placeholder='Password' />
                            <FontAwesomeIcon onClick={handletoggle} icon={parolicon} />
                        </div>

                        <div className={signupstyle.signup_btns}>
                            <button type="submit">Create Account</button>
                            <button type="button"><NavLink to="/signIn"> SignIn </NavLink></button>
                            {/* <button onClick={klik} type="button">kliket</button> */}
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

export default connect(mapStateToProps, {})(SignUpPage)
