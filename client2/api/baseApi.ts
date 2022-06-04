import axios from "axios";


export const URL = 'http://localhost:5555';
export const instance = axios.create({
    baseURL: URL,
    // timeout: 60000,
    // httpsAgent: new https.Agent({ keepAlive: true }),
})