import React from 'react';
import watchpropstyle from "./watchprops.module.scss";
import { Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as fully } from '@fortawesome/free-solid-svg-icons';

const Watchprop: React.FC<any> = (props) => {
    const {addRemoveCard, image, name, deletewatch} = props;

    return (
        <>

        <div className={watchpropstyle.container1_watchlist_all}>
            <div className={watchpropstyle.container1_all_img}>
                <img src={image} />
                <NavLink to={`/mediacenter/movieabout?moviename=${name}`}></NavLink>

                <div className={watchpropstyle.container1_icons}>
                    <div onClick={deletewatch} className={watchpropstyle.container1_icons_mark}><FontAwesomeIcon icon={fully} /></div>
                    <div onClick={addRemoveCard} className={watchpropstyle.container1_icons_basket}><FontAwesomeIcon icon={faBasketShopping} /></div>
                </div>
            </div>

            <h3>{name}</h3>
        </div>

                
        </>
    )
}

export default Watchprop;