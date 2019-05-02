import React from 'react'
import Container from '../generics/small-components/Container'
import Logo from '../generics/small-components/Logo'
import LogoImg from '../../assets/images/Logo-Footer.png'
import TitleTextBtn from '../generics/components-groups/TitleTextBtn'
import TitleWithList from '../generics/small-components/TitleWithList'
import ItemList from '../generics/small-components/ItemList'
import imgApoiador from '../../assets/images/Logo-Ford-Foundation.png'


export default props =>
    <div className="bottomBarFooter d-flex align-items-center">
        <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between">
                <div className="col-md-2 d-flex justify-content-center justify-content-sm-start ">
                    <Logo srcImg={LogoImg} />
                </div>
                <div className="col-md-3">
                    <TitleTextBtn
                        titleTextBtnClass='classTitleTextBtn d-flex flex-column'
                        classTitle='classTitleTextBtn--title classTitleTextBtn--title__white classTitleTextBtn--title__smallerFont classTitleTextBtn--title__fontUppercase'
                        title='Sobre'
                        classText='classTitleTextBtn--text classTitleTextBtn--text__white mb-3'
                        text={"O IBDU é uma associação civil com atuação nacional que reúne profissionais, pesquisadores e estudantes para discutir, pesquisar e divulgar informações sobre o Direito Urbanístico."}
                        hasBtn='false'
                    />

                </div>
                <div className="col-md-2 d-flex justify-content-center">
                    <TitleWithList>
                        <ItemList
                            textItemList='Quem Somos'
                            path='quem-somos'
                        />
                        <ItemList
                            textItemList='O Que Fazemos'
                            path='o-que-fazemos'
                        />
                        <ItemList
                            textItemList='O Que Pensamos'
                            path='o-que-pensamos'
                        />
                        <ItemList
                            textItemList='Biblioteca'
                            path='biblioteca'
                        />
                        <ItemList
                            textItemList='Noticias'
                            path='noticias'
                        />
                        <ItemList
                            textItemList='Contato'
                            path='contato'
                        />
                    </TitleWithList>
                </div>
                <div className="col-md-2">
                    <TitleTextBtn
                        titleTextBtnClass='classTitleTextBtn d-flex flex-column'
                        classTitle='classTitleTextBtn--title classTitleTextBtn--title__white classTitleTextBtn--title__smallerFont classTitleTextBtn--title__fontUppercase'
                        title='Venha Conhecer'
                        classText='classTitleTextBtn--text classTitleTextBtn--text__white'
                        text={"IBDU <br /> Instituto Brasileiro de Direito Urbanístico <br /> Rua Araújo, 124, República São Paulo | SP CEP: 01220-020"}
                        hasBtn='false'
                    />
                </div>
                <div className="col-md-2 col-md-2 d-flex flex-column align-items-center justify-content-center justify-content-sm-start ">
                    <h3 className='classTitleTextBtn--title text-center text-sm-start classTitleTextBtn--title__white classTitleTextBtn--title__smallerFont classTitleTextBtn--title__fontUppercase pl-2'>Apoiador</h3>
                    <img src={imgApoiador} className='img-fluid' alt="apoiador"/>
                </div>

            </div>
        </Container>
    </div>