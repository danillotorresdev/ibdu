import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as wordpressAPI from '../../../main/wordpressAPI'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class FormFilterSearch extends Component {
    constructor(props) {
        super(props)

        this.validateData = this.validateData.bind(this)
        this.filterData = this.filterData.bind(this)
    }
    state = {
        redirect: false,
        results: [],
        categorias: [],
        categorySelected: '',
        query1: '',
        query2: ''
    }

    validateData(item) {
        if (this.state.query2 !== '') {
            if (item.title.rendered.includes(this.state.query2)) {
                return true
            }
            else if (item.content.rendered.includes(this.state.query2)) {

                return true
            }
            else {

                return false
            }
        }
        return true
    }

    filterData(data, newSearch = false, redirect = false) {
        const result = data.filter(item =>
            this.validateData(item)
        )
        if (result.length === 0) {
            NotificationManager.error('O termo inserido não foi encontrado');
            return false
        }
        if (newSearch === true) {
            this.setState(({
                results: [...this.state.results, ...result]
            }), this.props.handleNewSearch(result))
        } else {
            this.setState({
                //aqui tem dois resultados concatenados em um array separados por virgula. Um dos resultados é o que já esta no estado e o outro é
                //o que está sendo adicionado
                results: [...this.state.results, ...result]
            })
        }
        if (redirect === true) {
            this.setState({
                redirect: true
            })
        }
    }
    LibState(res) {
        this.filterData(res.data, false, true)
    }
    SearchState(res) {
        this.filterData(res.data, true)
    }

    handleSearch = () => { 
        wordpressAPI.searchConteudo(this.state.query1, this.state.categorySelected)
            .then(
                res => {
                    window.location.href.includes('biblioteca') ? (this.LibState(res)) : (this.SearchState(res))
                }
            )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.handleSearch()

    }
    handleQuery1 = (e) => {
        this.setState({
            query1: e.target.value
        })
    }
    handleQuery2 = (e) => {
        this.setState({
            query2: e.target.value
        })
    }

    categorySelected = (e) => {
        this.setState({
            categorySelected: e.target.value
        })
    }

    componentDidMount() {
        wordpressAPI.getContentCategories()
            .then(res =>
                this.setState({
                    "categorias": [...res.data]
                })
            )
    }



    render() {
        if (this.state.redirect === true) {
            return <Redirect to={{ pathname: '/pesquisa', state: { results: this.state.results } }} />
        }
        return (
            <React.Fragment>
                <form action="" className='' onSubmit={this.handleSubmit}>
                    <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
                        <div className="col-md-3">
                            <h4 className='filterSearch--title'>Filtro da pesquisa</h4>
                            <p className='filterSearch--description'>Descrição do item</p>
                        </div>

                        <div className="col-md-2 pb-3">
                            <input required onChange={this.handleQuery1} value={this.state.query1} type="text" className="filterSearch--textInput form-control " id="inputPassword" placeholder="Palavra-chave" />
                        </div>
                        <div className="col-md-2 pb-3">
                            <input onChange={this.handleQuery2} value={this.state.query2} type="text" className="filterSearch--textInput form-control " id="inputPassword2" placeholder="Refinar Busca" />
                        </div>

                        <div className="col-md-2 mt-4 mb-4 mt-md-0 mb-md-0 ">
                            <div class="filterSearch--selectCategory">
                                <small className='filterSearch--labelCategory font-weight-bold'>Categoria</small>
                                <div>
                                    <select onChange={this.categorySelected} className='filterSearch--selectDropdown form-control'>
                                        <option disabled selected value=''>Categoria</option>
                                        {this.state.categorias.map(cat =>
                                            <option value={cat.id} key={cat.id}>{cat.name}</option>
                                        )}

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button type="submit"  className="filterSearch--btnSearch mb-0 btn ">Pesquisar</button>
                        </div>
                    </div>
                </form>
                <NotificationContainer />
            </React.Fragment>

        )
    }
}