import React, {Component} from 'react'
import { Scrollbars } from 'react-custom-scrollbars';

export default class App extends Component {
  render() {
    return (
      <Scrollbars style={{ height: 455 }} className='scrollClass'>

            {this.props.children}      

      </Scrollbars>
    );
  }
}