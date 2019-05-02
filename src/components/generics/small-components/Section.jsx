import React from 'react'

export default props => 
    <section id={props.idSection} className={props.classSection} ref={props.ref}>
        {props.children}
    </section>