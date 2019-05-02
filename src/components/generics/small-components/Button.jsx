import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
	<React.Fragment>
		{props.isLink ? 
	    <a className={props.classBtn} href={props.path} onClick={props.onClick} target={props.newTab ==='undefined' ? '' : '_blank' }>
			{props.txtButtom}
	    </a>	 
	    :
	    <Link className={props.classBtn} to={props.path} onClick={props.onClick}>
	        {props.txtButtom}
	    </Link>

		}
    </React.Fragment>
