import axios from "axios";
require("dotenv").config();

export const axiosWithCredentials = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true,
})

axiosWithCredentials.interceptors.response.use((response) => {
    console.log(response);
}, (error) => {
    console.log(error);
})

axiosWithCredentials.interceptors.request.use((config) => {
    const url = config.url.split("/");
    console.log(url);
    // let level;

    // if (url.includes("admin")) {
    //     level = 3;
    // } else if (url.includes("user")) {
    //     level = 2;
    // } else {
    //     level = 1;
    // }

    config.headers.common["Permits"] = `Level ${1}`;
})
