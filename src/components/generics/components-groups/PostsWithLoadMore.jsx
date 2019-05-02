import React, { Component } from 'react'
import Row from '../small-components/Row'
import SimpleHorizontalCard from '../components-groups/SimpleHorizontalCard'
import CardHorizontal from '../components-groups/CardHorizontal'
import Substring from '../small-components/Substring'
import { Link } from 'react-router-dom'

export default class itemsWithLoadMore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            error: false
        }
        this.whatIsChildComponent = this.whatIsChildComponent.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }
    getDate(postDate) {
        let time = new Date(postDate)
        let current_date = `${time.getDate()}/${time.getMonth() + 1}`;
        return current_date
    }
    loadMore() {
        this.props.handleNewSearch()
    }

    slugValidation(item) {
        if (window.location.href.includes('biblioteca')) {
            return `/biblioteca/${item.slug}`
        } else if (window.location.href.includes('noticias')) {
            return `/noticias/${item.slug}`
        }
        else if (window.location.href.includes('categorias')) {
            return `/categorias/${item.slug}`
        }
    }
    whatIsChildComponent(component) {
        if (component === 'SimpleHorizontalCard') {
            return (
                this.props.items.map((item, index) => (
                    // aqui estava um col-md-6
                    <Link className="col-md-6" to={this.slugValidation(item)} style={{width: '100%'}}>

                        <SimpleHorizontalCard
                            title={Substring(item.title.rendered, 120)}
                            description={Substring(item.excerpt.rendered, 60)}
                            link={this.slugValidation(item)}
                        />

                    </Link>
                ))
            );
        } else if (component === 'CardHorizontal') {
            return (
                this.props.items.map(item =>

                    <CardHorizontal
                        cardClass='cardHorizontal d-flex flex-column flex-lg-row mt-lg-3 shadow'
                        imgClass='cardHorizontal--imgClass'
                        dadOfImg='cardHorizontal--cardImg cardHorizontal--cardImg__small'
                        cardBodyClass='cayrdHorizontal--cardBod cardHorizontal--cardBody__small'

                        image={item._embedded ? item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : '' : ''}
                        titleTextBtnClass='classTitleTextBtn  d-flex flex-column align-items-center align-items-md-start'
                        classTitle='classTitleTextBtn--title classTitleTextBtn--title__smallFont mb-2'
                        title={Substring(item.title.rendered, 70)}
                        classText='classTitleTextBtn--text mb-2'
                        text={item.excerpt ? Substring(item.excerpt.rendered, 115) : ''}
                        hasBtn='true'
                        classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt  classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__txtHoverBlue font-weight-bold pl-0'
                        pathLink={`/biblioteca/${item.slug}`}
                        hasMetaDate={true}
                        classMetaDate='cardHorizontal--metaDate'
                        metaDate={this.getDate(item.date)}
                        textButtom='Acesse a página'
                    />

                )
            )
        }

    }

    render() {

        return (
            <div className="feed d-flex flex-column align-items-center">

                <div className="tiles" aria-live="polite">
                    <Row classWithRow='pt-4 d-flex justify-content-center'>
                        {
                            this.whatIsChildComponent(this.props.whatIsChildComponent)

                        }
                    </Row>
                </div>
                {(this.props.loaded === 6 && !window.location.href.includes('pesquisa')) &&
                    <button className='buttom btn mt-4 shadow' onClick={this.loadMore}>Carregar Mais</button>
                }

            </div>
        );
    }
}

