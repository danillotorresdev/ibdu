import React, { Component } from 'react'
import TitleTextBtn from '../components-groups/TitleTextBtn'
import MetaDate from '../small-components/MetaDate'
import BgShadowImg from '../small-components/BgShadowImg'
import classnames from 'classnames'
import { LoaderTextHorizontalCard, LoaderImg } from '../small-components/Loaders'
import { Link } from 'react-router-dom'
import imagePlaceholder from '../../generics/small-components/imagePlaceholder'

export default class CardHorizontal extends Component {
    constructor(props){
        super(props)

        this.isClickable = this.isClickable.bind(this)
    }


    hasDate(hasDate) {
        if (hasDate === 'true') {
            return (<MetaDate eventDate={this.props.eventDate} />);
        }
        else {
            return ''
        }
    }
    cardHorizontal() {
        return (
            <div className={this.props.cardClass}>
                <BgShadowImg dadOfImg={this.props.dadOfImg}>
                    <LoaderImg
                        loading={this.props.loading}
                        loaderPrimaryColor="#14576b" //"#14576b"
                        loaderSecondaryColor="#0a2a33" //"#0a2a33"
                        contentHeight="100%"
                        contentWidth="100%"
                        height='216'
                        width='216'
                        rectWidth='100%'
                        rectHeight='216'
                    >
                        <img className={this.props.imgClass} src={this.props.image ? this.props.image : imagePlaceholder } alt="teste" ></img>
                        {this.hasDate(this.props.hasDate)}
                    </LoaderImg>
                </BgShadowImg>
                <div className={classnames("card-body", this.props.cardBodyClass)}>
                    <div className="card-text">
                        <LoaderTextHorizontalCard
                            loading={this.props.loading}
                            loaderPrimaryColor={this.props.loaderPrimaryColor}
                            loaderSecondaryColor={this.props.loaderSecondaryColor}
                            contentHeight={this.props.contentHeight}
                            contentWidth={this.props.contentWidth}
                            rectWidthTitle="250"
                            rectHeightTitle="42"
                            rectWidthText="250"
                            rectHeightText="5"
                            rectHeightButton="50"
                            rectWidthButton="150"

                        >
                            <TitleTextBtn
                                titleTextBtnClass={this.props.titleTextBtnClass}
                                classTitle={this.props.classTitle}
                                title={this.props.title}
                                classText={this.props.classText}
                                text={this.props.text}
                                hasBtn={this.props.hasBtn}
                                classButton={this.props.classButton}
                                pathLink={this.props.pathLink}
                                textButtom={this.props.textButtom}
                                hasMetaDate={this.props.hasMetaDate}
                                classMetaDate={this.props.classMetaDate}
                                metaDate={this.props.metaDate}
                            />
                        </LoaderTextHorizontalCard>
                    </div>
                </div>
            </div>
        )
    }
    isClickable(cardUnclickable) {
        if (cardUnclickable === false || typeof(cardUnclickable) === 'undefined') {
            return (
                <Link to={this.props.pathLink} className="linkCard">

                    {this.cardHorizontal()}

                </Link>
            )
        }
        else {
            return this.cardHorizontal() 
        }
    }

    render() {
        return (
           this.isClickable(this.props.isUnclickable)
        )
    }


}
