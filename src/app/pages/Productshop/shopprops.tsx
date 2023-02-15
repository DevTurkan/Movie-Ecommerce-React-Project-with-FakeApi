import React from 'react';
import shoppropstyle from "./shopprops.module.scss";
import { Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'

const Shopprop: React.FC<any> = (props) => {
    const {id, image, name, price, addRemoveCard, addRemoveWish, removeWish, hearticon} = props;

    return (
        <>

        <div className={shoppropstyle.prp_cardcom}>

            <div className={shoppropstyle.prp_card} key={id}>
               
                <div className={shoppropstyle.prp_cardimg}>
                    <img src={image}/>

                    
                </div>


                <div className={shoppropstyle.prp_cardtitle}>
                    <h4>{name}</h4>
                    <p>{price}$</p>

                    <div className={shoppropstyle.prp_cardicons}>
                        <div onClick={addRemoveWish || removeWish} className={shoppropstyle.icons_heart}>{hearticon}</div>
                        <div onClick={addRemoveCard} className={shoppropstyle.icons_basket}><FontAwesomeIcon icon={faBasketShopping} /></div>
                    </div>
                </div>

            </div>

           
        </div>

                
        </>
    )
}

export default Shopprop;