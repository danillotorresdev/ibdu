import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <li className='itemList d-flex align-items-center'>
        <Link to={props.path} className='itemList--linkList'>
            {props.textItemList}
        </Link>
    </li>