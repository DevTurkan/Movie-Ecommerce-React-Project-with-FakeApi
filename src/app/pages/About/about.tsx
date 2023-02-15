import React, {useEffect, useLayoutEffect, useState} from "react";
// import Aos from 'aos'
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";

import aboutstyle from "./about.module.scss";
import abtsect2photo from "../../../assets/images/abtsect2img.png"
import abtsectthree from "./AboutData/abtsect3data";
import abtsecttfourfive from "./AboutData/abtsect4data";
import { useDispatch, useSelector } from 'react-redux';
import { favoritecountFunction, totalitemFunction, watchcountFunction } from "../../features/CardSlice";
import { UserData } from "../../services/UserInfo";

const AboutPage:React.FC<any> = ({translate}) => {
    const dispatch = useDispatch()
    const contnt = useSelector(state => state.language.content)

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
        // Aos.init({duration: 1000, delay: 200 })

    }, [translate])

    

    

    return (
        <>
            <div className={aboutstyle.section1}>
                <h1>{contnt.abouth11}</h1>
            </div>

            <div className={aboutstyle.section2}>
                <div className={aboutstyle.container2}>
                    <div className={aboutstyle.container2_text}>
                        <h1>{contnt.abouth12}</h1>
                        <p>{contnt.aboutp1}</p>
                    </div>

                    <div className={aboutstyle.container2_imgtext}>
                            <ul>
                                <li>
                                    <h1>25+ million</h1>
                                    <h4>{contnt.abouth41}</h4>
                                </li>
                                <li>
                                    <h1>50k+</h1>
                                    <h4>{contnt.abouth42}</h4>
                                </li>
                                <li>
                                    <h1>250+</h1>
                                    <h4>{contnt.abouth43}</h4>
                                </li>
                            </ul>

                            <img src={abtsect2photo} />
                    </div>
                </div>
            </div>

            <div className={aboutstyle.section3}>
                <div className={aboutstyle.container3}>
                    {
                        abtsectthree?.map(item => {
                            return(
                                <div className={aboutstyle.container3_textimg}>
                                    <div className={aboutstyle.container3_text}>
                                        <h1>{item.title}</h1>
                                        <p>{item.info}</p>
                                    </div>
                                    <img src={require(`../../../assets/images/${item.image}`)} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={aboutstyle.section4}>
            <div className={aboutstyle.container4}>
                <div className={aboutstyle.container4_img1}>
                </div>
                <div className={aboutstyle.container4_text}>
                    <h1>{contnt.abouth13}</h1>
                    <p>{contnt.aboutp2}</p>
                    <a>{contnt.abouta1} 
                        <span>→</span>
                    </a>
                </div>
            </div>

            <div className={aboutstyle.container4}>
                <div className={aboutstyle.container4_img2}>
                </div>
                <div className={aboutstyle.container4_text}>
                    <h1>{contnt.abouth14}</h1>
                    <p>{contnt.aboutp3}</p>
                    <a>{contnt.abouta1}
                    <span>→</span>
                    </a>
                </div>
            </div>
                    
            </div>

            <div className={aboutstyle.section5}>
                <div className={aboutstyle.container5}>
                    {
                        abtsecttfourfive.fivesect?.map(item => {
                            return(
                                <>
                                    <div className={aboutstyle.container5_textimg}>
                                        <img src={require(`../../../assets/images/${item.image}`)} />

                                        <div className={aboutstyle.container5_text}>
                                            <h1>{item.title}</h1>
                                            <p>{item.info}</p>
                                            <a>{contnt.abouta1} 
                                                <span>→</span>
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>

            <div className={aboutstyle.section6}>
                <div className={aboutstyle.container6}>
                    <div className={aboutstyle.container6_text}>
                        <h1>{contnt.abouth15}</h1>
                        <p>{contnt.aboutp4}</p>
                    </div>
                    <div className={aboutstyle.container6_img}> </div>
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

export default connect(mapStateToProps, {})(AboutPage)
