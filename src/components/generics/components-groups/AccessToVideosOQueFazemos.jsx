import React, { Component } from 'react'

import Container from '../small-components/Container'
import Section from '../small-components/Section'
import TitleTextBtn from './TitleTextBtn'
import ScrollBarWithCards from './ScrollBarWithCards'
import CardHorizontal from './CardHorizontal'
import * as wordpressAPI from '../../../main/wordpressAPI'
import Substring from '../small-components/Substring'


export default class AccessToVideosOQueFazemos extends Component {
    state = {
        "videoExplicativo": [],
        "id_do_video": '',
        'thumbVideo': '',
        'autoplay': '0',
        'showThumb': true
    }

    playVideo = () => {
        this.setState({
            'autoplay': '1',
            'showThumb': false
        })
    }
    getVideo(res) {
        wordpressAPI.getPageACF(res.data[0].id)
            .then(data => {
                this.setState({
                    "id_do_video": data.data.acf.id_do_video,
                    "loading": false
                })
            })
    }
    handleClickOnVideo(video) {
        this.setState({
            "id_do_video": video.acf.id_do_video,
            'thumbVideo': video._embedded['wp:featuredmedia'][0].source_url,
            'showThumb': true,
            'autoplay': '0'
        })
    }
    componentDidMount() {
        wordpressAPI.getPosts('videos_quem_somos', 15)
            .then(res => {
                this.setState({
                    "videoExplicativo": [...res.data],
                    "loading": false,
                    'thumbVideo': res.data[0]._embedded['wp:featuredmedia'][0].source_url
                })
                this.getVideo(res)
            })

    }


    render() {
        return (
            <Section classSection='accessToExplanatoryVideos'>
                <Container>
                    <div className="row">
                        <TitleTextBtn
                            titleTextBtnClass='classTitleTextBtn col-lg-6 d-flex flex-column'
                            classTitle='classTitleTextBtn--title pb-0 classTitleTextBtn--title__section'
                            title="Vídeos"
                            classText='classTitleTextBtn--text classTitleTextBtn--text__section'
                            text='Destaques dos últimos eventos realizados pelo instituto, webséries e outros conteúdos produzidos pelo IBDU.'
                            hasBtn='false'
                        />
                    </div>
                    <div className="row">
                        <div className='col-md-12 col-lg-6 mb-3 accessToExplanatoryVideos--videoRendered'>
                            <div style={{'position': 'relative','width': '100%', 'height': '100%'}}>
                                {this.state.showThumb === true && (
                                    <div className="accessToExplanatoryVideos--videoBG"
                                        onClick={this.playVideo}
                                        style={{
                                            'backgroundImage': `url(${this.state.thumbVideo})`
                                        }}>
                                        <div style={{ 'backgroundImage': 'url("http://www.ibdu.org.br/api/wp-content/uploads/2019/01/play-button-1.png")', 'height': '64px', 'width': '64px' }}></div>
                                    </div>
                                )}
                                <iframe title={this.state.id_do_video} className='shadow' width="100%" height="100%" src={`https://www.youtube.com/embed/${this.state.id_do_video}?autoplay=${this.state.autoplay}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <ScrollBarWithCards>
                                {this.state.videoExplicativo.map(videoExplicativo =>
                                    <div className="LinkVideo" onClick={() => this.handleClickOnVideo(videoExplicativo)}>
                                        <CardHorizontal
                                            cardClass='cardHorizontal cardHorizontal__border d-flex flex-column flex-lg-row mb-3'
                                            dadOfImg='cardHorizontal--cardImg cardHorizontal--cardImg__small'
                                            imgClass='cardHorizontal--imgClass cardHorizontal--imgClass__height cardHorizontal--imgClass__width'
                                            image={videoExplicativo._embedded ? videoExplicativo._embedded['wp:featuredmedia'][0].source_url : ''}
                                            cardBodyClass='cardHorizontal--cardBody cardHorizontal--cardBody__small'
                                            titleTextBtnClass='classTitleTextBtn'
                                            classTitle='classTitleTextBtn--title classTitleTextBtn--title__orange classTitleTextBtn--title__smallFont mb-2'
                                            title={Substring(videoExplicativo.title.rendered, 20)}
                                            classText='classTitleTextBtn--text mb-2'
                                            text={Substring(videoExplicativo.excerpt.rendered, 90)}
                                            hasBtn='false'
                                            isUnclickable={true}
                                        />
                                    </div>

                                )}


                            </ScrollBarWithCards>
                        </div>
                    </div>
                </Container>
            </Section>
        )
    }
}
