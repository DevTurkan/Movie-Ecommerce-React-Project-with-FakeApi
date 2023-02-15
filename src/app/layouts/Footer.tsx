import React, {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, NavLink} from "react-router-dom";
import {useActions} from "hooks/useActions";
import footerstyle from "./footer.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'

// import hom from "../pages/Home/index"
const FooterComponent:React.FC<any> = ({translate}) => {
   

    useLayoutEffect(() => {
        
    }, [])

    useEffect(() => {

        

    }, [translate])

    

    

    return (
        <>                
        <div className={footerstyle.footer}>
            <div className={footerstyle.line}></div>
            
            <div className={footerstyle.footerinfo}>
                <div className={footerstyle.container}>
                    <div className={footerstyle.info}>
                        <div className={footerstyle.first}>
                        <NavLink to="/contact">Questions? Contact us.</NavLink>
                        </div>
                        <div className={footerstyle.second}>
                            <div className={footerstyle.onesection}>
                                <ul>
                                    <li>FAQ</li>
                                    <li>Investor Relations</li>
                                    <li>Privacy</li>
                                    <li>Speed Test</li>
                                </ul>
                            </div>
                            <div className={footerstyle.twosection}>
                                <ul>
                                    <li>Help Center</li>
                                    <li>Jobs</li>
                                    <li>Cookie Preferences</li>
                                    <li>Legal Notices</li>
                                </ul>
                            </div>
                            <div className={footerstyle.threesection}>
                                <ul>
                                    <li>Account</li>
                                    <li>Ways to Watch</li>
                                    <li>Corporate Information</li>
                                    <li>Only on Moviebox</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={footerstyle.footerend}>
                        <div className={footerstyle.copyright}>
                            <span>Copyright © 2022 MOVIEbox</span>
                        </div>
                        <div className={footerstyle.social}>
                            <ul>
                                <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                                <li><a href="#"><FontAwesomeIcon icon={faYoutube} /></a></li>
                            </ul>
                        </div>
                    </div>
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

export default connect(mapStateToProps, {})(FooterComponent)
