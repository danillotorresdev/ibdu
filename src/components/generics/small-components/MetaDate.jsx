import React from 'react'
import classnames from 'classnames'

export default props =>
        <div className={classnames("meta-date font-weight-bold", props.metadateAttr)}>
            {props.eventDate}
        </div>
