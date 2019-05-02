import React, { Component } from 'react'
import Section from '../small-components/Section'
import { LoaderCarouselManyPages } from '../small-components/Loaders'
import AccessToManyPages from '../components-groups/AccessToManyPages'
import * as wordpressAPI from '../../../main/wordpressAPI'
import Container from '../small-components/Container'
import TitleTextBtn from '../components-groups/TitleTextBtn'

export default class AccessToMAnyNotice extends Component {
    state = {
        loading: true,
        slider: []

    }
    componentWillMount() {
        wordpressAPI.getPage("slide-de-noticias")
            .then(res =>
                wordpressAPI.getPageACF(res.data[0].id)
                    .then(data => {
                        this.setState({
                            slider : [...data.data.acf.slide],
                            loading: false
                        })
                    }
                    )
            )
    }
    render() {
        return (
            <Section classSection='accessToManyPages'>
                <div style={{ height: "510px", width: "100%", overflow: "hidden" }}>
                    <LoaderCarouselManyPages
                        loading={this.state.loading}
                        loaderPrimaryColor="#14576b" //"#14576b"
                        loaderSecondaryColor="#0a2a33" //"#0a2a33"
                        contentHeight="265"
                        contentWidth="455"
                        rectWidthTitle='455'
                        rectHeightTitle='400'
                    >
                        <AccessToManyPages>

                            {this.state.slider.map((slide) =>
                                <div className="sliderPages">
                                    <div>
                                        <img className='sliderPages--bgSlider img-fluid' src={slide.imagem} alt="" />
                                    </div>
                                    <div className="sliderPages--contentSlide d-flex align-items-center">
                                        <Container>
                                            <TitleTextBtn
                                                titleTextBtnClass='classTitleTextBtn col-lg-6 p-0 d-flex flex-column ml-0'
                                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__white classTitleTextBtn--title__secondWidth'
                                                title={slide.titulo}
                                                classText='classTitleTextBtn--text classTitleTextBtn--text__white'
                                                text={slide.paragrafo}
                                                hasBtn='true'
                                                classButton='classTitleTextBtn--btn classTitleTextBtn--btn__textWhite mr-md-auto ml-0 btn'
                                                pathLink={`/noticias/${slide.link_do_botao}`}
                                                textButtom='Leia a notícia'
                                            />
                                        </Container>
                                    </div>
                                </div>
                            )
                            }

                        </AccessToManyPages>
                    </LoaderCarouselManyPages>
                </div>
            </Section>
        )
    }
}