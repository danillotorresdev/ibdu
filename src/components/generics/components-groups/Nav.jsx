import React, { Component } from 'react'
import Logo from '../small-components/Logo'
import logoColorida from '../../../assets/images/Logo-Header.jpg'
import Container from '../small-components/Container'
import MenuItems from '../small-components/MenuItems'
import MenuToggle from '../small-components/MenuToggle';
import SocialNetworkings from '../small-components/SocialNetworkings'
import classnames from 'classnames'
import ModalSchedule from '../components-groups/ModalSchedule'



export default class Nav extends Component {
    constructor(props) {
        super(props)

        this.handlePosition = this.handlePosition.bind(this)
        this.componentDidMount =  this.componentDidMount.bind(this)
    }
    state= {        
        headerPosition: ''
    }

    handlePosition() {
        if (document.documentElement.scrollTop >= 101) {
            this.setState({
                headerPosition: 'fixed'
            })
        }else{
            this.setState({
                headerPosition: ''
            })
        }
    }
    componentDidMount() {
        window.addEventListener('scroll',
            this.handlePosition
        )
    }

    isHeader(condition) {
        if (condition) {
            return (
                <React.Fragment>
                    <Logo srcImg={logoColorida} />
                    <button type="button" className="menu--btn-agenda menu--btn-agenda__mobile float-xl-none float-lg-right mr-4 border-0" data-toggle="modal" data-target="#exampleModal" alt='teste'>
                        Agenda
                    </button>
                    <MenuToggle>
                        <MenuItems>
                            {this.props.children}
                        </MenuItems>
                        <SocialNetworkings
                        classSocialNetWorkings='socialNetworkings--mobile justify-content-center  mt-3 mb-3'
                        instagramIcon='socialNetworkings--icon socialNetworkings--icon__insta'
                        youtubeIcon='socialNetworkings--icon socialNetworkings--icon__yt'
                        facebookIcon='socialNetworkings--icon socialNetworkings--icon__fb'
                    />
                    </MenuToggle>

                    <button type="button" className="menu--btn-agenda menu--btn-agenda__desktop float-xl-none float-lg-right mr-4 border-0" data-toggle="modal" data-target="#exampleModal" alt='teste'>
                        Agenda
                    </button>


                    <ModalSchedule modalClass='modal modal--mobile' />

                    <SocialNetworkings
                        classSocialNetWorkings='socialNetworkings--desktop align-items-center'
                        instagramIcon='socialNetworkings--icon socialNetworkings--icon__insta'
                        youtubeIcon='socialNetworkings--icon socialNetworkings--icon__yt'
                        facebookIcon='socialNetworkings--icon socialNetworkings--icon__fb'
                    />
                </React.Fragment>
            )
        }
        else {
            return (
                <MenuItems>
                    {this.props.children}
                </MenuItems>
            )
        }
    }

    render() {
        return (
            <nav className={classnames(this.props.menu, `menu navbar navbar-expand-lg ${this.props.isHeader ? this.state.headerPosition: ''}`)} >
                <Container classWithContainer={`${this.props.alignItems} ${this.props.isHeader ? 'indexContent' : ''}`}>

                    {this.isHeader(this.props.isHeader)}

                </Container>
            </nav>
        )
    }
}