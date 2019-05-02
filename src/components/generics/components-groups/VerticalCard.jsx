import React, { Component } from 'react'
import classnames from 'classnames'
import { LoaderImg, LoaderTitleTextWith2Lines } from '../small-components/Loaders'
import imagePlaceholder from '../small-components/imagePlaceholder'

function strip_html_tags(str) {
    if ((str === null) || (str === '')) {
        return false;
    }
    else {
        str = str.toString();
    }

    return str.replace(/<[^>]*>/g, '')

}

export default class verticalCard extends Component {
    hasLink(link) {
        if (link === 'true') {
            return (
                <React.Fragment>
                    <a className={this.props.classButton} href={this.props.pathLink} rel="noopener noreferrer" target='_blank'>{this.props.textButtom}</a>
                </React.Fragment>
            )
        }
        else {
            return ''
        }
    }
    render() {
        return (
            <div className={this.props.classVerticalCard}>
                <LoaderImg
                    loading={this.props.loading}
                    loaderPrimaryColor={this.props.imgLoaderPrimaryColor}
                    loaderSecondaryColor={this.props.imgLoaderSecondaryColor}
                    contentHeight="100%"
                    contentWidth="100%"
                    height={this.props.loaderImgHeight}
                    width='216'
                    rectWidth='100%'
                    rectHeight='216'
                >
                    <img className={classnames(this.props.ImgVerticalCardClass, "card-img-top")} src={this.props.image ? this.props.image : imagePlaceholder} alt="test" />
                </LoaderImg>
                <div className={this.props.cardBodyClass}>
                    <LoaderTitleTextWith2Lines
                        loading={this.props.loading}
                        loaderPrimaryColor={this.props.loaderTextPrimaryColor}
                        loaderSecondaryColor={this.props.loaderTextSecondaryColor}
                        contentHeight="20"
                        contentWidth="100"
                        rectWidthTitle="50"
                        rectHeightTitle="6"
                        rectWidthText="75"
                        rectHeightText="1"
                    >
                        <p className={classnames(this.props.titleClass, 'verticalCard--title mb-2')}>{this.props.title}</p>
                        <p className={this.props.textClass ? classnames(this.props.textClass, "verticalCard--text card-text") : ''}>{this.props.text ? strip_html_tags(this.props.text) : ''}</p>
                        {this.hasLink(this.props.hasLink)}
                    </LoaderTitleTextWith2Lines>
                </div>
            </div>

        )
    }
}