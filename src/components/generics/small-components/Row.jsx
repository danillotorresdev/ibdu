import React from 'react'
import classnames from 'classnames'

export default props => 
    <div className={classnames("row", props.classWithRow)}>
        {props.children}
    </div>