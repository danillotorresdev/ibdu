import React from 'react'
import classnames from 'classnames'

export default props =>
    <div className={classnames("bgShadowImg", props.dadOfImg)}>
            {props.children}
    </div>

