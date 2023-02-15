import React from 'react';
import mediapropstyle from "./mediaprops.module.scss";
import { Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;


const Movieprpp: React.FC<any> = (props) => {
    const {id, image, name, releasedate} = props;

    return (
        <>

        <div className={mediapropstyle.prp_cardcom}>

            <div className={mediapropstyle.prp_card} key={id}>
                <div className={mediapropstyle.prp_cardimg_common}>
                    <div className={mediapropstyle.prp_cardimg}>
                        <img src={image}/>
                    </div>
                    <NavLink to={`/mediacenter/movieabout?moviename=${name}`}></NavLink>

                </div>
                <div className={mediapropstyle.prp_cardtitle}>
                    <h4>{name}</h4>
                    <p>{releasedate}</p>
                </div>

            </div>

           
        </div>

                
        </>
    )
}

export default Movieprpp;