import React, { Component } from 'react'
import Nav from '../generics/components-groups/Nav'
import HeaderTopBar from './HeaderTopBar';
import MenuItem from '../generics/small-components/MenuItem'
import ScrollUpButton from "react-scroll-up-button"
import { NavLink, Redirect } from 'react-router-dom'

class Header extends Component {

    state = {
        redirect: false
    }

    clickOnParentItem(e) {
        e.preventDefault()  
        this.setState({
            redirect: true
        })
    }
   
    render() {
        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to='/o-que-fazemos'/>;
        }
        return (
            <React.Fragment>
                <header className='header'>
                    <HeaderTopBar />

                    <Nav menu='header--nav' isHeader='true'>
                        <MenuItem
                            classMenuItem='active'
                            ItemLink='/quem-somos'
                            textItem='Quem Somos'
                        />
                        {
                            !window.location.href.includes('o-que-fazemos') ?
                                <li className="navMenuLine nav-item  dropdown">
                                    <NavLink className="navMenuLine--link nav-link" to='/o-que-fazemos'>O que fazemos</NavLink>
                                    <div className="dropdown-menu">
                                        <NavLink className="dropdown-item" to="/o-que-fazemos/#producao_de_conhecimento">Produção do conhecimento</NavLink>
                                        <NavLink className="dropdown-item" to="/o-que-fazemos/#disseminacao_de_informacoes">Disseminação de conteudo</NavLink>
                                        <NavLink className="dropdown-item" to="/o-que-fazemos/#formacao_de_capacitacao">Ações de formação</NavLink>
                                    </div>
                                </li>
                                :
                                <MenuItem
                                    ItemLink='/o-que-fazemos'
                                    textItem='O que fazemos'
                                />
                        }

                        <MenuItem
                            ItemLink='/o-que-pensamos'
                            textItem='O que pensamos'
                        />

                        <MenuItem
                            ItemLink='/biblioteca'
                            textItem='Biblioteca'
                        />
                        <MenuItem
                            ItemLink='/noticias'
                            textItem='Notícias'
                        />
                        <MenuItem
                            ItemLink='/contato'
                            textItem='Contato'
                        />
                    </Nav>

                </header>
                <ScrollUpButton
                    ContainerClassName="containerBackToTop"
                    TransitionClassName="backToTopTransition"
                >
                    <div></div>
                </ScrollUpButton>
            </React.Fragment>
        )
    }

}
export default Header

