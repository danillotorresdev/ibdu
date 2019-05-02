import React from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'

export default props =>
    <React.Fragment>
        <li className="navMenuLine nav-item">
            <NavLink activeClassName='activeLink' to={props.ItemLink} onClick={props.onClick} className={classnames(props.classMenuItem, "navMenuLine--link nav-link")} >{props.textItem} </NavLink>
        </li>
    </React.Fragment>