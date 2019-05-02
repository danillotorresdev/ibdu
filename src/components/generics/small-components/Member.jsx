import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';

export default props =>
    <div className='member d-flex flex-column justify-content-center align-items-center pt-4'>
        <img className='member--img img-fluid rounded-circle shadow' src={props.imgMember} alt="" />
        <div className="member--dataMember d-flex flex-column align-items-center">
            <h5 className='member--name pt-3'>{props.title}</h5>
            <p className='member--description'>{props.description}</p>
        </div>
        {props.curriculo !== '' &&(
        <div className='member--boxCV d-none shadow'>
                    <Scrollbars
                        style={{ height: 190 }}
                        autoHide
                    >
                        {props.curriculo}
        
                    </Scrollbars>
        </div>
        )}

    </div>