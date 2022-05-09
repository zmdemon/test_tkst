import axios from 'axios';
import Cookies from 'js-cookie';

export const pathname: string = "http://localhost:3004/"

export const instance = axios.create({});

instance.interceptors.request.use(config => {
    if (Cookies.get('access')) {
        config.headers!.Authorization = 'Bearer ' + Cookies.get('access');
    }
    return config;
});