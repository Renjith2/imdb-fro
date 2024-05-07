import {axiosInstance as axios}  from "../apicalls"

const get = (url) => {
    return axios.get(url);
}

const put = () => {

}

const post = () => {

}

const remove = () => {

}

const HttpClient = {
    get: get,
    put: put
}

export default HttpClient;
