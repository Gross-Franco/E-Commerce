import axios from "axios";
// import { setAuthLevel } from "../Redux/Actions/actions";
// import store from "../Redux/store"
// require("dotenv").config();
const { REACT_APP_DEV, REACT_APP_PRO, NODE_ENV } = process.env;
const baseUrl = "https://pghenry.herokuapp.com/";
// npm start for dev mode and npm run build for production mode
// set in .env file your base url for dev and production on client side root directory
// pd: it should starts with REACT_APP_

export const axiosWithCredentials = axios.create({
    baseURL: process.env.REACT_APP_API || baseUrl,// change this to "https://pghenry.herokuapp.com/" to work with deplyed DB
    /* withCredentials: true, */
})

axiosWithCredentials.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return error;
})
