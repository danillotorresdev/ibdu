import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as wordpressAPI from '../../../main/wordpressAPI' 

export default class FABCategory extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }
    state = {
        "isClicked": false,
        "categorias": []
    }   
    componentDidMount() {
        wordpressAPI.getContentCategories()
            .then(res =>
                this.setState({
                    "categorias": [...res.data]
                })
            )
    }
    handleClick() {
        this.setState({ isClicked: !(this.state.isClicked) })
    }
    isActive() {
        const isClickedX = this.state.isClicked
        if (isClickedX === true) { 
            return 'btn active widgetCategory--iconList__orange'
        } else {
            return 'btn widgetCategory--iconList'
        }
    }
    isExplandedArea() {
        if (this.state.isClicked === false) {
            return "widgetCategory shadow"
        } else {
            return "widgetCategory shadow widgetCategory__explandedArea"
        }
    }
    explandedAreaContent() {
        if (this.state.isClicked === false) {
            return "widgetCategory--boxContent widgetCategory__disappear"
        } else {
            return "widgetCategory--boxContent widgetCategory__appear"
        }
    }
    render() {
        return (
            <div className={this.isExplandedArea()}>
                <button className={this.isActive()} onClick={this.handleClick}></button>
                <div className={this.explandedAreaContent()}>
                    <h3 className='widgetCategory--title font-weight-bold'>Categorias</h3>
                    <ul className='widgetCategory--list p-0'>
                        {this.state.categorias.map(cat =>
                            <li key={cat.id} className='widgetCategory--itemList'>
                                <Link to={`/categorias/${cat.slug}`} className='widgetCategory--link'>{cat.name}</Link>
                            </li>

                        )}

                    </ul>
                </div>
            </div>
        )
    }
}