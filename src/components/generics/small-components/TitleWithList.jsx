import React from 'react'
import List from '../small-components/List'

export default props =>
    <div className='titleWithList '>
        <h5 className='titleWithList--title'>Mapa do Site</h5>

        <List classList="list pl-0">
            {props.children}
        </List>

    </div>