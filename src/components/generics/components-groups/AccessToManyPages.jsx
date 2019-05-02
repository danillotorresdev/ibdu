import React from 'react'
import SlickCarouselAccessToManyPages from '../slick/SlickCarouselAccessToManyPages'
import Section from '../small-components/Section'


export default props =>
<Section classSection='accessToManyPages'>
    <SlickCarouselAccessToManyPages>            
        {props.children}
    </SlickCarouselAccessToManyPages>
</Section>