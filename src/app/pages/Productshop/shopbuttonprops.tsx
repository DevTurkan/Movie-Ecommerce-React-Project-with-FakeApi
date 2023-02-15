import React from 'react';
// import mediapropstyle from "./mediaprops.module.scss";
import { Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;

import './shop.scss';


const ShopbuttonProp: React.FC<any> = (props) => {
    const {buttonclick, buttonclass, buttonicon, buttontext} = props;

    return (
        <>

            <button onClick={buttonclick} className={buttonclass}>
                <span className={"container1_buttonspan"}>
                    {buttonicon}
                    <span>{buttontext}</span>
                </span>  
            </button>

                
        </>
    )
}

export default ShopbuttonProp;