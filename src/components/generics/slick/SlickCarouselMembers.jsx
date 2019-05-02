import React, { Component } from "react"
import Slider from "react-slick"

export default class SlickCarouselMembers extends Component {
  render() {
    const settings = {
      className: "center",
      infinite: true,
      slidesToShow: 1,
      speed: 500,
      autoplay: true,
      responsive: [
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 3
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