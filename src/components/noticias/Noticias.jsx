import React, { Component } from 'react'
import Container from '../generics/small-components/Container'
import Row from '../generics/small-components/Row'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import Section from '../generics/small-components/Section'
import VerticalCard from '../generics/components-groups/VerticalCard'
import CardHorizontal from '../generics/components-groups/CardHorizontal';
import PostsWithLoadMore from '../generics/components-groups/PostsWithLoadMore'
import imagePlaceholder from '../generics/small-components/imagePlaceholder'
import * as wordpressAPI from '../../main/wordpressAPI'
import Substring from '../generics/small-components/Substring'
import { Helmet } from 'react-helmet'
import AceessToManyNotices from '../generics/components-groups/AccessToManyNotices'
import { Link } from 'react-router-dom'

export default class Noticias extends Component {
    state = {
        "sessao_1_slide": [],
        "posts": [],
        "morePosts": [],
        "artigos": [],
        "offset": 0,
        "loading": true,
        "pageTitle": '',
        "currentLoaded": 6,
        "pageMetaDescription": '',
        'pageMetaImage': ''

    }

    componentDidMount() {
        wordpressAPI.getPage("noticias")
            .then(res => {
                this.setState({
                    "pageTitle": res.data[0].yoast_meta.yoast_wpseo_title,
                    "pageMetaDescription": res.data[0].yoast_meta.yoast_wpseo_metadesc,
                    "pageMetaImage": res.data[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                })
                wordpressAPI.getPageACF(res.data[0].id)
                    .then(data => {
                        this.setState({
                            "sessao_1_slide": [...data.data.acf.sessao_1_slide],
                            "loading": false
                        })
                    })
            })
        wordpressAPI.getPosts('posts', 16)
            .then(res => {
                this.setState({
                    "posts": [...res.data.slice(0, 10)],
                    "morePosts": [...res.data.slice(10, 16)],
                    "loading": false,
                    "offset": 16
                })
            })
    }
    handleNewSearch = () => {
        this.loadMorePosts()
    }
    loadMorePosts = () => {
        wordpressAPI.getPosts('posts', 6, this.state.offset)
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
                <meta name="description" content={this.state.pageMetaDescription}/>
                <meta property="og:title" content={this.state.pageTitle} />
                <meta property="og:description" content={this.state.pageMetaDescription}/>
                <meta property="og:image" content={this.state.pageMetaImage}/>
            </Helmet>


                <AceessToManyNotices />

                <Section classSection='notices'>
                    <Container>
                        <Row>
                            <div className="col-md-8">
                                <Link to={this.state.posts[0] ? `noticias/${this.state.posts[0].slug}` : ''} >
                                    <div className='featuredImage'>
                                        <img src={this.state.posts[0] ? this.state.posts[0]._embedded['wp:featuredmedia'] ? this.state.posts[0]._embedded['wp:featuredmedia'][0].source_url : imagePlaceholder : imagePlaceholder} className='featuredImage--image img-fluid' alt="" />
                                        <TitleTextBtn
                                            titleTextBtnClass='classTitleTextBtn col-md-11 pl-sm-4 p-0 d-flex flex-column ml-0'
                                            classTitle='classTitleTextBtn--title classTitleTextBtn--title__white classTitleTextBtn--title__halfWidth'
                                            title={this.state.posts[0] ? Substring(this.state.posts[0].title.rendered, 50) : ''}
                                            classText='classTitleTextBtn--text classTitleTextBtn--text__white'
                                            text={this.state.posts[0] ? Substring(this.state.posts[0].excerpt.rendered, 202) : ''}
                                            hasBtn='false'
                                        />
                                    </div>
                                </Link>
                                <CardHorizontal
                                    cardClass='cardHorizontal d-flex flex-column flex-lg-row mt-lg-3 shadow'
                                    imgClass='cardHorizontal--imgClass cardHorizontal--imgClass__autoWidth'
                                    dadOfImg='cardHorizontal--cardImg cardHorizontal--cardImg__small'
                                    cardBodyClass='cayrdHorizontal--cardBod cardHorizontal--cardBody__small'
                                    image={this.state.posts[1] ? this.state.posts[1]._embedded['wp:featuredmedia'] ? this.state.posts[1]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                    titleTextBtnClass='classTitleTextBtn  d-flex flex-column align-items-center align-items-md-start'
                                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__smallFont mb-2'
                                    title={this.state.posts[1] ? Substring(this.state.posts[1].title.rendered, 75) : ''}
                                    classText='classTitleTextBtn--text mb-2'
                                    text={this.state.posts[1] ? Substring(this.state.posts[1].excerpt.rendered, 130) : ''}
                                    hasBtn='true'
                                    classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__txtHoverBlue font-weight-bold pl-0'
                                    pathLink={this.state.posts[1] ? `noticias/${this.state.posts[1].slug}` : ''}
                                    textButtom='Acesse a página'
                                />
                                <CardHorizontal
                                    cardClass='cardHorizontal d-flex flex-column flex-lg-row mt-lg-3 shadow'
                                    dadOfImg='cardHorizontal--cardImg cardHorizontal--cardImg__small'
                                    imgClass='cardHorizontal--imgClass cardHorizontal--imgClass__autoWidth'
                                    image={this.state.posts[2] ? this.state.posts[2]._embedded['wp:featuredmedia'] ? this.state.posts[2]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                    cardBodyClass='cayrdHorizontal--cardBod cardHorizontal--cardBody__small'
                                    titleTextBtnClass='classTitleTextBtn  d-flex flex-column align-items-center align-items-md-start'
                                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__smallFont mb-2'
                                    title={this.state.posts[2] ? Substring(this.state.posts[2].title.rendered, 75) : ''}
                                    classText='classTitleTextBtn--text mb-2'
                                    text={this.state.posts[2] ? Substring(this.state.posts[2].excerpt.rendered, 130) : ''}
                                    hasBtn='true'
                                    classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__txtHoverBlue font-weight-bold pl-0'
                                    pathLink={this.state.posts[2] ? `noticias/${this.state.posts[2].slug}` : ''}
                                    textButtom='Acesse a página'
                                />
                                <CardHorizontal
                                    cardClass='cardHorizontal d-flex flex-column flex-lg-row mt-lg-3 shadow'
                                    dadOfImg='cardHorizontal--cardImg cardHorizontal--cardImg__small'
                                    imgClass='cardHorizontal--imgClass cardHorizontal--imgClass__autoWidth'
                                    image={this.state.posts[3] ? this.state.posts[3]._embedded['wp:featuredmedia'] ? this.state.posts[3]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                    cardBodyClass='cayrdHorizontal--cardBod cardHorizontal--cardBody__small'
                                    titleTextBtnClass='classTitleTextBtn  d-flex flex-column align-items-center align-items-md-start'
                                    classTitle='classTitleTextBtn--title classTitleTextBtn--title__smallFont mb-2'
                                    title={this.state.posts[3] ? Substring(this.state.posts[3].title.rendered, 75) : ''}
                                    classText='classTitleTextBtn--text mb-2'
                                    text={this.state.posts[3] ? Substring(this.state.posts[3].excerpt.rendered, 130) : ''}
                                    hasBtn='true'
                                    classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__txtHoverBlue font-weight-bold pl-0'
                                    pathLink={this.state.posts[3] ? `noticias/${this.state.posts[3].slug}` : ''}
                                    textButtom='Acesse a página'
                                />
                            </div>

                            <div className="notices--sidebar col-md-4">

                                <Link to={this.state.posts[4] ? `noticias/${this.state.posts[4].slug}` : ''} >
                                    <VerticalCard
                                        classVerticalCard="verticalCard verticalCard__fullWidth"
                                        ImgVerticalCardClass="verticalCard__smallHeightImg"
                                        image={this.state.posts[4] ? this.state.posts[4]._embedded['wp:featuredmedia'] ? this.state.posts[4]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        title={this.state.posts[4] ? Substring(this.state.posts[4].title.rendered, 60) : ''}
                                        cardBodyClass='verticalCard--cardBody'
                                        text={this.state.posts[4] ? Substring(this.state.posts[4].excerpt.rendered, 75) : ''}
                                    />
                                </Link>
                                <Link to={this.state.posts[5] ? `noticias/${this.state.posts[5].slug}` : ''} >
                                    <VerticalCard
                                        classVerticalCard="verticalCard verticalCard__fullWidth mt-3"
                                        ImgVerticalCardClass="verticalCard__smallHeightImg"
                                        image={this.state.posts[5] ? this.state.posts[5]._embedded['wp:featuredmedia'] ? this.state.posts[5]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        title={this.state.posts[5] ? Substring(this.state.posts[5].title.rendered, 60) : ''}
                                        cardBodyClass='verticalCard--cardBody'
                                        text={this.state.posts[5] ? Substring(this.state.posts[5].excerpt.rendered, 75) : ''}
                                    />
                                </Link>
                                <Link to={this.state.posts[6] ? `noticias/${this.state.posts[6].slug}` : ''} >
                                    <VerticalCard
                                        classVerticalCard="verticalCard verticalCard__fullWidth mt-3"
                                        ImgVerticalCardClass="verticalCard__smallHeightImg"
                                        image={this.state.posts[6] ? this.state.posts[6]._embedded['wp:featuredmedia'] ? this.state.posts[6]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        title={this.state.posts[6] ? Substring(this.state.posts[6].title.rendered, 60) : ''}
                                        cardBodyClass='verticalCard--cardBody'
                                        text={this.state.posts[6] ? Substring(this.state.posts[6].excerpt.rendered, 75) : ''}
                                    />
                                </Link>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-4">
                                <Link to={this.state.posts[7] ? `noticias/${this.state.posts[7].slug}` : ''} >
                                    <VerticalCard
                                        classVerticalCard="verticalCard shadow verticalCard__fullWidth mt-3"
                                        ImgVerticalCardClass="verticalCard__smallHeightImg"
                                        image={this.state.posts[7] ? this.state.posts[7]._embedded['wp:featuredmedia'] ? this.state.posts[7]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        titleClass='verticalCard--title__orange font-weight-bold'
                                        title={this.state.posts[7] ? Substring(this.state.posts[7].title.rendered, 65) : ''}
                                        cardBodyClass='verticalCard--cardBody verticalCard--cardBody__white'
                                        textClass='verticalCard--text__blue'
                                        text={this.state.posts[7] ? Substring(this.state.posts[7].excerpt.rendered, 80) : ''}
                                    />
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={this.state.posts[8] ? `noticias/${this.state.posts[8].slug}` : ''} >
                                    <VerticalCard
                                        classVerticalCard="verticalCard shadow verticalCard__fullWidth mt-3"
                                        ImgVerticalCardClass="verticalCard__smallHeightImg"
                                        image={this.state.posts[8] ? this.state.posts[8]._embedded['wp:featuredmedia'] ? this.state.posts[8]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        titleClass='verticalCard--title__orange font-weight-bold'
                                        title={this.state.posts[8] ? Substring(this.state.posts[8].title.rendered, 65) : ''}
                                        cardBodyClass='verticalCard--cardBody verticalCard--cardBody__white'
                                        textClass='verticalCard--text__blue'
                                        text={this.state.posts[8] ? Substring(this.state.posts[8].excerpt.rendered, 80) : ''}
                                    />
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={this.state.posts[9] ? `noticias/${this.state.posts[9].slug}` : ''} >
                                    <VerticalCard
                                        classVerticalCard="verticalCard shadow verticalCard__fullWidth mt-3"
                                        ImgVerticalCardClass="verticalCard__smallHeightImg"
                                        image={this.state.posts[9] ? this.state.posts[9]._embedded['wp:featuredmedia'] ? this.state.posts[9]._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                                        titleClass='verticalCard--title__orange font-weight-bold'
                                        title={this.state.posts[9] ? Substring(this.state.posts[9].title.rendered, 65) : ''}
                                        cardBodyClass='verticalCard--cardBody verticalCard--cardBody__white'
                                        textClass='verticalCard--text__blue'
                                        text={this.state.posts[9] ? Substring(this.state.posts[9].excerpt.rendered, 80) : ''}
                                    />
                                </Link>
                            </div>

                        </Row>
                        <PostsWithLoadMore
                            items={this.state.morePosts}
                            handleNewSearch={this.handleNewSearch}
                            loaded={this.state.currentLoaded}
                            whatIsChildComponent='SimpleHorizontalCard'
                        />

                    </Container>
                </Section>


            </React.Fragment>
        )
    }

}
