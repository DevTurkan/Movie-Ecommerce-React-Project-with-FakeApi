import React from 'react';
import movieslickstyle from "./movieslick.module.scss";
import { NavLink } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Movieslick: React.FC<any> = (props) => {
    const {image} = props;

    const sliderSettings = {
        slidesToShow:4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,

    }
    return (
        <>
        <div className={movieslickstyle.content}>
            <Slider {...sliderSettings}>


                <div className={movieslickstyle.childd}>
                    <div className={movieslickstyle.child_text}>
                        <img width={'100%'} src={image} />
                    </div>
                </div>  
                        
                
                                            
            </Slider>

        </div>
        
                
        </>
    )
}

export default Movieslick;