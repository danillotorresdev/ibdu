import React, {Component} from 'react'
import SlickCarouselSchedule from '../slick/SlickCarouselSchedule'
import BgShadowImg from '../small-components/BgShadowImg'
import MetaDate from '../small-components/MetaDate'
import TitleTextBtn from '../components-groups/TitleTextBtn'
import * as wordpressAPI from '../../../main/wordpressAPI'
import imagePlaceholder from '../small-components/imagePlaceholder'
import Substring from '../small-components/Substring'

export default class ModalSchedule extends Component {
    state = {
        "eventos": [],
        "titulo": '',
        "texto": ''
    }
    componentDidMount() {
        wordpressAPI.getCustomPosts('eventos')
            .then(res => {
                this.setState({
                    "eventos": [...res]
                })
                }
            )
            wordpressAPI.getPage("modal")
            .then(res => {
                wordpressAPI.getPageACF(res.data[0].id)
                .then( data => {
                    this.setState({
                        "titulo": data.data.acf.titulo,
                        "texto": data.data.acf.texto,
                        "loading": false                        
                    })
                })
            })
    }
    getDate(postDate){        
        let time = new Date(postDate)		
        let current_date = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`;
        return current_date        
    }

    render(){
        return(
                <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal--header d-flex align-items-baseline p-0 pt-5 ">
                                <div className='d-flex flex-column pl-3 pl-md-4 pl-lg-5 pr-md-3 pr-lg-0'>
                                    <h5 className="modal--title font-weight-bold w-75" id="exampleModalLabel">{this.state.titulo}</h5>
                                    <p className='modal--paragraph'>{this.state.texto}</p>
                                </div>
                                <button type="button" className="close  pr-4" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal--body">
                                <SlickCarouselSchedule >
                                   
                                    {this.state.eventos.map( (evento, i) =>                               
                                        <div className='modal--boxSchedule' key={`evento_${i}`}>
                                        <a href={`/eventos/${evento.slug}`} rel="noopener noreferrer" target='_blank'>
                                            <div className="">
                                                <BgShadowImg>
                                                    <img className=' img-fluid shadow' src={ evento._embedded ? (evento._embedded['wp:featuredmedia'] ? evento._embedded['wp:featuredmedia'][0].source_url : imagePlaceholder): imagePlaceholder} alt="" />
                                                    <MetaDate
                                                        eventDate={this.getDate(evento.date)}
                                                        metadateAttr='meta-date--orange meta-date--alignLeft'
                                                    />
                                                    <TitleTextBtn
                                                        titleTextBtnClass='classTitleTextBtn d-flex flex-column'
                                                        classTitle='classTitleTextBtn--title classTitleTextBtn--title__fontWeightRegular classTitleTextBtn--title__white classTitleTextBtn--title__textUppercase mb-2'
                                                        title={Substring(evento.title.rendered, 15)}
                                                        classText='classTitleTextBtn--text classTitleTextBtn--text__white mb-2 pr-1'
                                                        text={Substring(evento.excerpt.rendered, 50)}
                                                        hasBtn='true'
                                                        classButton='classTitleTextBtn--btn classTitleTextBtn--btn__noBg classTitleTextBtn--btn__smallTxt
                                                        classTitleTextBtn--btn__bgHoverNone classTitleTextBtn--btn__textWhite classTitleTextBtn--btn__txtHoverWhite font-weight-bold pl-0 '
                                                        pathLink={`/eventos/${evento.slug}`}
                                                        target='true'
                                                        textButtom='Mais detalhes'
                                                        isLink='true'
                                                    />
                                                </BgShadowImg>
                                            </div>
                                        </a>
                                        </div>
                                        )}

                                    
                                </SlickCarouselSchedule>


                            </div>

                        </div>
                    </div>
                </div>
        )
    }
}
    