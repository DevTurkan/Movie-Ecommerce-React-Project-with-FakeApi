import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";

import mediacstyle from "./mediac.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faChevronDown} from '@fortawesome/free-solid-svg-icons';

import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;
import { getMovieProducts, ProductData } from '../../services/Product';

import './mediacenter.scss';
import Movieprpp from "./mediaprops";
import MoviebuttonProp from "./mediabuttonprops";
import { UserData } from "../../services/UserInfo";
import { useDispatch, useSelector } from 'react-redux';
import { favoritecountFunction, totalitemFunction, watchcountFunction } from "../../features/CardSlice";


const MediaPage:React.FC<any> = ({translate}) => {
    const contnt = useSelector(state => state.language.content)
    const [movieproducts, setMovieproducts] = useState<ProductData[]>([])
    const [copymovieproducts, setCopymovieproducts] = useState<ProductData[]>([])

    const [activBTNclass, setActivBTNclass] = useState({btnA: 'mcenter_button activ_button', btnB: 'mcenter_button', btnC: 'mcenter_button', btnD: 'mcenter_button', btnE: 'mcenter_button'});
    const [showmovie, setShowmovie]  = useState('firstinfo')
    // const [filterproducts, setfilterproducts] = useState<ProductData[]>([])
    const dispatch = useDispatch()

    const [presentUser, setPresentUser] = useState<UserData>(localStorage.getItem('storageselectusermovie') ? JSON.parse(localStorage.getItem('storageselectusermovie')) : []);
    const [totalitem, setTotalitem]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.card.map(x => x.quantity) : [])
    const [favcount, setFavcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.wishlist.length : 0)
    const [watchcount, setWatchcount]=useState(localStorage.getItem('storageselectusermovie') ? presentUser.watchlist.length : 0)

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
        getProductList();
        
    }, [translate])



    const getProductList = async () => {
        const get_movieproducts= await getMovieProducts();
        setMovieproducts(old_data => get_movieproducts);
        setCopymovieproducts(old_data => get_movieproducts)      
      
    }
    
    const actvbtnA = () => {
        setActivBTNclass({btnA: 'mcenter_button activ_button', btnB: 'mcenter_button', btnC: 'mcenter_button', btnD: 'mcenter_button', btnE: 'mcenter_button'});
        setShowmovie('firstinfo');
    }
    const actvbtnB = () => {
        setActivBTNclass({btnA: 'mcenter_button', btnB: 'mcenter_button activ_button', btnC: 'mcenter_button', btnD: 'mcenter_button', btnE: 'mcenter_button'});
        setShowmovie('secondinfo');

        console.log(movieproducts)
    }
    const actvbtnC = () => {
        setActivBTNclass({btnA: 'mcenter_button', btnB: 'mcenter_button', btnC: 'mcenter_button activ_button', btnD: 'mcenter_button', btnE: 'mcenter_button'});
        setShowmovie('thirdinfo');
    }
    const actvbtnD = () => {
        setActivBTNclass({btnA: 'mcenter_button', btnB: 'mcenter_button', btnC: 'mcenter_button', btnD: 'mcenter_button activ_button', btnE: 'mcenter_button'});
        setShowmovie('fourinfo');
    }
    const actvbtnE = () => {
        setActivBTNclass({btnA: 'mcenter_button', btnB: 'mcenter_button', btnC: 'mcenter_button', btnD: 'mcenter_button', btnE: 'mcenter_button  activ_button'});
        setShowmovie('fiveinfo');
    }

    const search = (e:any) => {
        if(!e.target.value) return setMovieproducts(copymovieproducts);

        const resultArray = copymovieproducts.filter(card => card.name.includes(e.target.value));
      
        // const resultArray = products.filter(card => card.category.includes(e.target.value))
        setMovieproducts(resultArray)
    }

    
    const downscroll = () => {
        window.scrollTo(0, 4800)
    }

    return (
        <>
            <div className={mediacstyle.section1}>
                <h1>{contnt.mcenterh11}</h1>
                <div className={mediacstyle.finddiv}>
                    <button><FontAwesomeIcon icon={faSearch} /></button>
                    <input type={'text'} onChange={search} placeholder='Find Movie' />
                </div>
                <div className={mediacstyle.scrl_text}>
                    <h5>PRODUCT SHOP</h5>
                    <div onClick={downscroll} className={mediacstyle.downscrl}>
                        <FontAwesomeIcon icon={faChevronDown} />
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </div>
            </div>

            <div className={mediacstyle.section2}>
                <div className={mediacstyle.container2}>
                    <div className={'container2_buttons'}>
                        <MoviebuttonProp buttonclick = {actvbtnA} buttonclass={activBTNclass.btnA} buttonicon={<FontAwesomeIcon icon={faListAlt} />} buttontext={contnt.mcentericon1} />
                        <MoviebuttonProp buttonclick = {actvbtnB} buttonclass={activBTNclass.btnB} buttonicon={<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><circle cx="8.95" cy="9" r="2"></circle><circle cx="8.95" cy="15" r="2"></circle><circle cx="11.95" cy="12" r="1"></circle><circle cx="14.95" cy="15" r="2"></circle><circle cx="14.95" cy="9" r="2"></circle><path d="M12 2a10 10 0 00-6 18H2v2h10a10 10 0 000-20zm0 18a8 8 0 118-8 8 8 0 01-8 8z"></path></svg>} buttontext={contnt.mcentericon2} />
                        <MoviebuttonProp buttonclick = {actvbtnC} buttonclass={activBTNclass.btnC} buttonicon={<svg viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 6V4h-4V2H1v20h14v-2h4v-2h4V6zm-6 14H3V4h10zm4-2h-2V6h2zm4-2h-2V8h2z"></path><path d="M6 10v4l4-2-4-2z"></path></g></svg>} buttontext={contnt.mcentericon3} />
                        <MoviebuttonProp buttonclick = {actvbtnD} buttonclass={activBTNclass.btnD} buttonicon={<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M3 3h18v18H3V3zm16 12V9H5v6h14zm0-8V5h-2v2h2zm-6-2h2v2h-2V5zM5 5v2h2V5H5zm6 2H9V5h2v2zm8 10v2h-2v-2h2zm-4 0h-2v2h2v-2zM5 19v-2h2v2H5zm4 0h2v-2H9v2z" clip-rule="evenodd"></path></svg>} buttontext={contnt.mcentericon4} />
                        <MoviebuttonProp buttonclick = {actvbtnE} buttonclass={activBTNclass.btnE} buttonicon={<svg viewBox="0 0 24 24"><g clip-path="url(#clip0)"><path fill-rule="evenodd" d="M5.455 10.422c1.527 0 2.836-1.25 2.836-2.71S6.98 5 5.455 5C3.927 5 2.618 6.251 2.618 7.711s1.31 2.711 2.837 2.711zm0-3.754c.654 0 1.09.418 1.09 1.043 0 .626-.436 1.043-1.09 1.043-.655 0-1.091-.417-1.091-1.043 0-.625.436-1.043 1.09-1.043zM21.382 7.711c0 1.46-1.31 2.711-2.837 2.711-1.527 0-2.836-1.25-2.836-2.71S17.02 5 18.545 5c1.528 0 2.837 1.251 2.837 2.711zm-1.746 0c0-.625-.436-1.043-1.09-1.043-.655 0-1.091.418-1.091 1.043 0 .626.436 1.043 1.09 1.043.655 0 1.091-.417 1.091-1.043zM14.836 9.797c0 1.46-1.309 2.711-2.836 2.711s-2.836-1.251-2.836-2.711S10.473 7.086 12 7.086s2.836 1.25 2.836 2.71zm-1.745 0c0-.626-.436-1.043-1.091-1.043s-1.09.417-1.09 1.043c0 .625.435 1.043 1.09 1.043s1.09-.418 1.09-1.043z" clip-rule="evenodd"></path><path d="M13.964 14.28c.981-1.46 2.618-2.398 4.582-2.398 3.054 0 5.454 2.295 5.454 5.214h-2.182c0-1.772-1.418-3.128-3.273-3.128-1.2 0-2.181.626-2.727 1.46.982.938 1.636 2.294 1.636 3.754h-2.181c0-1.773-1.418-3.128-3.273-3.128-1.854 0-3.273 1.355-3.273 3.128H6.545c0-1.46.655-2.816 1.637-3.754a3.245 3.245 0 00-2.727-1.46c-1.855 0-3.273 1.356-3.273 3.128H0c0-2.92 2.4-5.214 5.455-5.214 1.963 0 3.6.939 4.581 2.399A6.435 6.435 0 0112 13.968c.655 0 1.31.104 1.964.313z"></path></g></svg>} buttontext={contnt.mcentericon5} />
                    </div>

                    <div className={mediacstyle.container2_filmlist}>

                    {
                            showmovie == 'firstinfo' ? 
                            movieproducts?.map(row => {
                                return(
                                  <>
                                        <Movieprpp key={`item_${row.id}`} id={row.id} image={row.image} name={row.name} releasedate={row.releasedate} />
                                  </>
                                )
                            })

                            :

                            showmovie == 'secondinfo' ? 
                            movieproducts?.filter(row => row.category == "Film")?.map(row => {
                                return(
                                    <>
                                        <Movieprpp id={row.id} image={row.image} name={row.name} releasedate={row.releasedate} />
                                    </>
                                )
                            })
                        
                            :

                            showmovie == 'thirdinfo' ? 
                            movieproducts?.filter(row => row.category == "Series")?.map(row => {
                                return(
                                    <>
                                        <Movieprpp id={row.id} image={row.image} name={row.name} releasedate={row.releasedate} />
                                    </>
                                )
                            })

                            :

                            showmovie == 'fourinfo' ? 
                            movieproducts?.filter(row => row.category == "Documentary")?.map(row => {
                                return(
                                    <>
                                        <Movieprpp id={row.id} image={row.image} name={row.name} releasedate={row.releasedate} />
                                    </>
                                )
                            })

                            :

                            movieproducts?.filter(row => row.category == "Kids")?.map(row => {
                                return(
                                    <>
                                        <Movieprpp id={row.id} image={row.image} name={row.name} releasedate={row.releasedate} />
                                    </>
                                )
                            })
                        }

                      
                    </div>

                    <div className={mediacstyle.container2_shopbtn}>
                        <div className={mediacstyle.container2_shopline}></div>
                        <NavLink to="/productshop"><button>Product Shop</button></NavLink>
                        
                        <div className={mediacstyle.container2_shopline}></div>
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

export default connect(mapStateToProps, {})(MediaPage)
