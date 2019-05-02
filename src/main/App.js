import React from 'react';
import './App.scss';

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Routes from './Routes'


export default props =>
    <div>
        <Header />
        <Routes />
        {window.location.pathname === '/contato' ? <Footer showTopBar={false} /> : <Footer />}

    </div>
