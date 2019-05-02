import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import SlickCarouselNotas from '../slick/SlickCarouselNotas'
import VerticalCard from '../components-groups/VerticalCard'
import * as wordpressAPI from '../../../main/wordpressAPI'
import Section from '../../generics/small-components/Section'
import Container from '../small-components/Container'
import Row from '../small-components/Row'
import Substring from '../small-components/Substring'

export default class NotesAndExpressions extends Component {
    state = {
        notas: []
    }
    componentDidMount() {
        wordpressAPI.getNotes()
            .then(res =>
                this.setState({ "notas": [...res.data] })
            )
    }
    render() {
        return (
            <Section classSection='notesAndExpressions'>
                <Container>
                    <Row classWithRow='d-flex flex-column justify-content-center align-items-ceter text-center'>
                        <h2 className='notesAndExpressions--title'>Notas e manifestos</h2>
                    </Row>
                    <SlickCarouselNotas>
                        {this.state.notas.map(nota =>
                            <Link to={`notas/${nota.slug}`} >
                                <VerticalCard
                                    classVerticalCard="verticalCard verticalCard__small text-center"
                                    image={nota._embedded && (nota._embedded['wp:featuredmedia'] ? nota._embedded['wp:featuredmedia'][0].source_url : '')}
                                    title={Substring(nota.title.rendered, 28)}
                                    cardBodyClass='verticalCard--cardBody'
                                    text={Substring(nota.excerpt.rendered, 75)}
                                />
                            </Link>

                        )}


                    </SlickCarouselNotas>
                </Container>
            </Section>
        )
    }
}

