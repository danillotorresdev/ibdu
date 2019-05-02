import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'

class LoaderImg extends Component {
    render() {
        const loaderPrimaryColor = this.props.loaderPrimaryColor ? this.props.loaderPrimaryColor : "#000"
        const loaderSecondaryColor = this.props.loaderSecondaryColor ? this.props.loaderSecondaryColor : "#000"
        return (
            <div style={{ height: this.props.contentHeight, width: this.props.contentWidth }}>
                {
                    this.props.loading ?
                        <ContentLoader
                            height={this.props.height}
                            width={this.props.width}
                            speed={2}
                            primaryColor={loaderPrimaryColor} //"#14576b"
                            secondaryColor={loaderSecondaryColor} //"#0a2a33"
                        >
                            <rect x="0" y="0" rx="0" ry="0" width={this.props.rectWidth} height={this.props.rectHeight} />

                        </ContentLoader>
                        :
                        this.props.children
                }
            </div>
        )
    }
}

class LoaderImgWithLines extends Component {
    render() {
        const loaderPrimaryColor = this.props.loaderPrimaryColor ? this.props.loaderPrimaryColor : "#000"
        const loaderSecondaryColor = this.props.loaderSecondaryColor ? this.props.loaderSecondaryColor : "#000"
        return (
            <div style={{ height: this.props.contentHeight, width: this.props.contentWidth }}>
                {
                    this.props.loading ?
                        <ContentLoader
                            height={this.props.height}
                            width={this.props.width}
                            speed={2}
                            primaryColor={loaderPrimaryColor} //"#14576b"
                            secondaryColor={loaderSecondaryColor} //"#0a2a33"
                        >
                            <rect x="0" y="0" rx="0" ry="0" width={this.props.rectWidth} height={this.props.rectHeight} />
                            <rect x="0" y="230" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                            <rect x="0" y="250" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />

                            <rect x="0" y="270" rx="0" ry="0" width={this.props.rectWidth} height={this.props.rectHeight} />
                            <rect x="0" y="430" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                            <rect x="0" y="450" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />

                        </ContentLoader>
                        :
                        this.props.children
                }
            </div>
        )
    }
}

class LoaderTitleTextBtn extends Component {
    render() {
        const loaderPrimaryColor = this.props.loaderPrimaryColor ? this.props.loaderPrimaryColor : "#000"
        const loaderSecondaryColor = this.props.loaderSecondaryColor ? this.props.loaderSecondaryColor : "#000"
        return (
            <div className={this.props.titleTextBtnClass}>
                {this.props.loading ?
                    <ContentLoader
                        height={this.props.contentHeight}
                        width={this.props.contentWidth}
                        speed={2}
                        primaryColor={loaderPrimaryColor} //"#14576b"
                        secondaryColor={loaderSecondaryColor} //"#0a2a33"
                    >
                        <rect x="0" y="30" rx="3" ry="3" width={this.props.rectWidthTitle} height={this.props.rectHeightTitle} />
                        <rect x="0" y="80" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="100" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="120" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="140" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="160" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="180" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="200" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="220" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="240" rx="3" ry="3" width={this.props.rectWidthButton} height={this.props.rectHeightButton} />
                    </ContentLoader>
                    :
                    this.props.children
                }
            </div>
        )
    }
}
class LoaderTextHorizontalCard extends Component {
    render() {
        const loaderPrimaryColor = this.props.loaderPrimaryColor ? this.props.loaderPrimaryColor : "#000"
        const loaderSecondaryColor = this.props.loaderSecondaryColor ? this.props.loaderSecondaryColor : "#000"
        return (
            <div className={this.props.titleTextBtnClass}>
                {this.props.loading ?
                    <ContentLoader
                        height={this.props.contentHeight}
                        width={this.props.contentWidth}
                        speed={2}
                        primaryColor={loaderPrimaryColor} //"#14576b"
                        secondaryColor={loaderSecondaryColor} //"#0a2a33"
                    >
                        <rect x="0" y="10" rx="3" ry="3" width={this.props.rectWidthTitle} height={this.props.rectHeightTitle} />
                        <rect x="0" y="70" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="80" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="90" rx="3" ry="3" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="120" rx="3" ry="3" width={this.props.rectWidthButton} height={this.props.rectHeightButton} />
                    </ContentLoader>
                    :
                    this.props.children
                }
            </div>
        )
    }
}

