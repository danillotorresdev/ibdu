import React, { Component } from "react"
import Slider from "react-slick"

export default class SlickCarouselNotas extends Component {

  render() {

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };

    return (
      <Slider {...settings}>
        {this.props.children}
      </Slider>
    );
  }
}