import axios from "axios";
require("dotenv").config();

export const axiosWithCredentials = axios.create({
    baseURL: process.env.REAC_APP_API,
    withCredentials: true,
})

axiosWithCredentials.interceptors.response.use((response) => {
    console.log(response);
}, (error) => {
    console.log(error);
})

axiosWithCredentials.interceptors.request.use((config) => {
    const url = config.url.split("/");
    let level;

    if (url.includes("admin")) {
        level = 3;
    } else if (url.includes("user") || url.includes("product")) {
        level = 2;
    } else {
        level = 1;
    }

    config.headers.common["Authorization"] = `Level ${level}`;
})
