import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <Link to="/" className="navbar-brand m-0 p-0">
        <img src={props.srcImg} alt="Logo" />
    </Link>
