import React, { Component } from 'react'
import Container from '../generics/small-components/Container'
import Section from '../generics/small-components/Section'
import Row from '../generics/small-components/Row'
import VerticalCard from '../generics/components-groups/VerticalCard'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import AccessToExplanatoryVideos from '../generics/components-groups/AccessToExplanatoryVideos'
import PostsWithLoadMore from '../generics/components-groups/PostsWithLoadMore'
import * as wordpressAPI from '../../main/wordpressAPI'
import { Link } from 'react-router-dom'
import Substring from '../generics/small-components/Substring'
import FormFilterSearch from '../generics/small-components/FormFilterSearch'
import { Helmet } from 'react-helmet'
import NotesAndExpressions from '../generics/components-groups/NotesAndExpressions'
import FABCategory from '../generics/small-components/FABCategory'

export default class Biblioteca extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "offset": 0,
            "sessao_3_titulo": '',
            "sessao_3_texto": '',
            "sessao_3_link_do_botao": '',
            "sessao_3_imagem": '',
            "sessao_4_titulo": '',
            "sessao_4_texto": '',
            "sessao_5_titulo": '',
            "artigos": [],
            "pesquisas": [],
            "legislacao": [],
            "categorias": [],
            "allContents": [],
            "morePosts": [],
            "currentLoaded": 6,
            "loading": true,
            "pageTitle": '',
            "pageMetaDescription": '',
            'pageMetaImage': ''
        }

    }

    componentDidMount() {
        wordpressAPI.getPage("biblioteca")
            .then(res => {
                this.setState({
                    "pageTitle": res.data[0].yoast_meta.yoast_wpseo_title,
                    "pageMetaDescription": res.data[0].yoast_meta.yoast_wpseo_metadesc,
                    "pageMetaImage": res.data[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                })
                wordpressAPI.getPageACF(res.data[0].id)
                    .then(data => {
                        this.setState({
                            "sessao_3_titulo": data.data.acf.sessao_3_titulo,
                            "sessao_3_texto": data.data.acf.sessao_3_texto,
                            "sessao_3_link_do_botao": data.data.acf.sessao_3_link_do_botao,
                            "sessao_3_imagem": data.data.acf.sessao_3_imagem,
                            "sessao_4_titulo": data.data.acf.sessao_4_titulo,
                            "sessao_4_texto": data.data.acf.sessao_4_texto,
                            "sessao_5_titulo": data.data.acf.sessao_5_titulo,
                        })
                    })
            })
        wordpressAPI.getAllContents(12)
            .then(resp => {
                this.setState({
                    "allContents": [...resp.data.slice(0, 6)],
                    "morePosts": [...resp.data.slice(6, 12)],
                    "offset": 6,
                    "loading": false
                })
            })
    }
    handleNewSearch = () => {
        this.loadMorePosts()
    }
    loadMorePosts = () => {
        wordpressAPI.getAllContents(6, this.state.offset) //offset e per_page
            .then(res => {
                this.setState({
                    "morePosts": [...this.state.morePosts, ...res.data],
                    "loading": false,
                    "offset": this.state.offset + 6,
                    "currentLoaded": res.data.length
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                    <meta name="description" content={this.state.pageMetaDescription} />
                    <meta property="og:title" content={this.state.pageTitle} />
                    <meta property="og:description" content={this.state.pageMetaDescription} />
                    <meta property="og:image" content={this.state.pageMetaImage} />
                </Helmet>

                <FABCategory />

                <Section classSection='filterSearch'>
                    <Container>
                        <div className="filterSearch--box shadow">

                            <FormFilterSearch />


                        </div>
                    </Container>
                </Section>

                <Section classSection='postsOnLibraryPage'>
                    <Container>
                        <Row>
                            <div className="col-md-6">
                                <Link to={this.state.allContents[0] ? `biblioteca/${this.state.allContents[0].slug}` : ''}>
                                    <VerticalCard
                                        classVerticalCard="verticalCard verticalCard__fullWidth"
                                        cardBodyClass='verticalCard--cardBody'
                                        image={this.state.allContents[0] ? this.state.allContents[0]._embedded['wp:featuredmedia'] ? this.state.allContents[0]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        titleClass='font-weight-bold'
                                        ImgVerticalCardClass='verticalCard__halfImgHeight'
                                        title={this.state.allContents[0] ? Substring(this.state.allContents[0].title.rendered, 76) : ''}
                                        text={this.state.allContents[0] ? Substring(this.state.allContents[0].excerpt.rendered, 50) : ''}

                                        loading={this.state.loading}
                                        loaderImgHeight='180'
                                        imgLoaderPrimaryColor="#14576b"
                                        imgLoaderSecondaryColor="#0a2a33"
                                        loaderTextPrimaryColor="#14576b"
                                        loaderTextSecondaryColor="#0a2a33"
                                    />
                                </Link>
                            </div>
                            <div className="col-md-6 d-flex flex-column justify-content-between">
                                <Link to={this.state.allContents[1] ? `biblioteca/${this.state.allContents[1].slug}` : ''}>
                                    <VerticalCard
                                        classVerticalCard="verticalCard verticalCard__fullWidth"
                                        cardBodyClass='verticalCard--cardBody verticalCard--cardBody__orange'
                                        image={this.state.allContents[1] ? this.state.allContents[1]._embedded['wp:featuredmedia'] ? this.state.allContents[1]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        titleClass='font-weight-bold'
                                        ImgVerticalCardClass='verticalCard__smallHeightImg'
                                        title={this.state.allContents[1] ? Substring(this.state.allContents[1].title.rendered, 76) : ''}
                                        text={this.state.allContents[1] ? Substring(this.state.allContents[1].excerpt.rendered, 40) : ''}

                                        loading={this.state.loading}
                                        loaderImgHeight='60'
                                        imgLoaderPrimaryColor="#14576b"
                                        imgLoaderSecondaryColor="#0a2a33"
                                        loaderTextPrimaryColor="#a94d14"
                                        loaderTextSecondaryColor="#f37f38"
                                    />
                                </Link>
                                <Link to={this.state.allContents[2] ? `biblioteca/${this.state.allContents[2].slug}` : ''}>
                                    <VerticalCard
                                        classVerticalCard="verticalCard verticalCard__fullWidth"
                                        cardBodyClass='verticalCard--cardBody verticalCard--cardBody__orange'
                                        image={this.state.allContents[2] ? this.state.allContents[2]._embedded['wp:featuredmedia'] ? this.state.allContents[2]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        titleClass='font-weight-bold'
                                        ImgVerticalCardClass='verticalCard__smallHeightImg'
                                        title={this.state.allContents[2] ? Substring(this.state.allContents[2].title.rendered, 76) : ''}
                                        text={this.state.allContents[2] ? Substring(this.state.allContents[2].excerpt.rendered, 40) : ''}

                                        loading={this.state.loading}
                                        loaderImgHeight='60'
                                        imgLoaderPrimaryColor="#14576b"
                                        imgLoaderSecondaryColor="#0a2a33"
                                        loaderTextPrimaryColor="#a94d14"
                                        loaderTextSecondaryColor="#f37f38"
                                    />
                                </Link>


                            </div>

                        </Row>


                        <Row classWithRow='pt-4'>
                            <div className="col-md-4">
                                <Link to={this.state.allContents[3] ? `biblioteca/${this.state.allContents[3].slug}` : ''}>
                                    <VerticalCard
                                        classVerticalCard="verticalCard verticalCard__fullWidth"
                                        cardBodyClass='verticalCard--cardBody verticalCard--cardBody__green'
                                        ImgVerticalCardClass='verticalCard__smallHeightImg'
                                        image={this.state.allContents[3] ? this.state.allContents[3]._embedded['wp:featuredmedia'] ? this.state.allContents[3]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        titleClass='font-weight-bold'
                                        title={this.state.allContents[3] ? Substring(this.state.allContents[3].title.rendered, 76) : ''}
                                        text={this.state.allContents[3] ? Substring(this.state.allContents[3].excerpt.rendered, 40) : ''}

                                        loading={this.state.loading}
                                        loaderImgHeight='100'
                                        imgLoaderPrimaryColor="#14576b"
                                        imgLoaderSecondaryColor="#0a2a33"
                                        loaderTextPrimaryColor="#4e9a40"
                                        loaderTextSecondaryColor="#6eb960"
                                    />
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={this.state.allContents[4] ? `biblioteca/${this.state.allContents[4].slug}` : ''}>
                                    <VerticalCard
                                        classVerticalCard="verticalCard verticalCard__fullWidth"
                                        cardBodyClass='verticalCard--cardBody verticalCard--cardBody__green'
                                        ImgVerticalCardClass='verticalCard__smallHeightImg'
                                        image={this.state.allContents[4] ? this.state.allContents[4]._embedded['wp:featuredmedia'] ? this.state.allContents[4]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        titleClass='font-weight-bold'
                                        title={this.state.allContents[4] ? Substring(this.state.allContents[4].title.rendered, 76) : ''}
                                        text={this.state.allContents[4] ? Substring(this.state.allContents[4].excerpt.rendered, 50) : ''}

                                        loading={this.state.loading}
                                        loaderImgHeight='100'
                                        imgLoaderPrimaryColor="#14576b"
                                        imgLoaderSecondaryColor="#0a2a33"
                                        loaderTextPrimaryColor="#4e9a40"
                                        loaderTextSecondaryColor="#6eb960"
                                    />
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={this.state.allContents[5] ? `biblioteca/${this.state.allContents[5].slug}` : ''}>
                                    <VerticalCard
                                        classVerticalCard="verticalCard verticalCard__fullWidth"
                                        cardBodyClass='verticalCard--cardBody verticalCard--cardBody__green'
                                        ImgVerticalCardClass='verticalCard__smallHeightImg'
                                        image={this.state.allContents[5] ? this.state.allContents[5]._embedded['wp:featuredmedia'] ? this.state.allContents[5]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        titleClass='font-weight-bold'
                                        title={this.state.allContents[5] ? Substring(this.state.allContents[5].title.rendered, 76) : ''}
                                        text={this.state.allContents[5] ? Substring(this.state.allContents[5].excerpt.rendered, 50) : ''}

                                        loading={this.state.loading}
                                        loaderImgHeight='100'
                                        imgLoaderPrimaryColor="#14576b"
                                        imgLoaderSecondaryColor="#0a2a33"
                                        loaderTextPrimaryColor="#4e9a40"
                                        loaderTextSecondaryColor="#6eb960"
                                    />
                                </Link>
                            </div>
                        </Row>
                        {console.log(this.state.morePosts)}
                        <PostsWithLoadMore
                            items={this.state.morePosts}
                            handleNewSearch={this.handleNewSearch}
                            loaded={this.state.currentLoaded}
                            whatIsChildComponent='SimpleHorizontalCard'
                        />
                    </Container>
                </Section>

                <Section classSection='brazilianMagazine'>
                    <Container classWithContainer='shadow brazilianMagazine--container'>
                        <Row>
                            <div className="brazilianMagazine--leftColumn d-flex justify-content-center align-items-center col-md-7">
                                <TitleTextBtn
                                    titleTextBtnClass='classTitleTextBtn d-flex flex-column'
                                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__intermediatedWidth'
                                    title={this.state.sessao_3_titulo}
                                    classText='classTitleTextBtn--text'
                                    text={this.state.sessao_3_texto}
                                    hasBtn='true'
                                    isLink='true'
                                    classButton='classTitleTextBtn--btn classTitleTextBtn--btn__textWhite classTitleTextBtn--btn__orange classTitleTextBtn--btn__bgHoverOrange mr-md-auto btn'
                                    pathLink={this.state.sessao_3_link_do_botao}
                                    textButtom='Leia mais' />
                            </div>
                            <div className="brazilianMagazine--rightColumn d-flex justify-content-center align-items-center col-md-5">
                                <img className='brazilianMagazine--img img-fluid' src={this.state.sessao_3_imagem} alt="" />
                            </div>
                        </Row>
                    </Container>
                </Section>

                <AccessToExplanatoryVideos
                    title={this.state.sessao_4_titulo}
                    text={this.state.sessao_4_texto}
                />

                <NotesAndExpressions />

            </React.Fragment>
        )
    }
}