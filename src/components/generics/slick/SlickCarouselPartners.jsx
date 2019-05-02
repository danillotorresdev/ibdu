import React, { Component } from "react"
import Slider from "react-slick"

export default class SlickCarouselPartners extends Component {
  render() {
    const settings = {
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      autoplay: true,
      className: "center",
      centerMode: true,
      infinite: true,    
      focusOnSelect: true,  
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            className: "center",
            centerMode: false,
            arrows: true,
          },
        },
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 2,            
            className: "center",
            centerMode: false,
            arrows: true,
          }
        },
      ]
    };
    return (
      <Slider {...settings}>
        {this.props.children}
      </Slider>
    );
  }
}
