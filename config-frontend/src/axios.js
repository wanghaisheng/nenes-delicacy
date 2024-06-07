import axios from "axios";

export default axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
});


export const primaryURL = axios.create({
    baseURL:`${import.meta.env.VITE_SERVER_URL}`
});