import React from 'react'
import Container from '../small-components/Container'
import TitleTextBtn from '../components-groups/TitleTextBtn'
import Section from '../small-components/Section';

export default props =>
    <Section classSection={props.classBanner}>
        <Container>
            <div className={props.divTextBanner}>
                <TitleTextBtn
                    titleTextBtnClass={props.titleTextBtnClass}
                    classTitle={props.classTitle}
                    title={props.title}
                    classText={props.classText}
                    text={props.text}
                    hasBtn={props.hasBtn}
                    classButton={props.classButton}
                    pathLink={props.pathLink}
                    textButtom={props.textButtom}

                    loading={props.loading}
                    loaderPrimaryColor={props.loaderPrimaryColor}
                    loaderSecondaryColor={props.loaderSecondaryColor}
                    contentHeight={props.heightContentLoader}
                    contentWidth={props.widthContentLoader}
                    rectWidthTitle={props.rectWidthTitle}
                    rectHeightTitle={props.rectHeightTitle}
                    rectWidthText={props.rectWidthText}
                    rectHeightText={props.rectHeightText}
                    rectWidthButton={props.rectWidthButton}
                    rectHeightButton={props.rectHeightButton}
                />
            </div>
        </Container>
    </Section>
