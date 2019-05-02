import React, { Component } from 'react'
import { Switch, Route, Redirect} from 'react-router'
import ReactDOM from 'react-dom'

import Home from '../components/home/Home'
import QuemSomos from '../components/quem-somos/QuemSomos'
import OQueFazemos from '../components/o-que-fazemos/OQueFazemos';
import OQuePensamos from '../components/o-que-pensamos/OQuePensamos'
import Biblioteca from '../components/biblioteca/Biblioteca'
import Noticias from '../components/noticias/Noticias'
import Contato from '../components/contato/Contato'
import PerguntasFrequentes from '../components/perguntas-frequentes/PerguntasFrequentes'
import NoticiaAberta from '../components/noticias/NoticiaAberta'
import CategorySearch from '../components/category-search/CategorySearch'
import Search from '../components/search/Search'

export default class Routes extends Component {
    componentDidUpdate = () => { ReactDOM.findDOMNode(document.body).scrollIntoView(); }
    render() {
        return (

            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/quem-somos' component={QuemSomos} />
                <Route path='/o-que-fazemos' component={OQueFazemos} />
                <Route path='/o-que-pensamos' component={OQuePensamos} />
                <Route exact path='/biblioteca' component={Biblioteca} />
                <Route path='/biblioteca/:handle' component={NoticiaAberta} />
                <Route exact path='/noticias' component={Noticias} />
                <Route path='/noticias/:handle' component={NoticiaAberta} />
                <Route path='/contato' render={() => <Contato showTopBar={false} />} />
                <Route path='/perguntas-frequentes' component={PerguntasFrequentes} />
                <Route path='/video-explicativo/:handle' component={NoticiaAberta} />                
                <Route path='/eventos/:handle' component={NoticiaAberta} />
                <Route path='/categorias/:handle' component={CategorySearch} />
                <Route path='/pesquisa/' component={CategorySearch} />
                <Route path='/search/' component={Search} />
                <Route path='/notas/:handle' component={NoticiaAberta} />
                <Route path='/disseminacao_e_informacao/:handle' component={NoticiaAberta} />
                <Route path='/opinioes/:handle' component={NoticiaAberta} />
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}