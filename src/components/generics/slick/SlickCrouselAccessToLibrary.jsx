import React, {Component} from "react"
import Slider from "react-slick"

export default class Slick extends Component {

  render() {

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true
    };

    return (
      <Slider {...settings}>
            {this.props.children}
      </Slider>
    );
  }
}