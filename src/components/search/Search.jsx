import React, { Component } from 'react'
import Container from '../generics/small-components/Container'
import Row from '../generics/small-components/Row'
import Section from '../generics/small-components/Section'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import CardHorizontal from '../generics/components-groups/CardHorizontal'
import * as wordpressAPI from '../../main/wordpressAPI'
import Substring from '../generics/small-components/Substring'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default class CategorySearch extends Component {
    state = {
        "loading": true,
        "title": '',
        "content": '',
        "imagem": '',
        "posts": [],
        "relatedPosts": [],
        "hasSearch": false,
        "categorias": [],
        "slug": '',

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
        }
        this.getCategories()
        wordpressAPI.getPosts('posts', 4, 0)
            .then(res => {
                this.setState({
                    "relatedPosts": [...res.data]
                })
            })

    }



    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.state.hasSearch ? 'IBDU | Pesquisa' : 'IBDU | Categoria'}</title>
                    <meta name="description" content="" />
                </Helmet>

                <Section classSection='categorySearch'>
                    <Container>
                        <Row>
                            <h2 className='categorySearch--title'>Resultado da pesquisa</h2>
                        </Row>

                    </Container>
                    <Container>
                        <Row>
                            <div className="col-md-12 col-lg-9 d-md-flex flex-wrap pr-lg-5 mb-lg-5">
                                {
                                    this.state.posts.map(item =>
                                        <CardHorizontal
                                            cardClass='cardHorizontal d-flex flex-column flex-lg-row mt-lg-3 shadow'
                                            imgClass='cardHorizontal--imgClass'
                                            dadOfImg='cardHorizontal--cardImg cardHorizontal--cardImg__small'
                                            cardBodyClass='cayrdHorizontal--cardBod cardHorizontal--cardBody__small'

                                            image={item.image}
                                            titleTextBtnClass='classTitleTextBtn  d-flex flex-column align-items-center align-items-md-start'
                                            classTitle='classTitleTextBtn--title classTitleTextBtn--title__smallFont mb-2'
                                            title={Substring(item.title, 70)}
                                            classText='classTitleTextBtn--text mb-2'
                                            text={item.text ? Substring(item.text, 150) : ''}
                                            hasBtn='true'
                                            classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__txtHoverBlue font-weight-bold pl-0'
                                            pathLink={item.slug}
                                            hasMetaDate={false}
                                            textButtom='Acesse a página'
                                        />
                                    )
                                }


                            </div>
                            <div className="col-md-12 col-lg-3 newsSidebar">
                                <Row>
                                    <div className="shadow">
                                        <h3 className='newsSidebar--title '>Posts Relacionados</h3>
                                        <div className='w-100 d-flex flex-wrap p-3'>
                                            {this.state.relatedPosts.map(post =>
                                                <div className="ItemBoxSidebar mt-4 mb-0">
                                                    <Link to={`noticia/${post.slug}`} style={{width: '100%'}} >
                                                        <img src={post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : ''} className='img-fluid' alt="" />
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