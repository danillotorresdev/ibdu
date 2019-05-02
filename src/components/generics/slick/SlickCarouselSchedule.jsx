import React, { Component } from "react"
import Slider from "react-slick"

export default class SlickCarouselSchedule extends Component {

  render() {

    var settings = {
      dots: false,
      infinite: true,
      speed: 2000,      
      rows: 2,
      slidesPerRow: 3,
      arrows: true,
      autoplay: false,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            rows: 1,
            slidesPerRow: 1
          }          
        },
        {
          breakpoint: 920,
          settings: {
            slidesPerRow: 2
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
