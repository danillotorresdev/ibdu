import React, { Component } from 'react'
import Container from '../generics/small-components/Container'
import Row from '../generics/small-components/Row'
import Section from '../generics/small-components/Section'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import * as wordpressAPI from '../../main/wordpressAPI'
import Substring from '../generics/small-components/Substring'
import { Link } from 'react-router-dom'
import FormFilterSearch from '../generics/small-components/FormFilterSearch';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import FABCategory from '../generics/small-components/FABCategory'
import PostsWithLoadMore from '../generics/components-groups/PostsWithLoadMore'
import imagePlaceholder from '../generics/small-components/imagePlaceholder'

export default class CategorySearch extends Component {
    state = {
        "loading": true,
        "title": '',
        "content": '',
        "imagem": '',
        "posts": [],
        "morePosts": [],
        "relatedPosts": [],
        "hasSearch": false,
        "categorias": [],
        "slug": '',
        "FABVisibility": false,
        "offset": 4,
        "currentLoaded": 6
    }
    getDate(postDate) {
        let time = new Date(postDate)
        let current_date = `${time.getDate()}/${time.getMonth() + 1}`;
        return current_date
    }


    fetchData = () => {
        if (this.props.match.url.includes('categorias')) {
            wordpressAPI.getCurrentCategory(this.props.match.params.handle)
                .then(
                    axios.spread((conteudoID, postsId) => {
                        postsId.data.length !== 0 && (
                            wordpressAPI.getCustomPosts('posts', 'categories', postsId.data[0].id, 4)
                                .then(res => {
                                    res && (
                                        this.setState({
                                            "posts": [...this.state.posts, ...res]
                                        })
                                    )
                                    wordpressAPI.getPosts('post', 4, 0)
                                        .then(res => {
                                            this.setState({
                                                "relatedPosts": [...res.data]
                                            })
                                        })
                                }

                                )

                        )
                        conteudoID.data.length !== 0 && (
                            wordpressAPI.getCustomPosts('conteudo', 'categorias', conteudoID.data[0].id, 4)
                                .then(res => {
                                    res && (
                                        this.setState({
                                            "posts": [...this.state.posts, ...res],
                                            "loading": false,
                                            "FABVisibility": true
                                        })
                                    )

                                    wordpressAPI.getPosts('post', 4, 0)
                                        .then(res => {
                                            this.setState({
                                                "relatedPosts": [...res.data]
                                            })
                                        })
                                })
                        )


                    }))
        }
    }

    getCategories = () => {
        wordpressAPI.getContentCategories()
            .then(res =>
                this.setState({
                    "categorias": [...res.data]
                })
            )
    }

    componentDidMount() {
        this.setState({ posts: [] })
        if (typeof (this.props.location.state) !== 'undefined') {
            this.setState({
                posts: [...this.props.location.state.results],
                hasSearch: true,
                slug: this.props.match.params.handle
            })
        } else {
            this.setState(({
                slug: this.props.match.params.handle
            }))
            this.fetchData()
        }
        this.getCategories()
        wordpressAPI.getPosts('posts', 4, 0)
            .then(res => {
                this.setState({
                    "relatedPosts": [...res.data]
                })
            })

    }
    fetchParams = () => {
        if (typeof (this.props.location.state) === 'undefined') {
            if (this.props.match.params.handle !== this.state.slug) {

                this.setState(({
                    slug: this.props.match.params.handle,
                    posts: []
                }), this.fetchData())
            }

        }
    }

    componentDidUpdate = () => {
        this.fetchParams()
    }
    componentWillReceiveProps = () => {
        this.fetchParams()
    }
    handleNewSearch = (results) => {
        this.setState({
            posts: [...results]
        })
    }
    handleLoadNewSearch = () => {
        this.loadMorePosts()
    }
    loadMorePosts = () => {
        wordpressAPI.getCurrentCategory(this.props.match.params.handle)
            .then(
                axios.spread((conteudoID, postsId) => {
                    conteudoID.data.length !== 0 && (
                        wordpressAPI.getAllContentsFromCategory(this.state.offset, conteudoID.data[0].id, 6)
                            .then(res => {
                                res && (
                                    this.setState({
                                        "posts": [...this.state.posts, ...res.data],
                                        "loading": false,
                                        "FABVisibility": true,
                                        "offset": this.state.offset + 6,
                                        "currentLoaded": res.data.length
                                    })
                                )

                            })
                    )


                }))


    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.state.hasSearch ? 'IBDU | Pesquisa' : 'IBDU | Categoria'}</title>
                    <meta name="description" content="" />
                </Helmet>
                {this.state.FABVisibility && <FABCategory />}
                {this.state.hasSearch && <Section classSection='filterSearch'>
                    <Container>
                        <div className="filterSearch--box shadow">
                            <FormFilterSearch handleNewSearch={this.handleNewSearch} />
                        </div>
                    </Container>
                </Section>}
                <Section classSection='categorySearch'>
                    <Container>
                        <Row>
                            <h2 className='categorySearch--title'>Resultado da pesquisa</h2>
                        </Row>

                    </Container>
                    <Container>
                        <Row>
                            <div className="col-md-12 col-lg-9 pr-lg-5 mb-lg-5">


                                <PostsWithLoadMore
                                    items={this.state.posts}
                                    handleNewSearch={this.handleLoadNewSearch}
                                    loaded={this.state.currentLoaded}
                                    whatIsChildComponent='CardHorizontal'
                                />

                            </div>
                            <div className="col-md-12 col-lg-3 mt-md-3 mt-lg-0 newsSidebar">
                                <Row>
                                    <div className="shadow">
                                        <h3 className='newsSidebar--title pt-3 pl-3'>Posts Relacionados</h3>
                                        <div className='w-100 p-3 d-flex flex-wrap'>
                                            {this.state.relatedPosts.map(post =>
                                                <div className="ItemBoxSidebar mt-4 mb-0">
                                                    <Link to={`/noticias/${post.slug}`} className='cardLink' >
                                                        <img src={post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : imagePlaceholder} className='img-fluid' alt="" />
                                                        <TitleTextBtn
                                                            titleTextBtnClass='classTitleTextBtn'
                                                            classTitle='classTitleTextBtn--title mb-2 mt-4 classTitleTextBtn--title__fontWeightRegular classTitleTextBtn--title__smallFont font-weight-bold'
                                                            title={Substring(post.title.rendered, 40)}
                                                            classText='classTitleTextBtn--text mb-2'
                                                            text={Substring(post.excerpt.rendered, 80)}
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


            </React.Fragment>

        )
    }
}