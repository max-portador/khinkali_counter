import axios from "axios";


export const serverURL = 'http://localhost:5555';
export const instance = axios.create({
    baseURL: serverURL,
})