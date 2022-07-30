import axios from "axios";


export const serverURL = 'http://localhost:5555';
// export const serverURL = 'https://khinkali-counter-server.herokuapp.com/';
export const instance = axios.create({
    baseURL: serverURL,
})