import React from 'react'
import Row from '../generics/small-components/Row'
import Container from '../generics/small-components/Container'
import SocialNetworkings from '../generics/small-components/SocialNetworkings'
import {Link} from 'react-router-dom'

export default props =>

    <Container>
        <Row>
            <div className="copyright col-12 col-md-6 col-lg-8 d-flex align-items-center text-center text-md-left">
                <p className='copyright--text m-0'>Copyright 2018 IBDU - Instituto Brasileiro de Direito Urbanístico | Desenvolvido por <a href="https://layerup.com.br" target="_blank" rel="noreferrer noopenner">Layer Up</a> </p>
            </div>
            <div className="copyright col-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-center justify-content-md-end">
                <p className="copyright--text m-0">
                    <Link to='/contato'> Contato</Link> | <Link to='/perguntas-frequentes'> Perguntas frequentes</Link>
                </p>
                <SocialNetworkings
                    icons='d-flex align-items-center col-6'
                    instagramIcon='socialNetworkings--icon socialNetworkings--icon__insta socialNetworkings--icon__BGBlue'
                    linkInstagram='https://www.google.com.br'
                    youtubeIcon='socialNetworkings--icon socialNetworkings--icon__yt socialNetworkings--icon__BGBlue'
                    linkYotube='https://www.google.com.br'
                    facebookIcon='socialNetworkings--icon socialNetworkings--icon__fb socialNetworkings--icon__BGBlue'
                    linkFacebook='https://www.google.com.br'
                />
            </div>
        </Row>
    </Container>
