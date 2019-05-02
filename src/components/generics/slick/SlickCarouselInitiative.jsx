import React, { Component } from "react"
import Slider from "react-slick"

export default class SlickCarouselInitiative extends Component {

  render() {

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
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
          },
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