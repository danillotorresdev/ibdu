import React, {Component} from 'react'

import Container from '../generics/small-components/Container'
import Section from '../generics/small-components/Section'
import CardHorizontal from '../generics/components-groups/CardHorizontal'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import MetaDate from '../generics/small-components/MetaDate'
import BgShadowImg from '../generics/small-components/BgShadowImg'
import AccessToLibrary from '../generics/components-groups/AccessToLibrary'
import AccessToExplanatoryVideos from '../generics/components-groups/AccessToExplanatoryVideos'
import * as wordpressAPI from '../../main/wordpressAPI'
import {LoaderImg} from '../generics/small-components/Loaders'
import Substring from '../generics/small-components/Substring'
import {Helmet} from 'react-helmet'
import imagePlaceholder from '../generics/small-components/imagePlaceholder'
import AceessToManyNotices from '../generics/components-groups/AccessToManyNotices'
import {Link} from 'react-router-dom'


export default class Home extends Component{
    
    state = {
        "loading": true,
        'sessao_1_thumb_do_video': '',
        "sessao2_imagem_1": '',
        "sessao2_titulo_1": '',
        "sessao2_imagem_2": '',
        "sessao2_paragrafo1": '',
        "sessao2_titulo_2": '',
        "sessao2_paragrafo2": '',
        "sessao_2_link_do_botao": '',
        "sessao2_slide": [],
        "sessao_4_titulo": '',
        "sessao_4_texto": '',
        "sessao_5_titulo": '',
        "sessao_5_texto": '',
        "posts": [],   
        "eventos": [],
        "pageTitle": '',
        "pageMetaDescription": '',
        'thumbVideo': '',
        'autoplay': '0',
        'showThumb': true,
        'pageMetaImage': ''
    }
    
