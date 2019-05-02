import React, { Component } from "react"
import Slider from "react-slick"

export default class SlickCarouselAccessToManyPages extends Component {

  render() {

    var settings = {
      infinite: true,
      speed: 1000,
      autoplaySpeed:7000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots:true,
      autoplay: true,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            dots: true
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