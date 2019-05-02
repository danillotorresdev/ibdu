import React from 'react'
import TopBarFooter from './TopBarFooter'
import BottomBarFooter from './BottomBarFooter';
import CopyrightBar from './CopyrightBar';

const Footer = props => {
    const {showTopBar = true} = props  
    return (
        <footer id='footer'>
            {/* se showTopBar for igual a false então ele faz o componente sumir */}
            { showTopBar && (<TopBarFooter />) }
            <BottomBarFooter />
            <CopyrightBar />
        </footer>
    )
}

export default Footer