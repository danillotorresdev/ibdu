import React, { Component } from 'react'
import TitleTextBtn from '../components-groups/TitleTextBtn'
import SlickCarouselAccesslToLibrary from '../slick/SlickCrouselAccessToLibrary'
import Row from '../small-components/Row'
import classnames from 'classnames'
import { LoaderCarouselAcessToLib } from '../small-components/Loaders'


export default class AccessToLibrary extends Component {

    render() {
        return (
            <Row classWithRow={this.props.classWithRow}>
                <TitleTextBtn
                    titleTextBtnClass={this.props.classTitleTextBtn}
                    classTitle={this.props.classTitle}
                    title={this.props.accessToLib_titulo}
                    classText={this.props.classText}
                    text={this.props.accessToLib_paragrafo}
                    hasBtn='true'
                    classButton={this.props.classButton}
                    pathLink={this.props.pathLink}
                    textButtom='Acessar Página'

                    loading={this.props.loading}
                    loaderPrimaryColor="#14576b"
                    loaderSecondaryColor="#0a2a33"
                    contentHeight="230"
                    contentWidth="600"
                    rectWidthTitle="300"
                    rectHeightTitle="35"
                    rectWidthText="750"
                    rectHeightText="6.4"
                    rectWidthButton="201"
                    rectHeightButton="6.4"
                />

                <div className={classnames(this.props.classSlider, 'col-md-6 col-lg-6')}>
                    <LoaderCarouselAcessToLib
                        loading={this.props.loading}
                        loaderPrimaryColor="#14576b" //"#14576b"
                        loaderSecondaryColor="#0a2a33" //"#0a2a33"
                        contentHeight="265"
                        contentWidth="455"
                        rectWidthTitle='455'
                        rectHeightTitle='400'
                    >
                        <SlickCarouselAccesslToLibrary>

                            {this.props.accessToLib_slide.map((imagem) =>
                                <div>
                                    <img className='accessToLibrary--imgRight__img img-fluid shadow' src={imagem.imagem} alt='test'/>
                                </div>

                            )}

                        </SlickCarouselAccesslToLibrary>
                    </LoaderCarouselAcessToLib>

                </div>
            </Row>

        )
    }
}

