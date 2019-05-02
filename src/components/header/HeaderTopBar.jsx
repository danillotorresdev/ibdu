import React, { Component } from 'react'
import Container from '../generics/small-components/Container'
import InputSearch from '../generics/small-components/InputSearch'
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link, Redirect } from 'react-router-dom'
import * as wordpressAPI from '../../main/wordpressAPI'
import { debounce } from 'lodash'

export default class HeaderTopBar extends Component {
  constructor() {
    super()
    this.autocompleteRef = React.createRef();
    this.state = {
      value: '',
      suggestions: [],
      results: [],
      redirect: false,
      active: false
    }
  }

  onChange = (event, { newValue, method }) => {
    this.setState({ value: newValue });
  }

  onSuggestionsFetchRequested = debounce((value) => {
    wordpressAPI.search(value)
      .then(
        axios.spread((posts, conteudo) => {
          this.onSuggestionsClearRequested()
          posts.data.map(item =>
            item.title.rendered.toLowerCase().includes(value) &&
            this.setState({
              suggestions: [...this.state.suggestions, {
                title: item.title.rendered,
                text: item.excerpt.rendered ? item.excerpt.rendered : '',
                image: item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : '',
                slug: `/noticias/${item.slug}`
              }]
            })
          )
          conteudo.data.map(item =>
            item.title.rendered.toLowerCase().includes(value) &&
            this.setState({
              suggestions: [...this.state.suggestions, {
                title: item.title.rendered,
                text: item.excerpt.rendered ? item.excerpt.rendered : '',
                image: item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : '',
                slug: `/biblioteca/${item.slug}`
              }]
            })
          )

        })

      )
  }, 1000)
  handleDataFromSearch = (value) => {

    this.setState({
      redirect: true
    })




  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  handleChange(value) {

    this.setState({
      value: value
    })
    if (value !== '') {
      this.onSuggestionsFetchRequested(value)
    } else {
      this.onSuggestionsClearRequested()
    }
  }
  handleSearchFromBtn() {
    this.handleDataFromSearch(this.state.value)
    this.setState({
      value: ''
    })
  }
  handleActive = (active) => {
    this.setState({
      active: active
    })
  }
  //tratando o click fora da caixa
  handleBodyClick = (e) => (
    e.target.closest('.search-form-ibdu') ? false : this.handleActive(false)
  )
  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick)
  }
  render() {

    const { value, suggestions } = this.state;


    return (
      <React.Fragment>
        {this.state.redirect === true ? <Redirect to={{ pathname: '/search', state: { results: this.state.suggestions } }} /> : ''}
        <div className="header-top-bar">
          <Container>
            <div className="search-form-ibdu form-inline float-right">
              <div className='header-top-bar--searchField'>


                <InputSearch
                  inputSearchClass="search-form-ibdu--input-search form-control mr-sm-2 align-middle"
                  valor={value}
                  onChange={(e) => this.handleChange(e.target.value)}
                  handleSearchFromBtn={() => this.handleSearchFromBtn()}
                  handleActive={this.handleActive}
                />
                {this.state.active === true &&
                  <ul className={suggestions.length > 0 && value.length > 0  ? 'autocomplete shadow autocomplete--active' : 'autocomplete'}>
                    <Scrollbars c style={{ height: 100 }}>
                      {this.state.suggestions.map(suggestion =>

                        <li onClick={() => this.handleActive(false)} className='autocomplete--suggestionsLine' key={suggestion.slug}>
                          <Link className='autocomplete--link' to={suggestion.slug}>{suggestion.title}</Link>
                        </li>

                      )}
                    </Scrollbars>
                  </ul>
                }
              </div>

            </div>
          </Container>
        </div>
      </React.Fragment>


    )
  }
}

