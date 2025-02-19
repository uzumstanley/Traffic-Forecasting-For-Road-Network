import axios from "axios";
import {AxiosRequestConfig} from "axios";


export interface All {
    places: string[];
    buildings: string[];
}


const axiosInstance = axios.create({
     baseURL: 'http://localhost:8080',
})

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = async (config: AxiosRequestConfig) => {
        return axiosInstance
            .get<T>(this.endpoint, config)
            .then(res => res.data)
    }
}

export default APIClient;
