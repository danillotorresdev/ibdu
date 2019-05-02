import React, {Component} from 'react'
import Banner from '../generics/components-groups/Banner';
import Section from '../generics/small-components/Section';
import Container from '../generics/small-components/Container';
import Row from '../generics/small-components/Row'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import AccessToExplanatoryVideos from '../generics/components-groups/AccessToExplanatoryVideos';
import ScrollBar from '../generics/small-components/ScrollBar'
import SimpleHorizontalCard from '../generics/components-groups/SimpleHorizontalCard';
import * as wordpressAPI from '../../main/wordpressAPI'
import Substring from '../generics/small-components/Substring'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import NotesAndExpressions from '../generics/components-groups/NotesAndExpressions';

export default class OQuePensamos extends Component{
    state ={
        "sessao_1_titulo": '',
        "sessao_1_texto": '',
        "sessao_2_titulo": '',
        "sessao_2_texto": '',
        "sessao_2_iniciativas": [],
        "sessao_3_titulo": '',
        "sessao_3_texto": '',
        "sessao_4_titulo": '',
        "sessao_4_texto": '',
        "artigos": [],
        "notas": [],
        "opinioes": [],
        "loading": true,
        "pageTitle": '',
        "pageMetaDescription": '',
        'pageMetaImage': ''
    } 
    componentDidMount(){
        wordpressAPI.getPage("o-que-pensamos")
        .then(res => {
            this.setState({
                "pageTitle": res.data[0].yoast_meta.yoast_wpseo_title,
                "pageMetaDescription": res.data[0].yoast_meta.yoast_wpseo_metadesc,
                "pageMetaImage": res.data[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
            })
            wordpressAPI.getPageACF(res.data[0].id)
            .then( data => {
                this.setState({
                    "sessao_1_titulo": data.data.acf.sessao_1_titulo,
                    "sessao_1_texto": data.data.acf.sessao_1_texto,
                    "sessao_2_titulo": data.data.acf.sessao_2_titulo,
                    "sessao_2_texto": data.data.acf.sessao_2_texto,
                    "sessao_2_iniciativas": [...data.data.acf.sessao_2_iniciativas],
                    "sessao_3_titulo": data.data.acf.sessao_3_titulo,
                    "sessao_3_texto": data.data.acf.sessao_3_texto,
                    "sessao_4_titulo": data.data.acf.sessao_4_titulo,
                    "sessao_4_texto": data.data.acf.sessao_4_texto,
                    "loading": false
                    
                })
            })
        })
        wordpressAPI.getNotes()
        .then(res =>
            this.setState({ "notas": [...res.data] })
            )
        wordpressAPI.getConteudo('artigos')
        .then(resp => {
            this.setState({
                "artigos": [...resp],
                "loading": false
            })            
        }) 
        wordpressAPI.getOpinions()
        .then(res => 
            this.setState({
                "opinioes": [...res.data]
            })
            )
    }

    render(){
        return(
            <React.Fragment>
            <Helmet>
                <title>{this.state.pageTitle}</title>
                <meta name="description" content={this.state.pageMetaDescription}/>
                <meta property="og:title" content={this.state.pageTitle} />
                <meta property="og:description" content={this.state.pageMetaDescription}/>
                <meta property="og:image" content={this.state.pageMetaImage}/>
            </Helmet>
            <Banner
                classBanner='banner banner--oQuePensamos shadow d-flex align-items-center'
                divTextBanner='d-flex justify-content-end align-items-center'
                titleTextBtnClass='classTitleTextBtn col-lg-6 d-flex flex-column'
                classTitle='classTitleTextBtn--title classTitleTextBtn--title__section'
                title={this.state.sessao_1_titulo}
                classText='classTitleTextBtn--text classTitleTextBtn--text__section classTitleTextBtn--text__white'
                text={this.state.sessao_1_texto}
                hasBtn='false'

                loading={this.state.loading}
                loaderPrimaryColor="#c96200" //"#14576b"
                loaderSecondaryColor="#a45000" //"#0a2a33"
                heightContentLoader="260"
                widthContentLoader="600"
                rectWidthTitle="300"
                rectHeightTitle="35"
                rectWidthText="750"
                rectHeightText="6.4"
                rectWidthButton="130"
                rectHeightButton="20"
                />
    
                <NotesAndExpressions />
    
                <Section classSection='opinion'>
                    <Container>
                        <Row>       
                            <div className="col-md-6">                 
                                <TitleTextBtn
                                    titleTextBtnClass='classTitleTextBtn d-flex flex-column'
                                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__section classTitleTextBtn--title__orange'
                                    title={this.state.sessao_3_titulo}
                                    classText='classTitleTextBtn--text classTitleTextBtn--text__section classTitleTextBtn--text__intermediatedWidth'
                                    text={this.state.sessao_3_texto}
                                    hasBtn='false'
                                />
                                <div className="opinion--box shadow">
                                <Link to={ this.state.opinioes[0] ? `/opinioes/${this.state.opinioes[0].slug}` : ''}>
                                    <TitleTextBtn
                                        titleTextBtnClass='classTitleTextBtn  d-flex flex-column'
                                        classTitle='classTitleTextBtn--title classTitleTextBtn--title__section'
                                        title={this.state.opinioes[0] ? Substring(this.state.opinioes[0].title.rendered, 45) : ''}
                                        classText='classTitleTextBtn--text classTitleTextBtn--text__section'
                                        text={this.state.opinioes[0] ? Substring(this.state.opinioes[0].excerpt.rendered, 100) : ''}
                                        hasBtn='true'                         
                                        classButton='classTitleTextBtn--btn classTitleTextBtn--btn__textOrange classTitleTextBtn--btn__noBg
                                        classTitleTextBtn--btn__smallTxt classTitleTextBtn--btn__bgHoverNone
                                        classTitleTextBtn--btn__txtHoverOrange font-weight-bold pl-0'
                                        pathLink={ this.state.opinioes[0] ? `/opinioes/${this.state.opinioes[0].slug}` : ''}
                                        textButtom='Leia Mais'
                                    />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <ScrollBar>
                                {this.state.opinioes.map( (opinion, i) => 
                                    i !== 0 &&
                                        (
                                        <Link to={`/opinioes/${opinion.slug}`}>
                                        <SimpleHorizontalCard 
                                        title= {Substring(opinion.title.rendered, 45)}
                                        description= {Substring(opinion.excerpt.rendered, 150)}
                                        link= {`/opinioes/${opinion.slug}`}
                                    /> 
                                    </Link>
                                      )
                                    
                                                                     
                                )}
                            </ScrollBar>                       
                    </div>
                        </Row>
                    </Container>
                </Section>
    
                <AccessToExplanatoryVideos 
                                    title={this.state.sessao_4_titulo}
                                    text={this.state.sessao_4_texto}
                />
    
                
    
        </React.Fragment>
        )
    }

}
   