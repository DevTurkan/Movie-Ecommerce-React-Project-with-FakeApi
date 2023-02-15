import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";

import wishstyle from "./wishlist.module.scss";
import popcornimg from '../../../assets/images/imagewishlist2.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, UserData, putAllUsers } from "../../services/UserInfo";
import Watchprop from "../Watchlist/watchlistprops";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fully } from '@fortawesome/free-solid-svg-icons';
import Favoriteprop from "./favprops";
import Shopprop from "../Productshop/shopprops";
import { favoritecountFunction, selecteduserProductBasket, selecteduserWishlistDelete, totalitemFunction, watchcountFunction } from "../../features/CardSlice";
import { ShopProductData, getShopProducts } from "../../services/Product";


const FavoritePage:React.FC<any> = ({translate}) => {
    const contnt = useSelector(state => state.language.content)

    const [updateselectuser, setUpdateselectuser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    const [shopproducts, setShopproducts] = useState<ShopProductData[]>([])
    const [allusers, setAllusers] = useState<UserData[]>([])
    const [totalitem, setTotalitem]=useState(localStorage.getItem('storageselectusermovie') ? updateselectuser.card.map(x => x.quantity) : [])
    const [favcount, setFavcount]=useState(localStorage.getItem('storageselectusermovie') ? updateselectuser.wishlist.length : 0)
    const [watchcount, setWatchcount]=useState(localStorage.getItem('storageselectusermovie') ? updateselectuser.watchlist.length : 0)



    const navigate = useNavigate();
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {
        getUserListforBasket();

                // if(!localStorage.getItem('loggedUser')){
                //     navigate('/signUp')
                // }
      
    }, [translate])

    useEffect(() => {
        dispatch(totalitemFunction(totalitem));
    }, [totalitem])
    
    useEffect(() => {
        dispatch(favoritecountFunction(favcount));
    }, [favcount])

    useEffect(() => {
        dispatch(watchcountFunction(watchcount));
    }, [watchcount])

    useEffect(() => {
        getUserListforBasket();
        getShopProductList();
        console.log('ok')
    }, [updateselectuser])

    const getShopProductList = async () => {
        const get_shopproducts= await getShopProducts();
        setShopproducts(old_data => get_shopproducts);
    }
    
    const getUserListforBasket = async () => {
        const get_basketroducts= await getAllUsers();
        setAllusers(old_data => get_basketroducts);
        
    }

    const deletewishlist = (prdId:number) => {
        dispatch(selecteduserWishlistDelete([updateselectuser, prdId]));
        localStorage.setItem('storageselectusermovie', JSON.stringify(updateselectuser));
        // setTotalitem(updateselectuser.card.map(x => x.quantity))
        setFavcount(updateselectuser.wishlist.length);
        updateapi();
        getUserListforBasket();
    }

    const updateapi = () => {
        const userinfo = allusers.find(row => row.id == updateselectuser.id)
            let dataa = {
                userName: userinfo?.userName,
                email: userinfo?.email,
                password: userinfo?.password,
                watchlist:updateselectuser.watchlist,
                card:updateselectuser.card,
                wishlist: updateselectuser.wishlist
            }
    
            putAllUsers(dataa, `${updateselectuser.id}`).then(res => {
                console.log(res)
            })
    
            getUserListforBasket();
    }

    const addOrRemoveCard = (prdId:number, prdCat:string) => {
        setUpdateselectuser(old_fav => localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : [])
        const filterprd = shopproducts.find(row => row.id == prdId)

       
        dispatch(selecteduserProductBasket([updateselectuser, prdId, filterprd, prdCat]))
        localStorage.setItem('storageselectusermovie', JSON.stringify(updateselectuser));
        setTotalitem(updateselectuser.card.map(x => x.quantity))

        updateapi();
        getUserListforBasket();
        
    }

    return (
        <>
            <div className={wishstyle.section1}>
                <div className={wishstyle.section1_header}>
                    <h1>{contnt.wishh11}</h1>
                    <div className={wishstyle.section1_header_corn}>
                        <img src={popcornimg} />
                    </div>
                </div>

                <div className={wishstyle.container1}>
                    <div className={wishstyle.container1_products}>

                        {
                            updateselectuser.wishlist?.length === 0 ? <h1>{contnt.wishh12}</h1> :
                            updateselectuser.wishlist?.map(row => {
                                return(
                                    <>
                                    {/* <Shopprop addRemoveWish={() => deletewishlist(row.id)} 
                                    hearticon={
                                        localStorage.getItem('loggedUser') ? (presentUser.wishlist.find(x => x.id == row.id) == undefined ? <FontAwesomeIcon icon={empty} /> : <FontAwesomeIcon icon={fully} />) : <FontAwesomeIcon icon={empty} />
                                    } 
                                    name={row.name} 
                                    image={row.image} 
                                    price={row.price} /> */}
                                        <Shopprop addRemoveCard={() => addOrRemoveCard(row.id, row.category)} removeWish={() => deletewishlist(row.id)} hearticon ={<FontAwesomeIcon icon={fully} />} price={(row.price).toFixed(2)} name={row.name} image={row.image} />
                                     {/* <Watchprop markicon={<FontAwesomeIcon icon={fully} />} image={row.image} name={row.name} /> */}
                                    </>
                                )
                            })
                        }
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

export default connect(mapStateToProps, {})(FavoritePage)
