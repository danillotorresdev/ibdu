import React, { Component } from 'react'
import Container from '../generics/small-components/Container'
import Row from '../generics/small-components/Row'
import Section from '../generics/small-components/Section'
import Button from '../generics/small-components/Button'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import VerticalCard from '../generics/components-groups/VerticalCard'
import * as wordpressAPI from '../../main/wordpressAPI'
import { Helmet } from 'react-helmet'
import Substring from '../generics/small-components/Substring'
import { Link } from 'react-router-dom'
import imagePlaceholder from '../generics/small-components/imagePlaceholder'
import FABCategory from '../generics/small-components/FABCategory'
import { LoaderTitleBlog, LoaderContentBlog, LoaderImgWithLines } from '../generics/small-components/Loaders'


export default class NoticiaAberta extends Component {

    state = {
        "loading": true,
        "title": '',
        "content": '',
        "imagem": '',
        "posts": [],
        "banner_do_post": '',
        "slug": '',
        "pageTitle": '',
        "pageMetaDescription": '',
        "FABVisibility": false
    }

    getBanner(res) {
        wordpressAPI.getPageACF(res[0].id)
            .then(data => {
                this.setState({
                    "banner_do_post": data.data.acf.banner_do_post ? data.data.acf.banner_do_post : this.state.banner_do_post,
                    "loading": false
                })
            })
    }
    fetchData() {
        if (this.props.match.url.includes('eventos')) {
            wordpressAPI.getEvento(this.props.match.params.handle)
                .then(res =>
                    this.setState({
                        "title": res.data[0].title.rendered,
                        "content": res.data[0].content.rendered,
                        "slug": res.data[0].slug,
                        "loading": false
                    })
                )
            wordpressAPI.getPosts('posts', 4, 0)
                .then(res => {

                    this.setState({
                        "posts": [...res.data]
                    })
                })
        }
        if (this.props.match.url.includes('opinioes')) {
            wordpressAPI.getOpinion(this.props.match.params.handle)
                .then(res =>
                    this.setState({
                        "title": res.data[0].title.rendered,
                        "content": res.data[0].content.rendered,
                        "slug": res.data[0].slug,
                        "loading": false
                    })
                )
            wordpressAPI.getPosts('posts', 4, 0)
                .then(res => {

                    this.setState({
                        "posts": [...res.data]
                    })
                })
        }
        if (this.props.match.url.includes('disseminacao_e_informacao')) {

            wordpressAPI.getDissemination(this.props.match.params.handle)
                .then(res =>
                    this.setState({
                        "title": res.data[0].title.rendered,
                        "content": res.data[0].content.rendered,
                        "slug": res.data[0].slug,
                        "loading": false
                    })
                )
            wordpressAPI.getPosts('posts', 4, 0)
                .then(res => {

                    this.setState({
                        "posts": [...res.data]
                    })
                })
        }
        if (this.props.match.url.includes('notas')) {

            wordpressAPI.getNote(this.props.match.params.handle)
                .then(res =>
                    this.setState({
                        "title": res.data[0].title.rendered,
                        "content": res.data[0].content.rendered,
                        "slug": res.data[0].slug,
                        "pageTitle": res.data[0].yoast_meta.yoast_wpseo_title,
                        "pageMetaDescription": res.data[0].yoast_meta.yoast_wpseo_metadesc,
                        "loading": false
                    })
                )
            wordpressAPI.getPosts('posts', 4, 0)
                .then(res => {

                    this.setState({
                        "posts": [...res.data]
                    })
                })
        }
        if (this.props.match.url.includes('noticias')) {
            wordpressAPI.getPost(`${this.props.match.params.handle}`)
                .then(res => {
                    this.setState({
                        "title": res[0].title.rendered,
                        "content": res[0].content.rendered,
                        "slug": res[0].slug,
                        "loading": false,
                        "banner_do_post": res[0]._embedded['wp:featuredmedia'] ? res[0]._embedded['wp:featuredmedia'][0].source_url : '',
                        "pageTitle": res[0].yoast_meta.yoast_wpseo_title,
                        "pageMetaDescription": res[0].yoast_meta.yoast_wpseo_metadesc
                    })
                    this.getBanner(res)
                })
            wordpressAPI.getPosts('posts', 4, 0)
                .then(res => {

                    this.setState({
                        "posts": [...res.data]
                    })
                })

        } else if (this.props.match.url.includes('video-explicativo')) {
            wordpressAPI.getCustomPost('video_explicativo', `${this.props.match.params.handle}&_embed`)
                .then(res => {
                    const data = res[0]
                    this.setState({
                        "title": data.title.rendered,
                        "content": data.content.rendered,
                        "slug": res[0].slug,
                        "loading": false,
                        "pageTitle": data.yoast_meta.yoast_wpseo_title,
                        "pageMetaDescription": data.yoast_meta.yoast_wpseo_metadesc
                    })
                    this.getBanner(res)
                    wordpressAPI.getPosts('posts', 4, 0)
                        .then(res => {

                            this.setState({
                                "posts": [...res.data]
                            })
                        })
                })
        } else if (this.props.match.url.includes('biblioteca')) {
            wordpressAPI.getCustomPost('conteudo', `${this.props.match.params.handle}&_embed`)
                .then(res => {
                    const data = res[0]
                    this.setState({
                        "title": data.title.rendered,
                        "content": data.content.rendered,
                        "slug": res[0].slug,
                        "loading": false,
                        "pageTitle": data.yoast_meta.yoast_wpseo_title,
                        "pageMetaDescription": data.yoast_meta.yoast_wpseo_metadesc,
                        "FABVisibility": true
                    })
                    this.getBanner(res)
                    wordpressAPI.getPosts('conteudo', 4, 0)
                        .then(res => {
                            this.setState({
                                "posts": [...res.data]
                            })
                        })
                })
        }
    }
    componentDidMount() {

        this.fetchData()
    }
    componentDidUpdate() {

        if (this.props.match.params.handle !== this.state.slug) {
            this.fetchData()
        }
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                    <meta name="description" content={this.state.pageMetaDescription}/>
                    <meta property="og:title" content={this.state.pageTitle} />
                    <meta property="og:description" content={this.state.pageMetaDescription}/>
                    <meta property="og:image" content={this.state.banner_do_post}/>
                </Helmet>

                {this.state.FABVisibility && <FABCategory />}
                <Section classSection='news'>

                    <Container>
                        <Row>
                            <img src={this.state.banner_do_post} className='img-fluid singleFluidPost' alt="" />
                        </Row>

                    </Container>
                    <Container>
                        <Row>
                            <div className="col-md-12 col-lg-9">
                                <Container>
                                    <LoaderTitleBlog
                                        loading={this.state.loading}
                                        loaderPrimaryColor="#ccc"
                                        loaderSecondaryColor="#bdbcbc"
                                        contentHeight="10"
                                        contentWidth="100"
                                        rectWidthText="70"
                                        rectHeightText="1.6"
                                    >
                                        <Row>
                                            <h1 className='news--title font-weight-bold'>{this.state.title}</h1>
                                        </Row>
                                    </LoaderTitleBlog>
                                </Container>
                                <Container>
                                    <Row classWithRow='news--sharedButtons'>
                                        <Button
                                            classBtn='buttom buttom__smallFont buttom__royalBlue btn mr-lg-2'
                                            path={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${window.location.href}%2F&display=popup&ref=plugin&src=share_button`}
                                            txtButtom='Compartilhar no facebook'
                                            isLink={true}
                                        />

                                        <Button
                                            classBtn='buttom buttom__smallFont buttom__lightBlue btn mr-lg-2'
                                            path={`https://twitter.com/intent/tweet?text=${window.location.href}`}
                                            txtButtom='Compartilhar no twitter'
                                            isLink={true}
                                        />
                                        <Button
                                            classBtn='buttom buttom__smallFont btn'
                                            path={`https://www.linkedin.com/cws/share?url=${window.location.href}&original_referer=https%3A%2F%2Fdeveloper.linkedin.com%2Fetc%2Fdesigns%2Flinkedin%2Fkaty%2Fglobal%2Fclientlibs%2Fhtml%2Fsandbox.html%3Falign-class%3Dmiddle-center&token=&isFramed=true&lang=pt_BR&_ts=1539613276635.398&xd_origin_host=${window.location.href}`}
                                            txtButtom='Compartilhar no linkedin'
                                            isLink={true}
                                        />
                                    </Row>
                                </Container>
                                <Container>
                                    <LoaderContentBlog
                                        loading={this.state.loading}
                                        loaderPrimaryColor="#ccc"
                                        loaderSecondaryColor="#bdbcbc"
                                        contentHeight="100"
                                        contentWidth="100"
                                        rectWidthText="100"
                                        rectHeightText=".8"
                                    >
                                        <Row>
                                            <p className='news--textContent' dangerouslySetInnerHTML={{ __html: this.state.content }}></p>
                                        </Row>
                                    </LoaderContentBlog>
                                </Container>
                            </div>
                            <div className="col-md-12 col-lg-3 newsSidebar">
                                <Row>
                                    <div className='shadow'>
                                        <h3 className='newsSidebar--title pt-4 pl-4'>Posts Relacionados</h3>
                                        <div className='w-100 p-3 d-flex flex-lg-column flex-wrap' style={{ minHeight: '800px', minWidth: '285px' }}>
                                            <LoaderImgWithLines
                                                loading={this.state.loading}
                                                loaderPrimaryColor="#ccc"
                                                loaderSecondaryColor="#bdbcbc"
                                                contentHeight="100%"
                                                contentWidth="100%"
                                                height='900'
                                                width='253'
                                                rectWidth='100%'
                                                rectHeight='216'
                                                rectWidthText="250"
                                                rectHeightText="7"
                                            >
                                                <div className="sidebarLoader"></div>
                                            </LoaderImgWithLines>
                                            {this.state.posts.map((post, i) =>
                                                <div className="ItemBoxSidebar mt-4 mb-0" key={`noticia_${i}`}>
                                                    {/* tratar este slug */}
                                                    <Link to={post.slug}>


                                                        <img src={post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : imagePlaceholder} className='img-fluid' alt="" />

                                                        <TitleTextBtn
                                                            titleTextBtnClass='classTitleTextBtn'
                                                            classTitle='classTitleTextBtn--title mb-2 mt-4 classTitleTextBtn--title__fontWeightRegular classTitleTextBtn--title__smallFont font-weight-bold'
                                                            title={Substring(post.title.rendered, 35)}
                                                            classText='classTitleTextBtn--text mb-2'
                                                            text={Substring(post.excerpt.rendered, 70)}
                                                            hasBtn='false'
                                                        />

                                                    </Link>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </Row>

                            </div>
                        </Row>
                    </Container>
                </Section >

                <Section classSection='relatedPosts2'>
                    <Container>
                        <Row>
                            <Link className='verticalCard verticalCard__big2' to={this.state.posts[0] ? this.state.posts[0].slug : ''}>
                                <VerticalCard
                                    classVerticalCard=""
                                    cardBodyClass='verticalCard--cardBody'
                                    ImgVerticalCardClass='verticalCard__intermediateHeightImg'
                                    image={this.state.posts[0] ? this.state.posts[0]._embedded['wp:featuredmedia'] ? this.state.posts[0]._embedded['wp:featuredmedia'][0].source_url : imagePlaceholder : ''}
                                    title={this.state.posts[0] ? Substring(this.state.posts[0].title.rendered, 75) : ''}
                                    text={this.state.posts[0] ? Substring(this.state.posts[0].excerpt.rendered, 65) : ''}
                                />
                            </Link>
                            <Link className='verticalCard verticalCard__big2' to={this.state.posts[1] ? this.state.posts[1].slug : ''}>
                                <VerticalCard
                                    classVerticalCard=""
                                    cardBodyClass='verticalCard--cardBody'
                                    ImgVerticalCardClass='verticalCard__intermediateHeightImg'
                                    image={this.state.posts[1] ? this.state.posts[1]._embedded['wp:featuredmedia'] ? this.state.posts[1]._embedded['wp:featuredmedia'][0].source_url : imagePlaceholder : ''}
                                    title={this.state.posts[1] ? Substring(this.state.posts[1].title.rendered, 75) : ''}
                                    text={this.state.posts[1] ? Substring(this.state.posts[1].excerpt.rendered, 65) : ''}
                                />
                            </Link>

                            <Link className='verticalCard verticalCard__big2' to={this.state.posts[2] ? this.state.posts[2].slug : ''}>
                                <VerticalCard
                                    classVerticalCard=""
                                    cardBodyClass='verticalCard--cardBody'
                                    ImgVerticalCardClass='verticalCard__intermediateHeightImg'
                                    image={this.state.posts[2] ? this.state.posts[2]._embedded['wp:featuredmedia'] ? this.state.posts[2]._embedded['wp:featuredmedia'][0].source_url : imagePlaceholder : ''}
                                    title={this.state.posts[2] ? Substring(this.state.posts[2].title.rendered, 75) : ''}
                                    text={this.state.posts[2] ? Substring(this.state.posts[2].excerpt.rendered, 65) : ''}
                                />
                            </Link>

                        </Row>
                    </Container>
                </Section>
            </React.Fragment >


        )
    }
}
