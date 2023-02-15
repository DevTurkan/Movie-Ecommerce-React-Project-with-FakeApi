import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";

import accountstyle from "./myaccount.module.scss";
import { ContactData } from "../../services/Contactmessages";
// import ButtonComponentone from "../../ComponentsTwo/buttonn/button";
import { useNavigate } from 'react-router-dom';
import { getAllUsers, UserData, postAllllUsers, putAllUsers, putFormdataAllUsers } from "../../services/UserInfo";

// import userimage from "../../../assets/images/mcsectoneimg1.jpg";

import { useDispatch, useSelector } from 'react-redux';
import { favoritecountFunction, totalitemFunction, watchcountFunction } from "../../features/CardSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faBasketShopping, faHeart, faBookmark, faCamera } from '@fortawesome/free-solid-svg-icons'
import {openimgfunk, closeimgfunk} from '../../features/OpenSlice';

// import immg from "../../../assets/images/movie1.png"
const MyAccountPage:React.FC<any> = ({translate}) => {
    const opn = useSelector(state => state.openn.openimage)

    const [allusers, setAllusers] = useState<UserData[]>([])
    const [updateselectuser, setUpdateselectuser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const [presentUser, setPresentUser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    const [totalitem, setTotalitem]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.card.map(x => x.quantity) : [])
    const [favcount, setFavcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.wishlist.length : 0)
    const [watchcount, setWatchcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.watchlist.length : 0)

    const [uploadFiles, setUploadFiles] = useState([]);

    const [prfimage, setPrfimage] = useState(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storagesrcprofil')) : []);
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
        getUserListforBasket();
                // if(!localStorage.getItem('loggedUser')){
                //     navigate('/signUp')
                // }
      
    }, [translate])

    const getUserListforBasket = async () => {
        const get_basketroducts= await getAllUsers();
        setAllusers(old_data => get_basketroducts);
        
    }
  
    return (
        <>
             <div className={accountstyle.section1}>
                <div className={accountstyle.container1}>
                    <div className={accountstyle.container1_img_about}>
{/* <button type="button" onClick={klikk}>kliket</button> */}
                        {
                            allusers?.filter(userrow => userrow.id == updateselectuser.id)?.map(currentuser => {
                                return(
                                    <>
                                      <div className={accountstyle.container1_profile}>
                                        <div className={accountstyle.container1_profile_img}>
                                            <div className={accountstyle.container1_img}>
                                            {currentuser.userName.charAt(0).toUpperCase()}
                                            </div>
                                           
                                           
                                            <h2>{currentuser.userName}</h2>
                                            <NavLink to="/settings"><h3><FontAwesomeIcon icon={faPenToSquare} />Edit Profile</h3></NavLink>
                                        </div>

                                        <div className={accountstyle.container1_profile_line}></div>

                                        <div className={accountstyle.container1_profile_icons}>
                                            <div className={accountstyle.container1_profile_icon_count}>
                                                <FontAwesomeIcon icon={faHeart} />
                                                <h2>{favcount}</h2>
                                            </div>

                                            <div className={accountstyle.container1_profile_icon_count}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                                <h2>{totalitem.reduce((a, b) => a + b, 0)}</h2>
                                            </div>

                                            <div className={accountstyle.container1_profile_icon_count}>
                                                <FontAwesomeIcon icon={faBookmark} />
                                                <h2>{watchcount}</h2>
                                            </div>
                                        </div>
                                      </div>

                                    </>
                                )
                            })
                        }

                        {/* {
                            allusers?.filter(userr => userr.id == 2)?.map(cc => {
                                return(
                                    <>
                                      <img src={`${cc.userimage}`} width='200' />  
                                    </>
                                )
                            })
                        } */}
                        {/* {
                            prfimage.profilimg
                        } */}

                    </div>

                    

                </div>
            </div>
       

            {/* {
                opn && 
                <div className={accountstyle.modalback}>
                    <div className={accountstyle.modalcommon}>
                       
                        <button onClick={() => {dispatch(closeimgfunk())}} className={accountstyle.modalcommon_close} type="button">X</button>
                        
                        <form encType='multipart/form-data' onSubmit={submitForm}>
                            <input className={accountstyle.modalcommon_fileinp} type={"file"} accept='image/*' onChange={fileChange} />
                            <button className={accountstyle.modalcommon_uploadimgbtn} type='submit'>Upload</button>
                        </form>
                    </div>
                </div>
            } */}
        </>
    )
}



const mapStateToProps = (state: any) => {
    return {
        translate:  [],
    }
}

export default connect(mapStateToProps, {})(MyAccountPage)


