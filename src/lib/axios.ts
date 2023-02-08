import axios from "axios";

export const api = axios.create({
    baseURL: 'https://18.229.124.157:443'
})