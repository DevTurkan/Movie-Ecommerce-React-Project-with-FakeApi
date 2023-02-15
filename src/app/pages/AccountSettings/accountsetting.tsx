import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";

import settingstyle from "./settings.module.scss";
import { getContact, ContactData } from "../../services/Contactmessages";
// import ButtonComponentone from "../../ComponentsTwo/buttonn/button";
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { totalitemFunction, favoritecountFunction, watchcountFunction } from "../../features/CardSlice";
import { deleteUsers, getAllUsers, putAllUsers, UserData } from "../../services/UserInfo";


import {loginfunk} from '../../features/LoginSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';

import swal from 'sweetalert';
import Swal from 'sweetalert2';

const SettingsPage:React.FC<any> = ({translate}) => {
    const contnt = useSelector(state => state.language.content)

    const [loggedUserr, setLoggedUser] = useState(false);
    
    const [allusers, setAllusers] = useState<UserData[]>([])
    // const [updateselectuser, setUpdateselectuser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    const [updateselectuser, setUpdateselectuser] = useState(localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')) : []);

    const navigate = useNavigate();
   
    const dispatch = useDispatch()
    const [presentUser, setPresentUser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    const [totalitem, setTotalitem]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.card.map(x => x.quantity) : [])
    const [favcount, setFavcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.wishlist.length : 0)
    const [watchcount, setWatchcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.watchlist.length : 0)

    const [username, setUsername] = useState<String>(updateselectuser.name);
    const [useremail, setUseremail] = useState<String>(updateselectuser.mail);

    useEffect(() => {
        dispatch(watchcountFunction(watchcount));
    }, [watchcount])

    useEffect(() => {
        dispatch(favoritecountFunction(favcount));
    }, [favcount])

    useEffect(() => {
        dispatch(totalitemFunction(totalitem));
    }, [totalitem])
    
    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {
        setLoggedUser(old_data => localStorage.getItem('loggedUser'));
        // setUpdateselectuser(JSON.parse(localStorage.getItem('loggedUser')))   

                            // if(!localStorage.getItem('loggedUser')){
                            //     navigate('/signUp')
                            // }
      getUserListforBasket();
    }, [translate])

    const getUserListforBasket = async () => {
        const get_basketroducts= await getAllUsers();
        setAllusers(old_data => get_basketroducts);
        
    }

    const logout = (e) => {
        e.preventDefault();             
        localStorage.removeItem('loggedUser');
        setLoggedUser(old_data => (false));
        navigate('/');  
        localStorage.removeItem('storageselectusermovie');
    }

    
    const deleteaccount = (e) => {
        e.preventDefault();            

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1b26c0',
            cancelButtonColor: '#d80808',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

                deleteUsers(`${presentUser.id}`);
                localStorage.removeItem('loggedUser');
                // setLoggedUser(old_data => (false));
                navigate('/');  
                localStorage.removeItem('storageselectusermovie');

              Swal.fire(
                'Deleted!',
                'Your account has been deleted.',
                'success'
              )
            }
          })
        
       
    }

    const editSystem = async(e) => {
        e.preventDefault(); 

        if(useremail && username){
           
            const finduserinfo = allusers.find(row => row.id == presentUser.id)

            let dataa = {
                userName: username,
                email: useremail,
                password: finduserinfo?.password,
                watchlist:finduserinfo?.watchlist,
                card:finduserinfo?.card,
                wishlist: finduserinfo?.wishlist
            }
    
            putAllUsers(dataa, `${finduserinfo?.id}`).then(res => {
                console.log(res)
            })
            
            dispatch(loginfunk([useremail, finduserinfo?.id, username]))
                
            navigate('/myaccount')
           
           return false;
        }
    }

 
    return (
        <>
            <div className={settingstyle.section1}>
                <div className={settingstyle.container1}>
                    {
                        allusers?.filter(userrow => userrow.id == presentUser.id)?.map(currentuser => {
                            return(
                                <>
                                    <div className={settingstyle.container1_setting}>
                                        <h1>{contnt.settingh11}</h1>
                                        <form onSubmit={editSystem}>
                                            <input type={'text'} value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <input type={"email"} value={useremail} onChange={(e) => setUseremail(e.target.value)} />
                                            <button type="submit">{contnt.settingbtn}</button>
                                        </form>

                                        <div className={settingstyle.container1_profile_line}></div>

                                        <div className={settingstyle.links}>
                                            <NavLink to="/" onClick={logout}><h3><FontAwesomeIcon icon={faRightFromBracket} />{contnt.settinglink1}</h3></NavLink>
                                            <NavLink to="/"  onClick={deleteaccount}><h3><FontAwesomeIcon icon={faTrash} />{contnt.settinglink2}</h3></NavLink>
                                        </div>
                                        
                                    </div>

                                </>
                            )
                        })
                    }
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

export default connect(mapStateToProps, {})(SettingsPage)
