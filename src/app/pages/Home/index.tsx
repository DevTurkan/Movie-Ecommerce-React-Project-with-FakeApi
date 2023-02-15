import React, {useState, useEffect, useLayoutEffect, } from 'react';
// import Aos from 'aos'
import { Card, Carousel, Col, Row } from 'antd';
const { Meta } = Card;
import InfiniteScroll from "react-infinite-scroll-component";
import backimg from "../../../assets/images/Back.png";
import homestyle from "./home.module.scss";
import {Link, useLocation, NavLink} from "react-router-dom";
// import tvimg from "../../../assets/images/tv.png";
// import compimg from "../../../assets/images/devicecomp.png";

// import worldimg from "../../../assets/images/world.png";
// import titleimg from "../../../assets/images/titles.png";
// import devicesimg from "../../../assets/images/devicess.png";


import devicetv from "../../../assets/images/device-tv.png";
import devicephone from "../../../assets/images/device-tablet-phone.png";
import devicelaptop from "../../../assets/images/device-laptop.png";

import kidsimg from "../../../assets/images/kidssphoto.png";

// import videobg from "../../../assets/images/vidd.mp4";
/*new*/
import {connect} from "react-redux";

import {useActions} from "hooks/useActions";
import {useHistory} from "react-router";
import { ProductData } from '../../services/Product';
import deviceData from './HomeData/carousellphoto';
import './homestil.scss';
// import twosection from './HomeData/twosect';
import nsectiioon from './HomeData/newse';
import Carouselslick from './HomeData/carousellphoto';
import partnerslogo from './HomeData/partners';
import { UserData } from '../../services/UserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { favoritecountFunction, totalitemFunction, watchcountFunction } from '../../features/CardSlice';

const HomePage:React.FC<any> = ({translate}) => {
    const dispatch = useDispatch()
    const contnt = useSelector(state => state.language.content)
// const [activclass, setActivclass] = useState('first');
const [activclass, setActivclass] = useState({deviceA: 'first activv', deviceB: 'first', deviceC: 'first'});
const [classs, setClasss]  = useState('firstinfo')
// const[clicks, setClicks] = useState(false);

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

    useLayoutEffect(() => {
    }, [])

    useEffect(() => {
        // Aos.init({duration: 1000, delay: 200 })

    }, [translate])

    useEffect(() => {
        dispatch(totalitemFunction(totalitem));
    }, [totalitem])


    const acttA = () => {
        setActivclass({deviceA: 'first activv', deviceB: 'first', deviceC: 'first'});
        setClasss('firstinfo');

        // activclass === {deviceA: 'first activv', deviceB: 'first', deviceC: 'first'} ? 
    }
    const acttB = () => {
        setActivclass({deviceA: 'first', deviceB: 'first activv', deviceC: 'first'});
        setClasss('secondinfo');

    }
    const acttC = () => {
        setActivclass({deviceA: 'first', deviceB: 'first', deviceC: 'first activv'});
        setClasss('thirdinfo');
    }
 

   

    return (
        <>
            <div className={homestyle.sectionone}>
                <img src={backimg} width='100'/>
                <div className={homestyle.backtitle}>
                    <div className={homestyle.titletext}>
                        <h1>{contnt.homeh11}</h1>
                        <h5>{contnt.homeh51}</h5>
                        <p>{contnt.homep1}</p>
                        <NavLink to={!localStorage.getItem('loggedUser') ? '/signUp' : '/mediacenter'}><button><span>{contnt.getstartbtn}</span></button></NavLink>
                    </div>
                </div>
            </div>
            <div className={homestyle.line}></div>
           
            <div className={homestyle.sectiontwo}>
                <div className={homestyle.container}>
                    <ul>
                        {
                            nsectiioon?.map(item => {
                                return(
                                    <li>
                                        <img src={require(`../../../assets/images/${item.image}`)} />
                                        <h2>{item.title}</h2>
                                        <p>{item.info}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>
                {/* <div className={homestyle.linetwo}></div> */}
            </div>

            

            <div className={homestyle.sectionthree}>
                <div className={homestyle.container3}>
                    <h1 className={homestyle.conthead}>{contnt.homeh12}</h1>
                    
                    <div className={homestyle.devicesandname}>

                        <div className={homestyle.devicesname}>
                            <ul>
                                <li onClick={acttA} className={activclass.deviceA}>
                                    <img src='https://www.kanopy.com/kui-assets/img/devices-tab-tv-icon.08f27e8.svg' />
                                    <h5>TV</h5>
                                </li>
                                <li onClick={acttB} className={activclass.deviceB}>
                                    <img src='https://www.kanopy.com/kui-assets/img/devices-tab-mobile-icon.0362df9.svg' />
                                    <h5>Phone, Tablet & Mobile</h5>
                                </li>                
                                <li onClick={acttC} className={activclass.deviceC}>
                                    <img src='https://www.kanopy.com/kui-assets/img/devices-tab-laptop-icon.73c4847.svg' />
                                    <h5>Desktop & Laptop</h5>
                                </li>
                            </ul>
                            
                        </div>

                        <div className={homestyle.devices}>
                            {
                            classs == 'firstinfo' ? 
                            <> 
                            <h1>{contnt.homeh13}</h1> 
                            <img src={devicetv}/>
                            </>

                            :

                            classs == 'secondinfo' ? 
                            <> 
                            <h1>{contnt.homeh14}</h1> 
                            <img src={devicephone} />
                            </>
                            
                            :
                            <> 
                            <h1>{contnt.homeh15}</h1>
                            <img src={devicelaptop} />
                            </>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className={homestyle.sectiontfour}>
                <div className={homestyle.container4}>
                            <img src={kidsimg} />
                            <div className={homestyle.kidstext}>
                                <h1>{contnt.homeh16}</h1>
                                <p>{contnt.homep2}</p>
                            </div>
                </div>
            </div>

            <div className={homestyle.sectiontfive}>
                <div className={homestyle.container5}>
                <h1>{contnt.homeh17}</h1>
                 <Carouselslick/>
                </div>
            </div>

            <div className={homestyle.sectionsix}>
                <div className={homestyle.container6}>
                    
                    <h1>{contnt.homeh18}</h1>
                    <ul>
                        {
                            partnerslogo?.map(items => {
                                return(
                                    <li>
                                        <img src={require(`../../../assets/images/${items.image}`)} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state: any) => {
    return {
        translate:  []
    }
}

export default connect(mapStateToProps, {})(HomePage)
