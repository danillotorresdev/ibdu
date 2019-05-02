import React, { Component } from 'react'
import Section from '../generics/small-components/Section'
import Container from '../generics/small-components/Container'
import Row from '../generics/small-components/Row'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import * as wordpressAPI from '../../main/wordpressAPI'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { LoaderTitleTextWith2Lines } from '../generics/small-components/Loaders'


export default class Contato extends Component {

    state = {
        "loading": true,
        "sessao_1_titulo": '',
        "sessao_1_texto_1": '',
        "sessao_1_email": '',
        "sessao_1_telefone": '',
        "sessao_1_texto_2": '',
        "pageTitle": '',
        "pageMetaDescription": '',
        "name": '',
        'city': '',
        'state': '',
        'country': '',
        'email': '',
        'subject': '',
        'message': '',
        'pageMetaImage': ''
    }

    componentDidMount() {
        wordpressAPI.getPage("contato")
            .then(res => {
                this.setState({
                    "pageTitle": res.data[0].yoast_meta.yoast_wpseo_title,
                    "pageMetaDescription": res.data[0].yoast_meta.yoast_wpseo_metadesc,
                    "pageMetaImage": res.data[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                })
                wordpressAPI.getPageACF(res.data[0].id)
                    .then(data => {
                        this.setState({
                            "sessao_1_titulo": data.data.acf.sessao_1_titulo,
                            "sessao_1_texto_1": data.data.acf.sessao_1_texto_1,
                            "sessao_1_email": data.data.acf.sessao_1_email,
                            "sessao_1_telefone": data.data.acf.sessao_1_telefone,
                            "sessao_1_texto_2": data.data.acf.sessao_1_texto_2,
                            "loading": false

                        })
                    })
            })
    }

    handleFormChange = (e, item) => {
        this.setState({
            [item]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let state = this.state
        axios.post('/mailer.php', {
            name: state.name,
            email: state.email,
            subject: state.subject,
            city: state.city,
            state: state.state,
            country: state.country,
            message: state.message,
            fromSite: true

        }).then(
            res => res.data === true ? NotificationManager.info('Mensagem enviada com sucesso') : NotificationManager.error('Erro ao enviar mensagem')
        )
    }

    render() {
        return (
            <Section classSection='contactBanner banner banner--contato'>
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                    <meta name="description" content={this.state.pageMetaDescription}/>
                    <meta property="og:title" content={this.state.pageTitle} />
                    <meta property="og:description" content={this.state.pageMetaDescription}/>
                    <meta property="og:image" content={this.state.pageMetaImage}/>
                </Helmet>
                <Row>
                    <Container classWithContainer='d-flex align-items-center h-100'>
                        <div className="col-12 col-md-8  d-flex flex-column justify-content-center">
                            <LoaderTitleTextWith2Lines
                                loading={this.state.loading}
                                loaderPrimaryColor="#c96200" //"#14576b"
                                loaderSecondaryColor="#a45000" //"#0a2a33"
                                contentHeight="20"
                                contentWidth="100"
                                rectWidthTitle="50"
                                rectHeightTitle="6"
                                rectWidthText="100"
                                rectHeightText="1"
                            >
                                <TitleTextBtn
                                    titleTextBtnClass='classTitleTextBtn'
                                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__white classTitleTextBtn--title__secondWidth'
                                    title={this.state.sessao_1_titulo}
                                    classText='classTitleTextBtn--text classTitleTextBtn--text__white mb-4'
                                    text={this.state.sessao_1_texto_1}
                                    hasBtn='false'
                                />

                                <p className="contactBanner--paragraph font-weight-bold m-0 text-uppercase">E-mail: <span className="font-weight-normal text-lowercase">{this.state.sessao_1_email}</span></p>
                                <p className="contactBanner--paragraph font-weight-bold m-0 text-uppercase">Telefone: <span className="font-weight-normal">{this.state.sessao_1_telefone}</span></p>
                            </LoaderTitleTextWith2Lines>

                            <p className='contactBanner--paragraph mt-4'>
                                {this.state.sessao_1_texto_2}
                            </p>
                            <form className='contactForm' onSubmit={this.handleSubmit}>
                                <div className="form-group d-flex flex-column flex-sm-row mb-2">
                                    <input required type="text" onChange={(e) => this.handleFormChange(e, 'name')} className="contactForm--input form-control mb-2 mb-sm-0 mr-sm-1" aria-describedby="Nome Completo" placeholder="Nome Completo" />
                                    <input required type="email" onChange={(e) => this.handleFormChange(e, 'email')} className="contactForm--input form-control ml-sm-1" aria-describedby="emailHelp" placeholder="E-mail" />
                                </div>
                                <div className="form-group d-flex  flex-column flex-sm-row mb-2">
                                    <div required className='d-flex cidadeField mr-sm-1 mb-2 mb-sm-0'>
                                        <input required type="text" onChange={(e) => this.handleFormChange(e, 'city')} className="contactForm--input contactForm--cidade form-control cidade w-100" aria-describedby="cidade" placeholder="Cidade" />

                                    </div>
                                    <div className='d-flex w-sm-50 ml-sm-1 contactForm--pais'>
                                        <input required type="text" onChange={(e) => this.handleFormChange(e, 'state')} className="contactForm--input contactForm--estado form-control estado w-50 mr-1" aria-describedby="Estado" placeholder="Estado" />
                                        <input required type="text" onChange={(e) => this.handleFormChange(e, 'country')} className="contactForm--input form-control pais w-50 ml-1" aria-describedby="País" placeholder="País" />
                                    </div>
                                </div>
                                <div className="form-group d-flex flex-column flex-sm-row mb-2">
                                    <input required type="text" onChange={(e) => this.handleFormChange(e, 'subject')} className="contactForm--input form-control" aria-describedby="Assunto" placeholder="Assunto" />
                                </div>
                                <div className="form-group d-flex flex-column flex-sm-row mb-2">
                                    <textarea required type="text" onChange={(e) => this.handleFormChange(e, 'message')} className="contactForm--textArea form-control" rows='5' aria-describedby="Mensagem" placeholder="Mensagem" ></textarea>
                                </div>
                                <div class="form-group form-check d-flex align-items-center flex-column flex-sm-row justify-content-between">
                                    <div className="ckeckTerms d-flex align-items-center">
                                        <input required type="checkbox" class="form-check-input" id="issueTest" />
                                        <label for="issueTest" className='contactForm--checkTermsLabel mt-3 mt-sm-0 ml-2 mb-0'>Aceito receber novidades e informativos do IBDU</label>
                                    </div>
                                    <button type="submit" className="buttom btn mt-3 mt-sm-0">Enviar</button>
                                </div>

                            </form>

                        </div>
                        <div className="col-md-4"></div>
                    </Container>
                </Row>
                <NotificationContainer />
            </Section>

        )
    }
}
