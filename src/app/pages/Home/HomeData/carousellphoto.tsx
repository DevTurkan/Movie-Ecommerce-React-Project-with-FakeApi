import React from 'react'
import slickstyle from './slickslider.module.scss';


// import './slider.css'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sliderphoto from './sliderfotolist';
// import slickData from '../../Data/slickData'
function Carouselslick() {
  const sliderSettings = {
    slidesToShow:4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,


    responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            // autoplay: true,
            // autoplaySpeed: 1000,
          }
        },
        {
          breakpoint: 899,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            // autoplay: true,
            // autoplaySpeed: 1000,
          }
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // autoplay: true,
            // autoplaySpeed: 1000,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
}
  return (
    <div className={slickstyle.content}>
    <Slider {...sliderSettings}>

        {
            sliderphoto.map(item => {
                return(
                    <div className={slickstyle.childd}>
                        <div className={slickstyle.child_text}>
                            <img width={'100%'} src={require(`../../../../assets/images/${item.image}`)} />
                        </div>
                    </div>  
                )
            })
        }
        
                                       
    </Slider>

</div>

  );
}

export default Carouselslick