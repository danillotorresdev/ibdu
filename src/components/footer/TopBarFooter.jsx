import React, { Component } from 'react'
import Row from '../generics/small-components/Row'
import Button from '../generics/small-components/Button';
export default class extends Component {

    render() {
        return (
            <div className="topBarFooter">
                <Row>
                    <div className="col-md-12 col-lg-6 d-flex flex-column flex-md-row p-0">
                        <a className='facebookLike hoverEffect' href="https://www.facebook.com/InstitutoBrasileiroDireitoUrbanistico/" rel="noopener noreferrer" target="_blank">
                            <div className="">
                                <h3 className='facebookLike--title font-weight-bold'>Curta Pelo Facebook</h3>
                            </div>
                        </a>

                        <div className="col-md-6 d-flex flex-column p-0">
                            <a className='followInsta hoverEffect' href="https://www.instagram.com/ibdu_oficial/" rel="noopener noreferrer" target="_blank">
                                <div className="">
                                    <h3 className='followInsta--title font-weight-bold'>Acompanhe pelo Instagram</h3>
                                </div>
                            </a>
                            <a className='watchOnYoutube hoverEffect' href="https://www.youtube.com/channel/UCkzKRdEmmX0He4PfSPnDSew" rel="noopener noreferrer" target="_blank">
                                <div className="">
                                    <h3 className='watchOnYoutube--title font-weight-bold'>Conheça pelo Youtube</h3>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-6 p-0">
                        <div className="accessContact d-flex justify-content-center align-items-center align-items-lg-start text-center text-lg-left flex-column">
                            <h3 className='accessContact--title font-weight-bold'>Fale conosco</h3>
                            <p className='accessContact--text accessContact--text__white'>
                                Entre em contato para tirar dúvidas ou conhecer<br /> mais sobre o trabalho do instituto.
                    </p>
                            <Button classBtn='accessContact--btn btn shadow' path='contato' txtButtom='Acessar' />
                        </div>
                    </div>
                </Row>

            </div >
        )
    }
}
