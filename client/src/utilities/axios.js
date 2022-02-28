import axios from "axios";
// require("dotenv").config();

export const axiosWithCredentials = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true,
})

axiosWithCredentials.interceptors.response.use((response) => {
    console.log(response);
    return response;
}, (error) => {
    console.log(error);
    return error;
})

axiosWithCredentials.interceptors.request.use((config) => {
    const url = config.url.split("/")[1];
    let level = 1;

    if (url === "admin") {
        level = 3;
    } else if (url === "user") {
        level = 2;
    }

    config.headers.common["Permits"] = `Level ${level}`;

    return config;
})
