import axios from "axios";
// import { setAuthLevel } from "../Redux/Actions/actions";
// import store from "../Redux/store"
// require("dotenv").config();

export const axiosWithCredentials = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true,
})

axiosWithCredentials.interceptors.response.use((response) => {
    console.log(response.data);
    // if (response.data.isAdmin) {
    //     store.dispatch(setAuthLevel(3));
    // } else if (response.data.isUser) {
    //     store.dispatch(setAuthLevel(2));
    // } else if ((response.data.hasOwnProperty("isUser") && response.data.hasOwnProperty("isAdmin")) && (!response.data.isUser && !response.data.isAdmin)) {
    //     store.dispatch(setAuthLevel(1));
    // }
    return response;
}, (error) => {
    let url = error.response.config.url.split("/")[1];
    if (url === "api") {
        window.location.href = "/";
    }
    return error;
})

// axiosWithCredentials.interceptors.request.use((config) => {
//     const url = config.url.split("/")[1];
//     let level = 1;

//     if (url === "admin") {
//         level = 3;
//     } else if (url === "user") {
//         level = 2;
//     }

//     config.headers.common["Permits"] = `Level ${level}`;

//     return config;
// })
