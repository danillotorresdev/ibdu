import React from 'react'
import classnames from 'classnames'

export default props =>
    <div className={classnames('container', props.classWithContainer)} >
        {props.children}
    </div>