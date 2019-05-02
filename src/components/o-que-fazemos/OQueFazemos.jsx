import React, { Component } from 'react'
import Container from '../generics/small-components/Container'
import Row from '../generics/small-components/Row'
import Banner from '../generics/components-groups/Banner'
import Nav from '../generics/components-groups/Nav'
import MenuItem from '../generics/small-components/MenuItem'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import Section from '../generics/small-components/Section'
import AccessToLibrary from '../generics/components-groups/AccessToLibrary'
import VerticalCard from '../generics/components-groups/VerticalCard'
import SlickCarouselInitiative from '../generics/slick/SlickCarouselInitiative'
import RowImgContent from '../generics/components-groups/RowImgContent'
import * as wordpressAPI from '../../main/wordpressAPI'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import scrollToComponent from 'react-scroll-to-component'
import Substring from '../generics/small-components/Substring'
import AccessToVideosOQueFazemos from '../generics/components-groups/AccessToVideosOQueFazemos'




export default class oQueFazemos extends Component {
    state = {
        "sessao_1_titulo": '',
        "sessao_1_texto": '',
        "sessao_2_titulo": '',
        "sessao_2_texto": '',
        "sessao_2_imagem": '',
        "sessao_3_slider": [],
        "sessao_3_titulo": '',
        "sessao_3_texto": '',
        "sessao_3_link_do_botao": '',
        "sessao_4_titulo": '',
        "sessao_4_texto": '',
        "sessao_4_iniciativas": [],
        "sessao_5_imagem": '',
        "sessao_5_titulo": '',
        "sessao_5_texto": '',
        "disseminations": [],
        "pageTitle": '',
        "pageMetaDescription": '',
        "loading": true,
        'pageMetaImage': ''
    }
    scrollTo(e) {
        if (typeof (e) !== 'undefined') {
            e.preventDefault(e)
            window.location.hash = this.current
        }
        if (window.location.hash !== '') {
            const hash = window.location.hash.replace("#", "")
            scrollToComponent(this[hash], { offset: -240, align: 'top', duration: 800, ease: 'inExpo' })
        }
    }

