import React, { Component } from 'react'
import Container from '../generics/small-components/Container'
import Row from '../generics/small-components/Row'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import Section from '../generics/small-components/Section'
import Buttom from '../generics/small-components/Button'
import * as wordpressAPI from '../../main/wordpressAPI'
import { Helmet } from 'react-helmet'


export default class PerguntasFrequentes extends Component {
    state = {
        "loading": true,
        "coluna_1_titulo": '',
        "coluna_1_texto": '',
        "coluna_1_perguntas": [],
        "coluna_2_titulo": '',
        "coluna_2_imagem": '',
        "coluna_2_texto": '',
        "coluna_2_link_do_botao": '',
        "coluna_2_titulo_2": '',
        "coluna_2_texto_2": '',
        "videoExplicativo": [],
        "pageTitle": '',
        "pageMetaDescription": '',
        'pageMetaImage': ''
    }


    componentDidMount() {
        wordpressAPI.getPage("perguntas-frequentes")
            .then(res => {
                this.setState({
                    "pageTitle": res.data[0].yoast_meta.yoast_wpseo_title,
                    "pageMetaDescription": res.data[0].yoast_meta.yoast_wpseo_metadesc,
                    "pageMetaImage": res.data[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                })
                wordpressAPI.getPageACF(res.data[0].id)
                    .then(data => {
                        this.setState({
                            "coluna_1_titulo": data.data.acf.coluna_1_titulo,
                            "coluna_1_texto": data.data.acf.coluna_1_texto,
                            "coluna_1_perguntas": [...data.data.acf.coluna_1_perguntas],
                            "coluna_2_titulo": data.data.acf.coluna_2_titulo,
                            "coluna_2_imagem": data.data.acf.coluna_2_imagem,
                            "coluna_2_texto": data.data.acf.coluna_2_texto,
                            "coluna_2_link_do_botao": data.data.acf.coluna_2_link_do_botao,
                            "coluna_2_titulo_2": data.data.acf.coluna_2_titulo_2,
                            "coluna_2_texto_2": data.data.acf.coluna_2_texto_2,
                            "loading": false

                        })
                    })
            })
        wordpressAPI.getPosts('video_explicativo', 15)
            .then(res => {
                this.setState({
                    "videoExplicativo": [...res.data],
                    "loading": false
                })

            })
    }
    render() {
        return (
            <Section classSection='commonQuestions'>
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                    <meta name="description" content={this.state.pageMetaDescription}/>
                    <meta property="og:title" content={this.state.pageTitle} />
                    <meta property="og:description" content={this.state.pageMetaDescription}/>
                    <meta property="og:image" content={this.state.pageMetaImage}/>
                </Helmet>
                <Container>
                    <Row>
                        <div className="col-md-6">
                            <TitleTextBtn
                                titleTextBtnClass='classTitleTextBtn col-lg-10 d-flex pl-md-0 flex-column'
                                classTitle='classTitleTextBtn--title mb-2'
                                title={this.state.coluna_1_titulo}
                                classText='classTitleTextBtn--text col-lg-10 pl-0 mb-2'
                                text={this.state.coluna_1_texto}
                                hasBtn='false'
                            />


                            <div className="accordion" id="accordionExample">
                                {
                                    this.state.coluna_1_perguntas.map((pergunta, i) =>
                                        <div className="accordion card ">
                                            {/* falar sobre isso com o vitor sobre essa gambiarra amanha */}
                                            <div className="card--header" id={`heading${i}`}>
                                                <h5 className="mb-0 d-flex">
                                                    <button className="linkCard d-flex collapsed" type="button" data-toggle="collapse" data-target={`#collapse${i}`} aria-expanded="true" aria-controls={`collapse${i}`}>
                                                        <span className='linkCard--title'>{pergunta.pergunta}</span>
                                                        <span className='linkCard--symbol'></span>
                                                    </button>

                                                </h5>
                                            </div>

                                            <div id={`collapse${i}`} className="collapse" aria-labelledby={`heading${i}`} data-parent="#accordionExample">
                                                <div className="card--body">
                                                    {pergunta.resposta}
                                                </div>

                                            </div>
                                        </div>
                                    )
                                }


                            </div> { /* accordion */}


                        </div> {/*  col-md-6 */}


                        <div className="col-md-6">
                            <div className="accessTolib">
                                <div className="row flex-column justify-content-center justify-content-md-end align-items-md-end">
                                    <h2 className='accessTolib--title text-center mt-2 text-md-right font-weight-bold mb-md-2'>{this.state.coluna_2_titulo}</h2>
                                    <img src={this.state.coluna_2_imagem} className='accessTolib--img img-fluid' alt="" />
                                </div>

                                <div className="row justify-content-center justify-content-md-end">
                                    <p className="accessTolib--paragraph text-center text-md-right pt-2">
                                        {this.state.coluna_2_texto}
                                    </p>
                                    <Buttom
                                        path='/biblioteca'
                                        classBtn='buttom btn'
                                        txtButtom='Acessar a página' />
                                </div>
                                {/* 
                                <div className="row videoArea pt-5 justify-content-center justify-content-md-end">
                                    <h2 className='videoArea--title font-weight-bold'>{this.state.coluna_2_titulo_2}</h2>
                                    <p className='videoArea--paragraph text-center text-md-right'>{this.state.coluna_2_texto_2}</p>
                                </div> */}
                                {/* <div className="row pl-3">
                                    <ScrollBarWithCards>
                                        {this.state.videoExplicativo.map(videoExplicativo =>
                                            <CardHorizontal
                                                cardClass='cardHorizontal cardHorizontal__border d-flex flex-column flex-lg-row mb-3'
                                                dadOfImg='cardHorizontal--cardImg cardHorizontal--cardImg__small'
                                                imgClass='cardHorizontal--imgClass cardHorizontal--imgClass__height cardHorizontal--imgClass__width'
                                                image={videoExplicativo._embedded ? videoExplicativo._embedded['wp:featuredmedia'][0].source_url : ''}
                                                cardBodyClass='cardHorizontal--cardBody cardHorizontal--cardBody__small'
                                                titleTextBtnClass='classTitleTextBtn'
                                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__orange classTitleTextBtn--title__smallFont mb-2'
                                                title={Substring(videoExplicativo.title.rendered, 17)}
                                                classText='classTitleTextBtn--text mb-2'
                                                text={Substring(videoExplicativo.excerpt.rendered, 85)}
                                                hasBtn='false'
                                                pathLink={'www.google.com.br'}
                                            />

                                        )}
                                    </ScrollBarWithCards>
                                </div> */}
                            </div>
                        </div>

                    </Row>
                </Container>
            </Section>
        )
    }
}
