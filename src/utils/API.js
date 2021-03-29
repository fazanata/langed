import axios from "axios"

export default axios.create({
    baseURL: "http://test.ce74911.tmweb.ru/api/",
    responseType: "json"
});