import React from 'react'
import Buttom from '../small-components/Button'

export default props =>
    <div className="simpleHorizontalCard card">
        <div className="simpleHorizontalCard--body card-body">
            <h5 className="simpleHorizontalCard--title card-title">{props.title}</h5>
            
            <p dangerouslySetInnerHTML={{ __html: props.description}} className="simpleHorizontalCard--text card-text"></p>
            
            <Buttom classBtn='buttom--btn buttom__textOrange font-weight-bold  d-flex justify-content-end'
                path={props.link}
                txtButtom='Leia mais' />

        </div>
    </div>