    componentDidMount() {
        this.scrollTo()
        wordpressAPI.getPage("o-que-fazemos")
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
                            "sessao_1_texto": data.data.acf.sessao_1_texto,
                            "sessao_2_titulo": data.data.acf.sessao_2_titulo,
                            "sessao_2_texto": data.data.acf.sessao_2_texto,
                            "sessao_2_imagem": data.data.acf.sessao_2_imagem,
                            "sessao_3_slider": [...data.data.acf.sessao_3_slider],
                            "sessao_3_titulo": data.data.acf.sessao_3_titulo,
                            "sessao_3_texto": data.data.acf.sessao_3_texto,
                            "sessao_3_link_do_botao": data.data.acf.sessao_3_link_do_botao,
                            "sessao_4_titulo": data.data.acf.sessao_4_titulo,
                            "sessao_4_texto": data.data.acf.sessao_4_texto,
                            "sessao_5_imagem": data.data.acf.sessao_5_imagem,
                            "sessao_5_titulo": data.data.acf.sessao_5_titulo,
                            "sessao_5_texto": data.data.acf.sessao_5_texto,
                            "loading": false

                        })
                    })
            })
        wordpressAPI.getDissemitations()
            .then(res => this.setState({ disseminations: [...res.data] }))
    }


    render() {
        return (

            <React.Fragment>
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                    <meta name="description" content={this.state.pageMetaDescription}/>
                    <meta property="og:title" content={this.state.pageTitle} />
                    <meta property="og:description" content={this.state.pageMetaDescription}/>
                    <meta property="og:image" content={this.state.pageMetaImage}/>
                </Helmet>
                <Banner
                    classBanner='banner banner--oQueFazemos shadow d-flex align-items-center'
                    divTextBanner='d-flex justify-content-end align-items-center'
                    titleTextBtnClass='classTitleTextBtn col-lg-6 d-flex flex-column'
                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__section classTitleTextBtn--title__green'
                    title={this.state.sessao_1_titulo}
                    classText='classTitleTextBtn--text classTitleTextBtn--text__section classTitleTextBtn--text__white'
                    text={this.state.sessao_1_texto}
                    hasBtn='false'

                    loading={this.state.loading}
                    loaderPrimaryColor="#14576b" //"#14576b"
                    loaderSecondaryColor="#0a2a33" //"#0a2a33"
                    heightContentLoader="260"
                    widthContentLoader="600"
                    rectWidthTitle="300"
                    rectHeightTitle="35"
                    rectWidthText="750"
                    rectHeightText="6.4"
                    rectWidthButton="130"
                    rectHeightButton="20"
                />
                <Section classSection='navigation'>
                    <Nav
                        menu='menu menu__yellowBG menu__noBorder'
                        alignItems='d-flex justify-content-center'>
                        <MenuItem
                            classMenuItem='navMenuLine navMenuLine--link__white navMenuLine--link__medium pr-lg-5 pl-lg-5 '
                            ItemLink='#producao_de_conhecimento'
                            onClick={(e) => {this.current = '#producao_de_conhecimento'; this.scrollTo(e)}}
                            textItem='Produção do conhecimento'
                        />
                        <MenuItem
                            classMenuItem='ml-md-3 navMenuLine navMenuLine--link__white navMenuLine--link__medium pr-lg-5 pl-lg-5 '
                            ItemLink='#disseminacao_de_informacoes'
                            onClick={(e) => {this.current = '#disseminacao_de_informacoes'; this.scrollTo(e)}}
                            textItem='Disseminação de Conteúdo'
                        />
                        <MenuItem
                            classMenuItem='navMenuLine navMenuLine--link__white navMenuLine--link__medium navMenuLine--mlNegative'
                            onClick={(e) => {this.current = '#formacao_de_capacitacao'; this.scrollTo(e)}}
                            ItemLink='#formacao_de_capacitacao'
                            textItem='Ações de Formação'
                        />

                    </Nav>
                </Section>

                <Section classSection='knowledgeProduction' idSection="producao_de_conhecimento">
                    <div ref={(section) => { this.producao_de_conhecimento = section; }}></div>
                    <Container>
                        <RowImgContent
                            titleTextBtnClass='classTitleTextBtn col-md-6 col-lg-6 classTitleTextBtn__rightAlignment d-flex flex-column align-items-md-end'
                            classTitle='classTitleTextBtn--title classTitleTextBtn--title__section classTitleTextBtn--title__secondWidth text-md-right'
                            title={this.state.sessao_2_titulo}
                            classText='classTitleTextBtn--text text-md-right classTitleTextBtn--text__section'
                            text={this.state.sessao_2_texto}
                            alignImg='rowImgContent--imgRight pl-0'
                            image={this.state.sessao_2_imagem}
                            hasBtn='true'
                            classButton='classTitleTextBtn--btn classTitleTextBtn--btn__textWhite classTitleTextBtn--btn__orange classTitleTextBtn--btn__bgHoverOrange mr-auto btn'
                            pathLink='/categorias/publicacoes-institucionais'
                            textButtom='Acessar Página'
                        />
                    </Container>
                </Section>


                <Section classSection='AccessToLibrary'>
                    <Container classWithContainer='h-100'>
                        <AccessToLibrary
                            classWithRow='accessToLibrary__reverse d-flex align-items-center h-100'
                            classSlider='accessToLibrary--imgLeft'
                            classTitleTextBtn='classTitleTextBtn col-md-6 col-lg-6 d-flex flex-column align-items-md-start'
                            classTitle='classTitleTextBtn--title classTitleTextBtn--title__section classTitleTextBtn--title__green classTitleTextBtn--title__smallWidth text-md-left'
                            classText='classTitleTextBtn--text text-md-left classTitleTextBtn--text__section classTitleTextBtn--text__white'
                            classButton='classTitleTextBtn--btn classTitleTextBtn--btn__textWhite classTitleTextBtn--btn__green classTitleTextBtn--btn__bgHoverOrange mr-md-auto btn'

                            accessToLib_slide={this.state.sessao_3_slider}
                            accessToLib_titulo={this.state.sessao_3_titulo}
                            accessToLib_paragrafo={this.state.sessao_3_texto}
                            pathLink='/biblioteca'
                        />

                    </Container>
                </Section>

                <Section classSection='dissemination' idSection="disseminacao_de_informacoes">
                    <div ref={(section) => { this.disseminacao_de_informacoes = section; }}></div>
                    <Container>
                        <Row>
                            <TitleTextBtn
                                titleTextBtnClass='classTitleTextBtn col-lg-8 classTitleTextBtn__rightAlignment d-flex flex-column text-center classTitleTextBtn__centerAlignment align-items-center'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__section'
                                title={this.state.sessao_4_titulo}
                                classText='classTitleTextBtn--text classTitleTextBtn--text__section'
                                text={this.state.sessao_4_texto}
                                hasBtn='false'
                            />
                        </Row>
                        <Row classWithRow=''>
                            <div className='col-md-12'>

                                <SlickCarouselInitiative>
                                    {this.state.disseminations.map(dissemination =>
                                        <Link to={`/disseminacao_e_informacao/${dissemination.slug}`}>
                                            <VerticalCard
                                                classVerticalCard="verticalCard verticalCard__big text-center"
                                                image={dissemination._embedded && (dissemination._embedded['wp:featuredmedia'] ? dissemination._embedded['wp:featuredmedia'][0].source_url : '')}
                                                cardBodyClass='verticalCard--cardBody'
                                                titleClass='font-weight-bold'
                                                title={dissemination.title ? Substring(dissemination.title.rendered, 24) : ''}
                                                text={dissemination.excerpt ? Substring(dissemination.excerpt.rendered, 70) : ''}
                                            />
                                        </Link>
                                    )}

                                </SlickCarouselInitiative>
                            </div>
                        </Row>
                    </Container>
                </Section>
                <AccessToVideosOQueFazemos />
                <Section classSection='training' idSection="formacao_de_capacitacao">
                    <div ref={(section) => { this.formacao_de_capacitacao = section; }}></div>
                    <Container>
                        <RowImgContent
                            rowDirection='flex-row-reverse'
                            titleTextBtnClass='classTitleTextBtn align-items-md-start col-md-6 col-lg-6  d-flex flex-column'
                            classTitle='classTitleTextBtn--title classTitleTextBtn--title__section'
                            title={this.state.sessao_5_titulo}
                            classText='classTitleTextBtn--text text-md-left classTitleTextBtn--text__section classTitleTextBtn--text__white'
                            text={this.state.sessao_5_texto}
                            alignImg='rowImgContent--imgLeft'
                            image={this.state.sessao_5_imagem}
                            hasBtn='false'
                            classButton='classTitleTextBtn--btn classTitleTextBtn--btn__textWhite classTitleTextBtn--btn__bgHoverOrange mr-auto btn'
                            pathLink='https://www.google.com.br'
                            textButtom='Acessar'
                            hasModal={true}
                        />





                    </Container>
                </Section>

            </React.Fragment >
        )
    }
}