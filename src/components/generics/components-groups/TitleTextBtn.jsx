import React, { Component } from 'react'
import Buttom from '../small-components/Button'
import { LoaderTitleTextBtn } from '../small-components/Loaders'



export default class TitleTextBtn extends Component {
    hasMetaDate(metaDate) {
        if (metaDate === 'true') {
            return (
                <React.Fragment>
                    <div className={this.props.classMetaDate}>{this.props.metaDate}</div>
                </React.Fragment>
            )
        }
    }
    hasBtn(hasBtn) {
        if (hasBtn === 'true') {
            return (
                <React.Fragment>
                    <Buttom classBtn={this.props.classButton} path={this.props.pathLink} txtButtom={this.props.textButtom} isLink={this.props.isLink ? this.props.isLink : ''} />

                </React.Fragment>
            )
        } else {
            return ''
        }
    }

    hasModal(hasModal) {
        if (hasModal === true) {
            return (
                <React.Fragment>
                    <button type="button" className="menu--btn-agenda float-xl-none float-lg-right mr-4 border-0" data-toggle="modal" data-target="#exampleModal">
                        Acessar
</button>



                </React.Fragment>
            )
        }
    }

    render() {
        return (

            <LoaderTitleTextBtn
                titleTextBtnClass={this.props.titleTextBtnClass}
                loading={this.props.loading}
                loaderPrimaryColor={this.props.loaderPrimaryColor} //"#14576b"
                loaderSecondaryColor={this.props.loaderSecondaryColor} //"#0a2a33"
                contentHeight={this.props.contentHeight}
                contentWidth={this.props.contentWidth}
                rectWidthTitle={this.props.rectWidthTitle}
                rectHeightTitle={this.props.rectHeightTitle}
                rectWidthText={this.props.rectWidthText}
                rectHeightText={this.props.rectHeightText}
                rectWidthButton={this.props.rectWidthButton}
                rectHeightButton={this.props.rectHeightButton}

            >

                <h3 className={this.props.classTitle}>{this.props.title}</h3>
                <p className={this.props.classText} dangerouslySetInnerHTML={{ __html: this.props.text }}></p>
                {this.hasModal(this.props.hasModal)}
                <div className="dateBtn">
                    {this.hasMetaDate(`${this.props.hasMetaDate}`)}
                    {this.hasBtn(`${this.props.hasBtn}`)}
                </div>

            </LoaderTitleTextBtn>




        )
    }


}