class LoaderTitleTextWith2Lines extends Component {
    render() {
        const loaderPrimaryColor = this.props.loaderPrimaryColor ? this.props.loaderPrimaryColor : "#000"
        const loaderSecondaryColor = this.props.loaderSecondaryColor ? this.props.loaderSecondaryColor : "#000"
        return (
            <div className={this.props.titleTextBtnClass}>
                {this.props.loading ?
                    <ContentLoader
                        height={this.props.contentHeight}
                        width={this.props.contentWidth}
                        speed={2}
                        primaryColor={loaderPrimaryColor} //"#14576b"
                        secondaryColor={loaderSecondaryColor} //"#0a2a33"
                    >
                        <rect x="0" y="0" rx=".6" ry=".6" width={this.props.rectWidthTitle} height={this.props.rectHeightTitle} /> {/* align center x="26.5%" */}
                        <rect x="0" y="10" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="12.5" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />

                    </ContentLoader>
                    :
                    this.props.children
                }
            </div>
        )
    }
}
class LoaderTitleBlog extends Component {
    render() {
        const loaderPrimaryColor = this.props.loaderPrimaryColor ? this.props.loaderPrimaryColor : "#000"
        const loaderSecondaryColor = this.props.loaderSecondaryColor ? this.props.loaderSecondaryColor : "#000"
        return (
            <div className={this.props.titleTextBtnClass}>
                {this.props.loading ?
                    <ContentLoader
                        height={this.props.contentHeight}
                        width={this.props.contentWidth}
                        speed={2}
                        primaryColor={loaderPrimaryColor} //"#14576b"
                        secondaryColor={loaderSecondaryColor} //"#0a2a33"
                    >
                        <rect x="0" y="2" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="5" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />

                    </ContentLoader>
                    :
                    this.props.children
                }
            </div>
        )
    }
}
class LoaderContentBlog extends Component {
    render() {
        const loaderPrimaryColor = this.props.loaderPrimaryColor ? this.props.loaderPrimaryColor : "#000"
        const loaderSecondaryColor = this.props.loaderSecondaryColor ? this.props.loaderSecondaryColor : "#000"
        return (
            <div className={this.props.titleTextBtnClass}>
                {this.props.loading ?
                    <ContentLoader
                        height={this.props.contentHeight}
                        width={this.props.contentWidth}
                        speed={2}
                        primaryColor={loaderPrimaryColor} //"#14576b"
                        secondaryColor={loaderSecondaryColor} //"#0a2a33"
                    >
                        <rect x="0" y="7" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="10" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="13" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="16" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="19" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="22" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="25" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="28" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />
                        <rect x="0" y="31" rx=".6" ry=".6" width={this.props.rectWidthText} height={this.props.rectHeightText} />

                    </ContentLoader>
                    :
                    this.props.children
                }
            </div>
        )
    }
}

class LoaderCarouselAcessToLib extends Component {
    render() {
        const loaderPrimaryColor = this.props.loaderPrimaryColor ? this.props.loaderPrimaryColor : "#000"
        const loaderSecondaryColor = this.props.loaderSecondaryColor ? this.props.loaderSecondaryColor : "#000"
        return (
            <div className={this.props.titleTextBtnClass}>
                {this.props.loading ?
                    <ContentLoader
                        height={this.props.contentHeight}
                        width={this.props.contentWidth}
                        speed={2}
                        primaryColor={loaderPrimaryColor} //"#14576b"
                        secondaryColor={loaderSecondaryColor} //"#0a2a33"
                    >
                        <rect x="0" y="30" rx="3" ry="3" width={this.props.rectWidthTitle} height={this.props.rectHeightTitle} />
                        />
                    </ContentLoader>
                    :
                    this.props.children
                }
            </div>
        )
    }
}

class LoaderCarouselManyPages extends Component {
    render() {
        const loaderPrimaryColor = this.props.loaderPrimaryColor ? this.props.loaderPrimaryColor : "#000"
        const loaderSecondaryColor = this.props.loaderSecondaryColor ? this.props.loaderSecondaryColor : "#000"
        return (
            <div className={this.props.titleTextBtnClass}>
                {this.props.loading ?
                    <ContentLoader
                        height={this.props.contentHeight}
                        width={this.props.contentWidth}
                        speed={2}
                        primaryColor={loaderPrimaryColor} //"#14576b"
                        secondaryColor={loaderSecondaryColor} //"#0a2a33"
                    >
                        <rect x="0" y="0" rx="0" ry="0" width={this.props.rectWidthTitle} height={this.props.rectHeightTitle} />
                        />
                    </ContentLoader>
                    :
                    this.props.children
                }
            </div>
        )
    }
}

export {
    LoaderImg, LoaderTitleTextBtn, LoaderTextHorizontalCard,
    LoaderCarouselAcessToLib, LoaderCarouselManyPages,
    LoaderTitleTextWith2Lines, LoaderTitleBlog, LoaderContentBlog,
    LoaderImgWithLines
}