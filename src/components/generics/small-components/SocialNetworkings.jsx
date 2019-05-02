import React from 'react'
import classnames from 'classnames'

export default props =>
    <div className={classnames('socialNetworkings d-flex', props.classSocialNetWorkings)}>
        <a className='socialNetworkings__btnLink' target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/InstitutoBrasileiroDireitoUrbanistico/">
            <i className={props.facebookIcon}></i>
        </a>

        <a className='socialNetworkings__btnLink' target='_blank' rel="noopener noreferrer" href="https://www.youtube.com/channel/UCkzKRdEmmX0He4PfSPnDSew">
            <i className={props.youtubeIcon}></i>
        </a>

        <a className='socialNetworkings__btnLink' target='_blank' rel="noopener noreferrer" href="https://www.instagram.com/ibdu_oficial/">
            <i className={props.instagramIcon}></i>
        </a>
    </div>