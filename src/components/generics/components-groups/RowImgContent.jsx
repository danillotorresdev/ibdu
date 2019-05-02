import React from 'react'
import Row from '../small-components/Row'
import TitleTextBtn from '../components-groups/TitleTextBtn'
import classnames from 'classnames'

export default props =>
    <Row classWithRow={classnames(props.rowDirection, 'rowImgContent d-flex align-items-center')}>
        <TitleTextBtn
            titleTextBtnClass={props.titleTextBtnClass}
            classTitle={props.classTitle}
            title={props.title}
            classText={props.classText}
            text={props.text}
            hasBtn={props.hasBtn ? props.hasBtn : 'false'}
            classButton={props.classButton ? props.classButton : ''}
            pathLink={props.pathLink ? props.pathLink : ''}
            textButtom={props.textButtom ? props.textButtom : ''}
            isLink={props.isLink ? props.isLink : ''} 
            hasModal={props.hasModal ? props.hasModal : ''}
            />             
        <div className={classnames(props.alignImg, 'col-12 col-md-6 col-lg-6')}>
                <img className='rowImgContent--img  img-fluid shadow ' src={props.image} alt="" />
        </div>       
    </Row>