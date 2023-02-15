import React from 'react';
import favpropstyle from "./favprop.module.scss";
import { Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart as fully } from '@fortawesome/free-solid-svg-icons';

const Favoriteprop: React.FC<any> = (props) => {
    const {addRemoveCard, image, name, deleteWish} = props;

    return (
        <>

        <div className={favpropstyle.container1_watchlist_all}>
            <div className={favpropstyle.container1_all_img}>
                <img src={image} />
                <NavLink to={`/mediacenter/movieabout?moviename=${name}`}></NavLink>

                <div className={favpropstyle.container1_icons}>
                    <div onClick={deleteWish} className={favpropstyle.container1_icons_mark}><FontAwesomeIcon icon={fully} /></div>
                    <div onClick={addRemoveCard} className={favpropstyle.container1_icons_basket}><FontAwesomeIcon icon={faBasketShopping} /></div>
                </div>
            </div>

            <h3>{name}</h3>
        </div>

                
        </>
    )
}

export default Favoriteprop;