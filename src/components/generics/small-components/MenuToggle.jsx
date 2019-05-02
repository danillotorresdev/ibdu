import React, { Component } from 'react'

export default class MenuyToggle extends Component {

    state = {
        showMenu: false
    }

    handleClick = () => {
        if (this.state.showMenu === false) {
            this.setState({
                showMenu: true
            })
        } else (
            this.setState({
                showMenu: false
            })
        )
    }
    hide = (e) => {
        if (e && e.relatedTarget) {
            e.relatedTarget.click();
        }
        this.setState({
            showMenu: false
        })
    }


    render() {
        return (
            <React.Fragment>
                <button className="navbar-toggler" onClick={this.handleClick} onBlur={this.hide} type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`justify-content-end mr-md-4 w-100 ${this.state.showMenu ? 'active' : 'inactive' }`} id="navbarSupportedContent">
                    {this.props.children}
                </div>

            </React.Fragment>
        )
    }
} 
