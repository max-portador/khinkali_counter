import axios from "axios";


export const URL = 'http://localhost:5555';
export const instance = axios.create({
    baseURL: URL,
})