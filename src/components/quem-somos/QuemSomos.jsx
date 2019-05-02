import React, { Component } from 'react'
import Banner from '../generics/components-groups/Banner'
import TwentyTwenty from 'react-twentytwenty'
import Section from '../generics/small-components/Section'
import Container from '../generics/small-components/Container'
import Row from '../generics/small-components/Row'
import ImgTimeline1 from '../../assets/images/Isometrico-Timeline.png'
import ImgTimeline2 from '../../assets/images/Isométrico-Timeline-Aberto.png'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import Member from '../generics/small-components/Member'
import VerticalCard from '../generics/components-groups/VerticalCard'
import SlickCarouselPartners from '../generics/slick/SlickCarouselPartners'
import * as wordpressAPI from '../../main/wordpressAPI'
import { LoaderTitleTextWith2Lines } from '../generics/small-components/Loaders'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import SlickCarouselMembers from '../generics/slick/SlickCarouselMembers'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default class QuemSomos extends Component {
    state = {
        "loading": true,
        "sessao_1_titulo": '',
        "sessao_1_paragrafo": '',
        "sessao_1_link_do_botao": '',
        "sessao_2_titulo": '',
        "sessao_2_texto": '',
        "sessao_3_titulo": '',
        "sessao_3_texto": '',
        "sessao_3_membros": [],
        "sessao_4_titulo": '',
        "sessao_4_texto": '',
        "sessao_4_membros": [],
        "sessao_5_titulo": '',
        "sessao_5_texto": '',
        "sessao_5_parceiros": [],
        "sessao_6_titulo": '',
        "sessao_6_texto": '',
        "estatuto_social_titulo": '',
        "estatuto_social_texto": '',
        "estatuto_social_modal": '',
        "timeline": [],
        "pageTitle": '',
        "pageMetaDescription": '',
        "name": '',
        'city': '',
        'state': '',
        'country': '',
        'email': '',
        'phone': '',
        'pageMetaImage': ''
    }
    handleFormChange = (e, item) => {
        this.setState({
            [item]: e.target.value
        })
    }
    componentDidMount() {
        wordpressAPI.getPage("quem-somos")
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
                            "sessao_1_paragrafo": data.data.acf.sessao_1_paragrafo,
                            "sessao_1_link_do_botao": data.data.acf.sessao_1_link_do_botao,
                            "sessao_2_titulo": data.data.acf.sessao_2_titulo,
                            "sessao_2_texto": data.data.acf.sessao_2_texto,
                            "sessao_3_titulo": data.data.acf.sessao_3_titulo,
                            "sessao_3_texto": data.data.acf.sessao_3_texto,
                            "sessao_3_membros": [...data.data.acf.sessao_3_membros],
                            "sessao_4_titulo": data.data.acf.sessao_4_titulo,
                            "sessao_4_texto": data.data.acf.sessao_4_texto,
                            "sessao_4_membros": [...data.data.acf.sessao_4_membros],
                            "sessao_5_titulo": data.data.acf.sessao_5_titulo,
                            "sessao_5_texto": data.data.acf.sessao_5_texto,
                            "sessao_5_parceiros": [...data.data.acf.sessao_5_parceiros],
                            "sessao_6_titulo": data.data.acf.sessao_6_titulo,
                            "sessao_6_texto": data.data.acf.sessao_6_texto,
                            "estatuto_social_titulo": data.data.acf.estatuto_social_titulo,
                            "estatuto_social_texto": data.data.acf.estatuto_social_texto,
                            "estatuto_social_modal": data.data.acf.estatuto_social_modal,
                            "timeline": [...data.data.acf.timeline],

                            "loading": false
                        })
                    })
            })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let state = this.state
        axios.post('/mailer.php', {
            name: state.name,
            email: state.email,
            phone: state.phone,
            subject: 'Associe-se',
            city: state.city,
            state: state.state,
            country: state.country,
            message: '',
            fromSite: true

        }).then(
            res => res.data === true ? NotificationManager.info('Mensagem enviada com sucesso') : NotificationManager.error('Erro ao enviar mensagem')
        )
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
                    classBanner='banner shadow d-flex align-items-center'
                    divTextBanner='d-flex justify-content-end align-items-center'
                    titleTextBtnClass='classTitleTextBtn col-lg-6 d-flex flex-column'
                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__section'
                    title={this.state.sessao_1_titulo}
                    classText='classTitleTextBtn--text classTitleTextBtn--text__white classTitleTextBtn--text__section'
                    text={this.state.sessao_1_paragrafo}
                    hasBtn='false'

                    loading={this.state.loading}
                    loaderPrimaryColor="#418b34"
                    loaderSecondaryColor="#336e28"
                    heightContentLoader="260"
                    widthContentLoader="600"
                    rectWidthTitle="300"
                    rectHeightTitle="35"
                    rectWidthText="750"
                    rectHeightText="6.4"
                    rectWidthButton="130"
                    rectHeightButton="20"


                />

                <Section classSection='timeLine'>
                    <Container classWithContainer='d-flex justify-content-center'>

                        <div className="col-md-6">
                            <LoaderTitleTextWith2Lines
                                loading={this.state.loading}
                                loaderPrimaryColor="#cacaca"
                                loaderSecondaryColor="#bdbcbc"
                                contentHeight="20"
                                contentWidth="100"
                                rectWidthTitle="50"
                                rectHeightTitle="6"
                                rectWidthText="100"
                                rectHeightText="1"
                            >

                                <TitleTextBtn
                                    titleTextBtnClass='classTitleTextBtn classTitleTextBtn__centerAlignment text-center'
                                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__section'
                                    title={this.state.sessao_2_titulo}
                                    classText='classTitleTextBtn--text'
                                    text={this.state.sessao_2_texto}
                                    hasBtn='false'



                                />
                            </LoaderTitleTextWith2Lines>

                        </div>
                    </Container>
                    <Container>
                        <TwentyTwenty
                            left={<img className='timeLine--img' src={ImgTimeline1} alt="Linha do tempo"/>}
                            right={<img className='timeLine--img' src={ImgTimeline2} alt="Linha do tempo"/>}
                            slider={<div className="slider" />}
                        />
                    </Container>
                </Section>
                <Section classSection='estatutoSocial' >
                    <Container classWithContainer='d-flex flex-column align-items-center'>
                        <TitleTextBtn
                            titleTextBtnClass='classTitleTextBtn text-center'
                            classTitle='classTitleTextBtn--title  classTitleTextBtn--title__section classTitleTextBtn--title__orange mt-3 mt-sm-0'
                            title={this.state.estatuto_social_titulo}
                            classText='classTitleTextBtn--text classTitleTextBtn--text__section '
                            text={this.state.estatuto_social_texto}
                            hasBtn='false'
                        />

                        <button type="button" className="classTitleTextBtn--btn classTitleTextBtn--btn__textWhite classTitleTextBtn--btn__orange classTitleTextBtn--btn__bgHoverOrange btn" data-toggle="modal" data-target=".bd-example-modal-lg1">
                            Saiba mais
                        </button>


                        <div className="modal fade bd-example-modal-lg1" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel1">Estatuto Social</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body" >
                                        <p dangerouslySetInnerHTML={{ __html: this.state.estatuto_social_modal }}></p>

                                    </div>
                                    <div className="modal-footer">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Section>
                <Section classSection='timelineMobile pt-4 pb-3'>
                    <Container >
                        <LoaderTitleTextWith2Lines
                            loading={this.state.loading}
                            loaderPrimaryColor="#cacaca"
                            loaderSecondaryColor="#bdbcbc"
                            contentHeight="20"
                            contentWidth="100"
                            rectWidthTitle="50"
                            rectHeightTitle="6"
                            rectWidthText="100"
                            rectHeightText="1"
                        >

                            <TitleTextBtn
                                titleTextBtnClass='classTitleTextBtn classTitleTextBtn__centerAlignment text-center'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__section'
                                title={this.state.sessao_2_titulo}
                                classText='classTitleTextBtn--text'
                                text={this.state.sessao_2_texto}
                                hasBtn='false'



                            />
                        </LoaderTitleTextWith2Lines>

                        <div className="accordion" id="accordionExample">
                            {
                                this.state.timeline.map((item, i) =>
                                    <div className="accordion card " key={`accordion_${i}`}>
                                        {/* falar sobre isso com o vitor sobre essa gambiarra amanha */}
                                        <div className="card--header" id={`heading${i}`}>
                                            <h5 className="mb-0 d-flex">
                                                <button className="linkCard d-flex collapsed" type="button" data-toggle="collapse" data-target={`#collapse${i}`} aria-expanded="true" aria-controls={`collapse${i}`}>
                                                    <span className='linkCard--title'>{item.ano}</span>
                                                    <span className='linkCard--symbol'></span>
                                                </button>

                                            </h5>
                                        </div>

                                        <div id={`collapse${i}`} className="collapse" aria-labelledby={`heading${i}`} data-parent="#accordionExample">
                                            <div className="card--body">
                                                {item.paragrafo}
                                            </div>

                                        </div>
                                    </div>
                                )
                            }


                        </div> { /* accordion */}

                    </Container>
                </Section>
                <Section classSection='advice'>
                    <Container>
                        <Row>
                            <TitleTextBtn
                                titleTextBtnClass='classTitleTextBtn col-lg-6 classTitleTextBtn__centerAlignment text-center'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__section'
                                title={this.state.sessao_3_titulo}
                                classText='classTitleTextBtn--text classTitleTextBtn--text__white classTitleTextBtn--text__section'
                                text={this.state.sessao_3_texto}
                                hasBtn='false'
                            />
                        </Row>
                        <div className='row justify-content-between'>
                            {this.state.sessao_3_membros.map((member, i) =>
                                <React.Fragment key={`member_${i}`}>
                                    <Member
                                        imgMember={member.foto}
                                        title={member.nome}
                                        description={member.descricao}
                                        curriculo={member.curriculo}
                                    />
                                </React.Fragment>
                            )}

                        </div>
                    </Container>

                </Section>
                <Section classSection='adviceMobile'>
                    <Container>
                        <Row>
                            <TitleTextBtn
                                titleTextBtnClass='classTitleTextBtn col-lg-6 classTitleTextBtn__centerAlignment text-center'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__section'
                                title={this.state.sessao_3_titulo}
                                classText='classTitleTextBtn--text classTitleTextBtn--text__white classTitleTextBtn--text__section'
                                text={this.state.sessao_3_texto}
                                hasBtn='false'
                            />
                        </Row>
                        <SlickCarouselMembers>
                            {this.state.sessao_3_membros.map((member, i) =>
                                <React.Fragment key={`members2_${i}`} >
                                    <Member
                                        imgMember={member.foto}
                                        title={member.nome}
                                        description={member.descricao}
                                        curriculo={member.curriculo}
                                    />
                                </React.Fragment>
                            )}
                        </SlickCarouselMembers>
                    </Container>
                </Section>
                <Section classSection='executiveTeam'>
                    <Container>
                        <Row>
                            <TitleTextBtn
                                titleTextBtnClass='classTitleTextBtn col-lg-6 classTitleTextBtn__centerAlignment text-center'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__green classTitleTextBtn--title__section'
                                title={this.state.sessao_4_titulo}
                                classText='classTitleTextBtn--text classTitleTextBtn--text__white classTitleTextBtn--text__section'
                                text={this.state.sessao_4_texto}
                                hasBtn='false'
                            />
                        </Row>
                        <div className='row justify-content-center'>
                            {this.state.sessao_4_membros.map((member, i) =>
                                <React.Fragment key={`members3_${i}`} >
                                    <Member
                                        imgMember={member.foto}
                                        title={member.nome}
                                        description={member.descricao}
                                        curriculo={member.curriculo}
                                    />
                                </React.Fragment>
                            )}


                        </div>

                    </Container>
                </Section>
                <Section classSection='executiveTeamMobile'>
                    <Container>
                        <Row>
                            <TitleTextBtn
                                titleTextBtnClass='classTitleTextBtn col-lg-6 classTitleTextBtn__centerAlignment text-center'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__green classTitleTextBtn--title__section'
                                title={this.state.sessao_4_titulo}
                                classText='classTitleTextBtn--text classTitleTextBtn--text__white classTitleTextBtn--text__section'
                                text={this.state.sessao_4_texto}
                                hasBtn='false'
                            />
                        </Row>
                        <SlickCarouselMembers>
                            {this.state.sessao_4_membros.map((member, i) =>
                                <React.Fragment key={`members4_${i}`} >
                                    <Member
                                        imgMember={member.foto}
                                        title={member.nome}
                                        description={member.descricao}
                                        curriculo={member.curriculo}
                                    />
                                </React.Fragment>
                            )}
                        </SlickCarouselMembers>
                    </Container>
                </Section>

                <Section classSection='partners'>
                    <Container>
                        <Row>
                            <TitleTextBtn
                                titleTextBtnClass='classTitleTextBtn col-lg-6 classTitleTextBtn__centerAlignment text-center'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__green classTitleTextBtn--title__section'
                                title={this.state.sessao_5_titulo}
                                classText='classTitleTextBtn--text classTitleTextBtn--text__section'
                                text={this.state.sessao_5_texto}
                                hasBtn='false'
                            />
                        </Row>
                    </Container>
                    <Container>
                        <div className='sliderEquipeExecutiva'>
                            <SlickCarouselPartners>
                                {this.state.sessao_5_parceiros.map((partner, i) =>
                                    <a key={`members4_${i}`}
                                        href={partner.descricao} target='blank'>
                                        <VerticalCard
                                            image={partner.imagem}
                                            classVerticalCard="verticalCard text-center"
                                            title={partner.nome}
                                            cardBodyClass='verticalCard--cardBody'
                                            hasLink='true'
                                            textButtom='Conheça'
                                            classButton='classTitleTextBtn--btn  classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__txtHoverOrange font-weight-bold classTitleTextBtn--btn__textWhite '
                                            pathLink={partner.descricao}
                                        />
                                    </a>
                                )}



                            </SlickCarouselPartners>
                        </div>
                    </Container>
                </Section>
                <Section classSection='formulario'>
                    <Container>
                        <Row>
                            <TitleTextBtn
                                titleTextBtnClass='classTitleTextBtn col-lg-6 classTitleTextBtn__centerAlignment text-center'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__section classTitleTextBtn--title__orange'
                                title={this.state.sessao_6_titulo}
                                classText='classTitleTextBtn--text classTitleTextBtn--text__section classTitleTextBtn--text__orange'
                                text={this.state.sessao_6_texto}
                                hasBtn='false'
                            />
                        </Row>
                    </Container>
                    <Container>
                        <Row classWithRow='d-flex aling-items-center justify-content-center pr-3 pl-3 pr-md-0 pl-md-0'>
                            <form className='contactForm w-md-75 text-center' onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input required type="text" onChange={(e) => this.handleFormChange(e, 'name')} value={this.state.formField_name} className="contactForm--input form-control" id="name" aria-describedby="emailHelp" placeholder="Nome Completo" />
                                </div>
                                <div className="form-group d-flex">
                                    <input required type="text" onChange={(e) => this.handleFormChange(e, 'city')} value={this.state.formField_city} className="contactForm--input form-control mr-1" id="city" aria-describedby="city" placeholder="Cidade" />
                                    <input required type="text" onChange={(e) => this.handleFormChange(e, 'state')} value={this.state.formField_state} className='contactForm--input form-control ml-1' id='state' aria-describedby="state" placeholder='Estado' />
                                </div>
                                <div className="form-group">
                                    <input required type="text" onChange={(e) => this.handleFormChange(e, 'country')} value={this.state.formField_country} className='contactForm--input form-control' id='country' aria-describedby="country" placeholder='Pais' />
                                </div>
                                <div className="form-group">
                                    <input required type="email" onChange={(e) => this.handleFormChange(e, 'email')} value={this.state.formField_email} className='contactForm--input form-control' id='state' aria-describedby="state" placeholder='E-mail' />
                                </div>
                                <div className="form-group">
                                    <input required type="text" onChange={(e) => this.handleFormChange(e, 'phone')} value={this.state.formField_phone} className='contactForm--input form-control' id='tel' aria-describedby="tel" placeholder='(DDD) + Telefone' />
                                </div>


                                <button type="submit" className="btn contactForm--btnAttr">Enviar</button>
                            </form>
                        </Row>
                    </Container>
                </Section>

                <NotificationContainer />
            </React.Fragment>


        )
    }
}
