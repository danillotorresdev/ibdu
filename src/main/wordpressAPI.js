import axios from 'axios'

export const baseUrl = 'http://www.ibdu.org.br/api/wp-json/wp/v2/'
export const baseUrlACF = 'http://www.ibdu.org.br/api/wp-json/acf/v3/'
// export const baseUrl = 'http://maloo.tempsite.ws/ibdu/wp-ibdu-api/wp-json/wp/v2/'
// export const baseUrlACF = 'http://maloo.tempsite.ws/ibdu/wp-ibdu-api/wp-json/acf/v3/'
// export const baseUrl = 'http://localhost/wp-ibdu-api/wp-json/wp/v2/'
// export const baseUrlACF = 'http://localhost/wp-ibdu-api/wp-json/acf/v3/'

export const getPosts = (postType, limit = 10, offset = 0) =>
    axios.get(`${baseUrl}${postType}?per_page=${limit}&_embed&offset=${offset}`)


export const getPost = (post) =>
    axios.get(`${baseUrl}posts/?slug=${post}&_embed`)
        .then(res => {
            return res.data
        })

 
export const getConteudos = (catId, limit = 10, offset = 0) =>
    axios.get(`${baseUrl}conteudo/?categorias=${catId}&per_page=${limit}&_embed&offset=${offset}`)
        .then(data => {
            return data.data
        })

export const getConteudo = (taxonomy, limit = 10, offset = 0) =>
    axios.get(`${baseUrl}categorias/?slug=${taxonomy}&_embed`)
        .then(res => {
            return getConteudos(res.data[0].id, limit, offset)
        })

export const getAllContents = ( per_page=12, offset=0) => axios.get(`${baseUrl}conteudo?per_page=${per_page}&offset=${offset}&_embed`)

export const getAllContentsFromCategory = (offset=0, categoria, limit = 10) => axios.get(`${baseUrl}conteudo?categorias=${categoria}&per_page=${limit}&offset=${offset}&_embed`)

export const getPostsPerCategories = (catId, limit = 10, offset = 0) =>
    axios.get(`${baseUrl}posts/?categories=${catId}&per_page=${limit}&_embed&offset=${offset}`)
        .then(data => {
            return data.data
        })

export const getPostPerCat = (taxonomy, limit = 10, offset = 0) =>
    axios.get(`${baseUrl}categories/?slug=${taxonomy}&_embed`)
        .then(res => {
            return getPostsPerCategories(res.data[0].id, limit, offset)
        })

export const getPage = (page) => axios.get(`${baseUrl}pages/?slug=${page}&_embed`)

export const getPageACF = (page) =>
    axios.get(`${baseUrlACF}pages/${page}`)

export const getCustomPost = (postType, post) =>
    axios.get(`${baseUrl}${postType}/?slug=${post}`)
        .then(res => {
            return res.data
        })
export const getCustomPosts = (postType, categoryPath = '', category = '', limit= 10) =>
    axios.get(`${baseUrl}${postType}?_embed&${categoryPath}=${category}&per_page=${limit}`)
        .then(res => {
            return res.data
        })

export const search = (value) =>
    axios.all([
        axios.get(`${baseUrl}posts/?search=${value}&_embed`),
        axios.get(`${baseUrl}conteudo/?search=${value}&_embed`),
    ])
export const searchConteudo = function(value, category, offset = 0, limit=10){
    const hasCategory = category === '' ? '' : `&categorias=${category}`
    return axios.get(`${baseUrl}conteudo/?search=${value}&_embed${hasCategory}&per_page=25&offset=${offset}`)
}

export const getContentCategories = () => axios.get(`${baseUrl}categorias`)

export const getCurrentCategory = (slug, slug2) =>
    axios.all([
        axios.get(`${baseUrl}categorias?slug=${slug}`),
        axios.get(`${baseUrl}categories?slug=${slug2}`)
    ])

export const getNotes = () => axios.get(`${baseUrl}notas?_embed`)

export const getNote = (note) => axios.get(`${baseUrl}notas/?slug=${note}&_embed`)

export const getDissemitations = () => axios.get(`${baseUrl}disseminacao_de_informacoes?_embed`)

export const getDissemination = (dissemination) => axios.get(`${baseUrl}disseminacao_de_informacoes/?slug=${dissemination}&_embed`)

export const getOpinions = () => axios.get(`${baseUrl}opiniao?_embed`)

export const getOpinion = (opinion) => axios(`${baseUrl}opiniao/?slug=${opinion}&_embed`)

export const getEvento = (evento) => axios(`${baseUrl}eventos/?slug=${evento}&_embed`)



