import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";
import movieshopbgimg from '../../../assets/images/shopheaderbg.png'
import shopstyle from "./productshop.module.scss";
import './shop.scss';

import { ContactData } from "../../services/Contactmessages";
// import ButtonComponentone from "../../ComponentsTwo/buttonn/button";
import { useNavigate } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faGlasses, faMartiniGlassCitrus, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHeart as empty } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fully } from '@fortawesome/free-solid-svg-icons';

import ShopbuttonProp from "./shopbuttonprops";
import { ShopProductData, getShopProducts } from "../../services/Product";
import Shopprop from "./shopprops";

import { useDispatch, useSelector } from 'react-redux';
import { UserData, getAllUsers, putAllUsers } from "../../services/UserInfo";
import { selecteduserProductBasket, selecteduserBasketDelete, selecteduserWishlist, totalitemFunction, favoritecountFunction, watchcountFunction } from "../../features/CardSlice";

const ProductshopPage:React.FC<any> = ({translate}) => {
    const contnt = useSelector(state => state.language.content)

    const [shopproducts, setShopproducts] = useState<ShopProductData[]>([])
    const [allusers, setAllusers] = useState<UserData[]>([])

    const [activBTNclass, setActivBTNclass] = useState({btnA: 'mcenter_button activ_button', btnB: 'mcenter_button', btnC: 'mcenter_button'});
    const [showmovie, setShowmovie]  = useState('firstinfo')

    const actvbtnA = () => {
        setActivBTNclass({btnA: 'mcenter_button activ_button', btnB: 'mcenter_button', btnC: 'mcenter_button'});
        setShowmovie('firstinfo');
    }
    const actvbtnB = () => {
        setActivBTNclass({btnA: 'mcenter_button', btnB: 'mcenter_button activ_button', btnC: 'mcenter_button'});
        setShowmovie('secondinfo');
    }
    const actvbtnC = () => {
        setActivBTNclass({btnA: 'mcenter_button', btnB: 'mcenter_button', btnC: 'mcenter_button activ_button'});
        setShowmovie('thirdinfo');
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {
        getShopProductList();
        getUserList();
    }, [translate])

    const getShopProductList = async () => {
        const get_shopproducts= await getShopProducts();
        setShopproducts(old_data => get_shopproducts);
    }

    const getUserList = async () => {
        const get_alluser= await getAllUsers();
        setAllusers(old_data => get_alluser);
      
    }

    const downscroll = () => {
        window.scrollTo(0, 460)
    }

    const [presentUser, setPresentUser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    const [totalitem, setTotalitem]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.card.map(x => x.quantity) : [])
    const [favcount, setFavcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.wishlist.length : 0)
    const [watchcount, setWatchcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.watchlist.length : 0)

    useEffect(() => {
        dispatch(watchcountFunction(watchcount));
    }, [watchcount])

    useEffect(() => {
        dispatch(totalitemFunction(totalitem));
    }, [totalitem])

    useEffect(() => {
        dispatch(favoritecountFunction(favcount));
    }, [favcount])

    const addOrRemoveWish = (prdId:number) => {
        setPresentUser(old_fav => localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : [])
        const filterprd = shopproducts.find(row => row.id == prdId)

        if(!localStorage.getItem('loggedUser')){
            navigate('/signIn')
        }
        else{
            dispatch(selecteduserWishlist([presentUser, prdId, filterprd]))
            localStorage.setItem('storageselectusermovie', JSON.stringify(presentUser));
            setFavcount(presentUser.wishlist.length);
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

    const addOrRemoveCard = (prdId:number, prdCat:string) => {
        setPresentUser(old_fav => localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : [])
        const filterprd = shopproducts.find(row => row.id == prdId)

        if(!localStorage.getItem('loggedUser')){
            navigate('/signIn')
        }
        else{
        dispatch(selecteduserProductBasket([presentUser, prdId, filterprd, prdCat]))
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
    return (
        <>
        <div className={shopstyle.section1}>
            <div className={shopstyle.section1_header}>
                <div className={shopstyle.section1_headerimg}>
                    <img src={movieshopbgimg} />
                </div>
                <h3>Shop online, add fun to your entertainment</h3>           
                <div onClick={downscroll} className={shopstyle.downscrl}>
                    <FontAwesomeIcon icon={faChevronDown} />
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
                <div className={'container1_buttonslist'}>
                    <div className={'container1_buttons'}>
                        <ShopbuttonProp buttonclick={actvbtnA} buttonclass={activBTNclass.btnA} buttonicon={<FontAwesomeIcon icon={faGlasses}/>} buttontext={contnt.productbtn1}  />
                        <ShopbuttonProp buttonclick={actvbtnB} buttonclass={activBTNclass.btnB} buttonicon={<FontAwesomeIcon icon={faUtensils}/>} buttontext={contnt.productbtn2}  />
                        <ShopbuttonProp buttonclick={actvbtnC} buttonclass={activBTNclass.btnC} buttonicon={<FontAwesomeIcon icon={faMartiniGlassCitrus}/>} buttontext={contnt.productbtn3}  />
                    </div>
                </div>

            <div className={shopstyle.container1}>
                <div className={shopstyle.container1_productlist}>
                    {
                        showmovie == 'firstinfo' ? 
                        shopproducts?.filter(row => row.category === 'Spectacles')?.map(row => {
                            return(
                                <>
                                    <Shopprop addRemoveWish={() => addOrRemoveWish(row.id)} 
                                    addRemoveCard={() => addOrRemoveCard(row.id, row.category)}
                                    hearticon={
                                        localStorage.getItem('loggedUser') ? (presentUser.wishlist.find(x => x.id == row.id) == undefined ? <FontAwesomeIcon icon={empty} /> : <FontAwesomeIcon icon={fully} />) : <FontAwesomeIcon icon={empty} />
                                    } 
                                    name={row.name} 
                                    image={row.image} 
                                    price={(row.price).toFixed(2)} />
                                </>
                            )
                        })

                        :

                        showmovie == 'secondinfo' ? 
                        shopproducts?.filter(row => row.category === 'Snacks')?.map(row => {
                            return(
                                <>
                                    <Shopprop addRemoveWish={() => addOrRemoveWish(row.id)} 
                                    addRemoveCard={() => addOrRemoveCard(row.id, row.category)}
                                    hearticon={
                                    localStorage.getItem('loggedUser') ? (presentUser.wishlist.find(x => x.id == row.id) == undefined ? <FontAwesomeIcon icon={empty} /> : <FontAwesomeIcon icon={fully} />) : <FontAwesomeIcon icon={empty} />
                                    } 
                                    name={row.name} image={row.image} price={(row.price).toFixed(2)} />
                                </>
                            )
                        })
                        :
                    
                        shopproducts?.filter(row => row.category === 'Beverages')?.map(row => {
                            return(
                                <>
                                    <Shopprop addRemoveWish={() => addOrRemoveWish(row.id)} 
                                    addRemoveCard={() => addOrRemoveCard(row.id, row.category)}
                                    hearticon={
                                        localStorage.getItem('loggedUser') ? (presentUser.wishlist.find(x => x.id == row.id) == undefined ? <FontAwesomeIcon icon={empty} /> : <FontAwesomeIcon icon={fully} />) : <FontAwesomeIcon icon={empty} />
                                    } 
                                    name={row.name} image={row.image} price={(row.price).toFixed(2)} />
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

export default connect(mapStateToProps, {})(ProductshopPage)
