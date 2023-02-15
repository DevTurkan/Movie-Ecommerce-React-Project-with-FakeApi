import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink, useNavigate} from "react-router-dom";
import {useActions} from "hooks/useActions";

import movieabtstyle from "./movieabt.module.scss";
import { getContact, ContactData } from "../../services/Contactmessages";
// import { URLSearchParams } from "url";
// import ButtonComponentone from "../../ComponentsTwo/buttonn/button";

import { getMovieProducts, ProductData } from '../../services/Product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as empty } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as fully } from '@fortawesome/free-solid-svg-icons';

// import Movieslick from "./moviecarousell";
// import { NavLink } from 'react-router-dom';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import {openfunk, closefunk} from '../../features/OpenSlice';
import {getuserfunk, selecteduserfunk} from '../../features/UserSlice';
import { getAllUsers, putAllUsers, putSelectedUsers, UserData } from "../../../app/services/UserInfo";
import { selecteduserMovieBasket, selecteduserBasketDelete, selecteduserWatchlist, selecteduserWatchlistDelete, watchcountFunction, totalitemFunction, favoritecountFunction } from "../../features/CardSlice";

const MovieAboutPage:React.FC<any> = ({translate}) => {
    // const userslist = useSelector(state => state.userr.alluserslist);

    // const selectuser = useSelector(state => state.userr.selecteduser);
    const opn = useSelector(state => state.openn.openact)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [open, setOpen] = useState(false);

    // const openModal = () => {
    //     setOpen(!open)
    // }

    const [movieproducts, setMovieproducts] = useState<ProductData[]>([])
    const [allusers, setAllusers] = useState<UserData[]>([])

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    
    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {
        // console.log()
        getProductList();
        getUserList();
    }, [translate])

    useEffect(() => {
        if (opn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
       
     }, [opn]);


    const getProductList = async () => {
        const get_movieproducts= await getMovieProducts();
        setMovieproducts(old_data => get_movieproducts)      
    }
    const getUserList = async () => {
        const get_basketroducts= await getAllUsers();
        setAllusers(old_data => get_basketroducts);
      
    }
    const [presentUser, setPresentUser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    const [totalitem, setTotalitem]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.card.map(x => x.quantity) : [])
    const [favcount, setFavcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.wishlist.length : 0)
    useEffect(() => {
        dispatch(favoritecountFunction(favcount));
    }, [favcount])
    const [watchcount, setWatchcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.watchlist.length : 0)

    useEffect(() => {
        dispatch(watchcountFunction(watchcount));
    }, [watchcount])

    useEffect(() => {
        dispatch(totalitemFunction(totalitem));
    }, [totalitem])

    const addOrRemoveCard = (prdId:number, prdCat:string) => {
        setPresentUser(old_fav => localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : [])
        const filterprd = movieproducts.find(row => row.id == prdId)

        if(!localStorage.getItem('loggedUser')){
            navigate('/signIn')
        }
        else{
        dispatch(selecteduserMovieBasket([presentUser, prdId, filterprd, prdCat]))
        localStorage.setItem('storageselectusermovie', JSON.stringify(presentUser));
        setTotalitem(presentUser.card.map(x => x.quantity))
        const finduserinfo = allusers.find(row => row.id == presentUser.id)

        let dataa = {
            userName: finduserinfo?.userName,
            email: finduserinfo?.email,
            password: finduserinfo?.password,
            watchlist:presentUser.watchlist,
            card:presentUser.card,
            wishlist: presentUser.wishlist
        }

        putAllUsers(dataa, `${presentUser.id}`).then(res => {
            console.log(res)
        })
        
        }
       
    }

    const addOrRemoveWatch = (prdId:number) => {
        setPresentUser(old_fav => localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : [])
        const filterprd = movieproducts.find(row => row.id == prdId)

        if(!localStorage.getItem('loggedUser')){
            navigate('/signIn')
        }
        else{
        dispatch(selecteduserWatchlist([presentUser, prdId, filterprd]))
        localStorage.setItem('storageselectusermovie', JSON.stringify(presentUser));
        setWatchcount(presentUser.watchlist.length);

        const finduserinfo = allusers.find(row => row.id == presentUser.id)

        let dataa = {
            userName: finduserinfo?.userName,
            email: finduserinfo?.email,
            password: finduserinfo?.password,
            watchlist:presentUser.watchlist,
            card:presentUser.card,
            wishlist: presentUser.wishlist
        }

        putAllUsers(dataa, `${presentUser.id}`).then(res => {
            console.log(res)
        })
        
        }
       
    }
    return (
        <>
            <div className={movieabtstyle.section1}>
                <div className={movieabtstyle.container1}>
                {
                    movieproducts?.filter(row => row.name==`${query.get('moviename')}`)?.map(row => {
                        return(
                            <>
                                <div className={movieabtstyle.container1_info_img}>
                                <div className={movieabtstyle.container1_movieprice}>{(row.price).toFixed(2)}$</div>
                                    <div className={movieabtstyle.container1_img}>
                                        <img src={row.image} />
                                        <div className={movieabtstyle.container1_img_hover}>
                                            <ul>
                                                <li onClick={() => addOrRemoveWatch(row.id)}>
                                                {
                                                    localStorage.getItem('loggedUser') ? (presentUser.watchlist.find(x => x.id == row.id) == undefined ? <FontAwesomeIcon icon={empty} /> : <FontAwesomeIcon icon={fully} />) : <FontAwesomeIcon icon={empty} />
                                                }
                                                    
                                                </li>
                                                <li onClick={() => addOrRemoveCard(row.id, row.category)}>Add to cart</li>
                                                <li 
                                                    onClick={() => {
                                                        dispatch(openfunk(false))                       
                                                    }}
                                                ><svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><circle cx="8.95" cy="9" r="2"></circle><circle cx="8.95" cy="15" r="2"></circle><circle cx="11.95" cy="12" r="1"></circle><circle cx="14.95" cy="15" r="2"></circle><circle cx="14.95" cy="9" r="2"></circle><path d="M12 2a10 10 0 00-6 18H2v2h10a10 10 0 000-20zm0 18a8 8 0 118-8 8 8 0 01-8 8z"></path></svg></li>
                                            </ul>
                                           
                                        </div>
                                            
                                    </div>

                                    <div className={movieabtstyle.container1_info}>
                                        <h1>{row.name}</h1>
                                        <div className={movieabtstyle.container1_info_dateepsode}>
                                            {/* <button style={{position:'relative', width:'100px', height:'40px'}} type="button" onClick={klikettt}>klikkk</button> */}
                                            <ul>
                                                <li>{row.country} | </li> 
                                                <li>{row.releasedate} | </li> 
                                                <li>{row.episodes} Episodes</li>
                                            </ul>
                                        </div>
                                        <p>{row.about}</p>
                                        
                                        <div className={movieabtstyle.container1_info_genres}>
                                            <ul>
                                                {
                                                   
                                                    row.genres?.map(genre => {
                                                        return(
                                                            <li>
                                                                <button>{genre}</button> 
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </>
                        )
                    })
                }
                </div>
            </div>
            
            <div className={movieabtstyle.section2}>
                <div className={movieabtstyle.container2}>
                    <h1>Top cast</h1>
                    <div className={movieabtstyle.container2_cast}>
                    {
                        movieproducts?.filter(row => row.name==`${query.get('moviename')}`)?.map(row => {
                            return(
                                <>

                                    {
                                        row.topcast?.length === 0 ? <h2>Topcast not found</h2> :
                                        row.topcast?.map(cast => {
                                            return(
                                               <div className={movieabtstyle.container2_cast_img}>
                                                   {/* <h4>{cast}</h4> */}
                                                   <img src={cast}/>
                                               </div>
                                            )
                                        })
                                    }
                                </>
                            )
                        })
                    }
                    </div>
                </div>
            </div>

            <div className={movieabtstyle.section3}>
                <div className={movieabtstyle.container3}>
                    <h1>More like this</h1>

                    <div className={movieabtstyle.container3_img}>
                        {
                            movieproducts?.filter(row => row.name==`${query.get('moviename')}`)?.map(row => {
                                return(
                                    <>
                                        {
                                            movieproducts?.filter(rows => rows.category == row.category && rows.name != row.name )?.map(categry => {
                                                return(
                                                    <>
                                                   <div key={categry.id} className={movieabtstyle.container3_img_llink}>
                                                   <img src={categry.image} />
                                                   <NavLink to={`/mediacenter/movieabout?moviename=${categry.name}`}></NavLink>
                                                   </div>
                                                        {/* <Movieslick image={categry.image} /> */}
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                   

                </div>
            </div>

       
            {
                opn && 
                <div className={movieabtstyle.modalback}>
                    <div className={movieabtstyle.modalcommon}>
                        
                        
                        {
                            movieproducts?.filter(row => row.name==`${query.get('moviename')}`)?.map(row => {
                                return(
                                    <>
                                    <div className={movieabtstyle.modalheader}>
                                        <h2>{row.name}</h2>
                                        <button 
                                             onClick={() => {
                                                dispatch(closefunk())                       
                                            }}
                                        >X</button>
                                    </div>
                                        <div className={movieabtstyle.modalvideo}>
                                            <video controls autoPlay disableRemotePlayback playsInline src={row.trailer} />
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            }


            

        </>
    )
}


const mapStateToProps = (state: any) => {
    return {
        translate:  [],
    }
}

export default connect(mapStateToProps, {})(MovieAboutPage)