    componentDidMount(){
        wordpressAPI.getPage("home")
        .then(res => {
            this.setState({
                "pageTitle": res.data[0].yoast_meta.yoast_wpseo_title,
                "pageMetaDescription": res.data[0].yoast_meta.yoast_wpseo_metadesc,
                "pageMetaImage": res.data[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
            })
            wordpressAPI.getPageACF(res.data[0].id)
            .then( data => {
                this.setState({
                    "sessao_1_id_do_video": data.data.acf.sessao_1_id_do_video,
                    "sessao_1_thumb_do_video": data.data.acf.sessao_1_thumb_do_video,
                    "sessao2_titulo_1": data.data.acf.sessao2_titulo_1,
                    "sessao2_paragrafo1": data.data.acf.sessao2_paragrafo1,
                    "sessao2_imagem_1": data.data.acf.sessao2_imagem_1,
                    "sessao2_imagem_2": data.data.acf.sessao2_imagem_2,
                    "sessao2_titulo_2": data.data.acf.sessao2_titulo_2,
                    "sessao2_paragrafo2": data.data.acf.sessao2_paragrafo2,
                    "sessao_2_link_do_botao": data.data.acf.sessao_2_link_do_botao,
                    "sessao2_slide": [...data.data.acf.sessao2_slide],                    
                    "sessao_4_titulo": data.data.acf.sessao_4_titulo,
                    "sessao_4_texto": data.data.acf.sessao_4_texto,
                    "sessao_5_titulo": data.data.acf.sessao_5_titulo,
                    "sessao_5_texto": data.data.acf.sessao_5_texto,
                    "loading": false
                    
                })
            })
        })
        wordpressAPI.getPosts('posts', 5)
        .then(res => {
            this.setState({
                "posts": [...res.data],
                "loading": false
            })
            
        }) 
        wordpressAPI.getCustomPosts('eventos')
            .then(res => {
                this.setState({
                    "eventos": [...res]
                })
                }
            )
           
    }
    playVideo = () =>{
        this.setState({
            'autoplay': '1',
            'showThumb': false
        })
    }
    getDate(postDate){        
            let time = new Date(postDate)	
            let current_date = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`;
            return current_date        
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
        <Section classSection='newsHome'>
            <Container>
                <div className='row'>
                    <div className='col-12 col-lg-6 newsHome--video '>
                        <LoaderImg 
                                loading={this.state.loading}
                                loaderPrimaryColor="#14576b" //"#14576b"
                                loaderSecondaryColor="#0a2a33" //"#0a2a33"
                                contentHeight="100%"
                                contentWidth="100%"
                                height='455'
                                width='455'
                                rectWidth='455'
                                rectHeight='390'
                            >
                        <div style={{
                            'position': 'relative',
                            'height' : '100%',
                            'width' : '100%'
                            
                        }}>
                                   
                                {this.state.showThumb === true &&(
                                    <div className="newsHome--videoBG" 
                                        onClick={this.playVideo} 
                                        style={{
                                            'backgroundImage': `url('${this.state.sessao_1_thumb_do_video}')`
                                        }}>
                                            <div style={{'backgroundImage': 'url("http://www.ibdu.org.br/api/wp-content/uploads/2019/01/play-button-1.png")', 'height': '64px', 'width': '64px'}}></div>
                                    </div>
                                
                            )}                                                 

                            <iframe width="100%" className='newsHome--iframeVideo' title={this.state.sessao_1_id_do_video} src={`https://www.youtube.com/embed/${this.state.sessao_1_id_do_video}?autoplay=${this.state.autoplay}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>                   
                        </LoaderImg>   
                    </div>
                    <div className='col-12 col-lg-6 d-flex flex-column flex-lg-row flex-lg-column justify-content-between'>  
                            <CardHorizontal 
                                cardClass='cardHorizontal d-flex flex-column  flex-lg-row mt-3 mt-lg-0 shadow'
                                dadOfImg='cardHorizontal--cardImg'
                                imgClass='cardHorizontal--imgClass'
                                image={this.state.posts[0] ? this.state.posts[0]._embedded['wp:featuredmedia']? this.state.posts[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : '' : ''}
                                cardBodyClass='cardHorizontal--cardBody'
                                titleTextBtnClass='classTitleTextBtn d-flex flex-column'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__smallFont mb-2'
                                title={this.state.posts[0] ? Substring(this.state.posts[0].title.rendered, 30) : ''}
                                classText='classTitleTextBtn--text mb-2'
                                text={this.state.posts[0] ? Substring(this.state.posts[0].excerpt.rendered, 60) : ''}
                                hasBtn='true'                            
                                classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__txtHoverBlue font-weight-bold pl-0'
                                pathLink={this.state.posts[0] ? `noticias/${this.state.posts[0].slug}` : ''}
                                textButtom='Acesse a página'

                                loading={this.state.loading}
                                loaderPrimaryColor="#14576b" //"#14576b"
                                loaderSecondaryColor="#0a2a33" //"#0a2a33"
                                loaderImgHeight="100%"
                                loaderImgWidth="100%"
                                contentHeight="284px"
                                contentWidth="100%"
                                />
 
                            <CardHorizontal 
                                cardClass='cardHorizontal d-flex flex-column  flex-lg-row mt-3 mt-lg-0 shadow'
                                dadOfImg='cardHorizontal--cardImg'
                                imgClass='cardHorizontal--imgClass'
                                image={this.state.posts[1] ? this.state.posts[1]._embedded['wp:featuredmedia']? this.state.posts[1]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : '' : ''}
                                cardBodyClass='cardHorizontal--cardBody'
                                titleTextBtnClass='classTitleTextBtn d-flex flex-column'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__orange classTitleTextBtn--title__smallFont mb-2 '
                                title={this.state.posts[1] ? Substring(this.state.posts[1].title.rendered, 30) : ''}
                                classText='classTitleTextBtn--text mb-2'
                                text={this.state.posts[1] ? Substring(this.state.posts[1].excerpt.rendered, 60) : ''}
                                hasBtn='true'                            
                                classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__textOrange classTitleTextBtn--btn__txtHoverOrange font-weight-bold pl-0'
                                pathLink={this.state.posts[1] ? `noticias/${this.state.posts[1].slug}` : ''}
                                textButtom='Acesse a página'

                                loading={this.state.loading}
                                loaderPrimaryColor="#14576b" //"#14576b"
                                loaderSecondaryColor="#0a2a33" //"#0a2a33"
                                loaderImgHeight="100%"
                                loaderImgWidth="100%"
                                contentHeight="284px"
                                contentWidth="100%" 
                                />
                           
                    </div>
                </div>
            </Container>
        </Section>

        <Section classSection='accessToTwoPages'> 
            <Container>
                <div className="row">  
                    <div className='col-md-6 col-lg-6 d-flex flex-column justify-content-center'>
                        <LoaderImg 
                            loading={this.state.loading}
                            loaderPrimaryColor="#14576b" //"#14576b"
                            loaderSecondaryColor="#0a2a33" //"#0a2a33"
                            contentHeight="265px"
                            contentWidth="100%"
                            height='265'
                            width='455'
                            rectWidth='455'
                            rectHeight='265'
                        >
                        
                        <img className='accessToTwoPages--imgLeft__img img-fluid' src={this.state.sessao2_imagem_1} alt="" />
                                                
                        </LoaderImg>
                    </div>
                    <div className="col-md-6">    
                        
                        <TitleTextBtn 
                            titleTextBtnClass='classTitleTextBtn accessToTwoPages--txt1 d-flex flex-column align-items-center align-items-sm-start justify-content-center h-100'
                            classTitle='classTitleTextBtn--title  classTitleTextBtn--title__section classTitleTextBtn--title__orange mt-3 mt-sm-0'                        
                            title={this.state.sessao2_titulo_1}
                            classText='classTitleTextBtn--text classTitleTextBtn--text__white classTitleTextBtn--text__section '
                            text={this.state.sessao2_paragrafo1}
                            hasBtn='true'
                            classButton='classTitleTextBtn--btn classTitleTextBtn--btn__textWhite classTitleTextBtn--btn__orange classTitleTextBtn--btn__bgHoverOrange mr-auto btn'
                            pathLink='o-que-pensamos'
                            textButtom='Saiba mais' 
                            
                            loading={this.state.loading}
                            loaderPrimaryColor="#14576b"
                            loaderSecondaryColor="#0a2a33"
                            contentHeight="230"
                            contentWidth="600"
                            rectWidthTitle="300"
                            rectHeightTitle="35"
                            rectWidthText="750"
                            rectHeightText="6.4"
                            rectWidthButton="201"
                            rectHeightButton="6.4"
                            />
                    </div>
                </div>

                <AccessToLibrary  
                    classWithRow='pt-md-5 pt-lg-0'
                    loading={this.state.loading}
                    classSlider='accessToLibrary--imgRight mt-4 mt-sm-0 mb-4 mb-sm-0'
                    classTitleTextBtn='accessToLibrary--align classTitleTextBtn  col-md-6 col-lg-6 d-flex flex-column align-items-md-end mt-3 justify-content-center mt-sm-0'
                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__section classTitleTextBtn--title__orange classTitleTextBtn--title__smallWidth text-md-right'
                    classText='classTitleTextBtn--text classTitleTextBtn--text__white text-md-right classTitleTextBtn--text__section'
                    classButton='classTitleTextBtn--btn classTitleTextBtn--btn__textWhite classTitleTextBtn--btn__orange 
                            classTitleTextBtn--btn__bgHoverOrange ml-md-auto btn'
                    accessToLib_titulo={this.state.sessao2_titulo_2}
                    accessToLib_paragrafo={this.state.sessao2_paragrafo2}
                    pathLink='biblioteca'
                    accessToLib_slide={this.state.sessao2_slide}
                    /> 
            </Container>
        </Section >

            <AceessToManyNotices />


        <AccessToExplanatoryVideos 
            title={this.state.sessao_4_titulo}
            text={this.state.sessao_4_texto}
        />

        <Section classSection='eventsArea'>
            <Container>
                <div className="row">
                
                    <TitleTextBtn 
                        titleTextBtnClass='classTitleTextBtn col-lg-6 d-flex flex-column'
                        classTitle='classTitleTextBtn--title classTitleTextBtn--title__section classTitleTextBtn--title__orange classTitleTextBtn--title__secondWidth'
                        title={this.state.sessao_5_titulo}
                        classText='classTitleTextBtn--text classTitleTextBtn--text__section classTitleTextBtn--text__orange'
                        text={this.state.sessao_5_texto}
                        hasBtn='false'
                    />
                    
                </div>
                <div className="row">
                    <div className='col-lg-6'>
                        <div className="eventsArea--dadImg">
                                <Link to={this.state.eventos[2] ? `eventos/${this.state.eventos[2].slug}`: ''}>
                            <BgShadowImg>                                
                                <img className='eventsArea--imgLeft img-fluid shadow' src={this.state.eventos[2] ? ( this.state.eventos[2]._embedded ? ( this.state.eventos[2]._embedded['wp:featuredmedia'] ? this.state.eventos[2]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : imagePlaceholder): imagePlaceholder ) : imagePlaceholder } alt="" />  
                                
                                <MetaDate eventDate={this.getDate(this.state.eventos[2] ? this.state.eventos[2].date : '')} />
                                <TitleTextBtn 
                                        titleTextBtnClass='classTitleTextBtn col-lg-8 d-flex flex-column'
                                        classTitle='classTitleTextBtn--title classTitleTextBtn--title__white classTitleTextBtn--title__textUppercase mb-2'
                                        title={this.state.eventos[2] ? Substring(this.state.eventos[2].title.rendered, 60) : ''}
                                        classText='classTitleTextBtn--text classTitleTextBtn--text__white mb-2'
                                        text={this.state.eventos[2] ? Substring(this.state.eventos[2].excerpt.rendered, 105) : ''}
                                        hasBtn='true'
                                        classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt
                                        classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__textWhite classTitleTextBtn--btn__txtHoverWhite font-weight-bold pl-0'
                                        pathLink={this.state.eventos[2] ? `eventos/${this.state.eventos[2].slug}`: ''}
                                        textButtom='Mais detalhes'
                                        />
                            </BgShadowImg>
                                </Link>
                        </div>  

                    </div>
                    <div className='col-lg-6 d-flex flex-column justify-content-between pr-lg-0'>
                            <CardHorizontal 
                                dadOfImg='cardHorizontal--cardImg cardHorizontal--cardImg__half'
                                cardBodyClass='cardHorizontal--cardBody cardHorizontal--cardBody__half'                                
                                cardClass='cardHorizontal d-flex flex-column mt-3 mt-lg-0 flex-lg-row shadow cardHorizontal__leftMetaDate'
                                imgClass='cardHorizontal--imgClass cardHorizontal--imgClass__large img-fluid'
                                image={this.state.eventos[3] ? ( this.state.eventos[3]._embedded ? ( this.state.eventos[3]._embedded['wp:featuredmedia'] ? this.state.eventos[3]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : imagePlaceholder) : imagePlaceholder) : imagePlaceholder}
                                titleTextBtnClass='classTitleTextBtn d-flex flex-column'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__smallFont mb-2'
                                title={this.state.eventos[3] ? Substring(this.state.eventos[3].title.rendered, 20) : ''}
                                classText='classTitleTextBtn--text mb-2'
                                text={this.state.eventos[3] ? Substring(this.state.eventos[3].excerpt.rendered, 60) : ''}
                                hasBtn='true'                            
                                classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg  classTitleTextBtn--btn__textOrange
                                    classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__txtHoverOrange
                                    font-weight-bold pl-0'
                                pathLink={this.state.eventos[3] ? `eventos/${this.state.eventos[3].slug}`: ''}
                                textButtom='Acesse a página'
                                hasDate='true'
                                eventDate={this.getDate(this.state.eventos[3] ? this.state.eventos[3].date : '')} 
                                />
                            <CardHorizontal 
                                dadOfImg='cardHorizontal--cardImg cardHorizontal--cardImg__half'
                                cardBodyClass='cardHorizontal--cardBody cardHorizontal--cardBody__half' 
                                cardClass='cardHorizontal d-flex flex-column mt-3 mt-lg-0 flex-lg-row shadow cardHorizontal__leftMetaDate'
                                imgClass='cardHorizontal--imgClass cardHorizontal--imgClass__large img-fluid'
                                image={this.state.eventos[4] ? ( this.state.eventos[4]._embedded ? ( this.state.eventos[4]._embedded['wp:featuredmedia'] ? this.state.eventos[4]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : '') : imagePlaceholder ) : imagePlaceholder}
                                titleTextBtnClass='classTitleTextBtn d-flex flex-column'
                                classTitle='classTitleTextBtn--title classTitleTextBtn--title__smallFont mb-2'
                                title={this.state.eventos[4] ? Substring(this.state.eventos[4].title.rendered, 20) : ''}
                                classText='classTitleTextBtn--text mb-2'
                                text={this.state.eventos[4] ? Substring(this.state.eventos[4].excerpt.rendered, 60) : ''}
                                hasBtn='true'                            
                                classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg  classTitleTextBtn--btn__textOrange
                                    classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__txtHoverOrange
                                    font-weight-bold pl-0'
                                pathLink={this.state.eventos[4] ? `eventos/${this.state.eventos[4].slug}`: ''}
                                textButtom='Acesse a página'
                                hasDate='true'
                                eventDate={this.getDate(this.state.eventos[4] ? this.state.eventos[4].date : '')} 
                                />
                    </div>
                </div>  
            </Container>
        </Section>



    </React.Fragment>
    )
    }
}