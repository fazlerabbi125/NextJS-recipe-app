import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/api",
    headers: {
        "X-RapidAPI-Key": "d052de18ccmsh987128f91545609p1a60c6jsn4deaea0deebd",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
});

const AxiosServices = {
    get: async function <P extends Record<string, any>>(
        url: string,
        queryParams: P = {} as P,
        config?: AxiosRequestConfig
    ) {
        return axiosInstance.get(url, {
            ...config,
            params: queryParams,
        });
    },
    post: async function <B extends Record<string, any>>(
        url: string,
        body: B,
        config?: AxiosRequestConfig<B>
    ) {
        return axiosInstance.post(url, body, config);
    },
    update: async function <B extends Record<string, any>, P extends Record<string, any>>(
        url: string,
        body: B,
        queryParams: P = {} as P,
        config?: AxiosRequestConfig<B>
    ) {
        return axiosInstance.patch(url, body, {
            ...config,
            params: queryParams,
        });
    },
    delete: async function <P extends Record<string, any>>(
        url: string,
        queryParams: P = {} as P,
        config?: AxiosRequestConfig
    ) {
        return axiosInstance.delete(url, {
            ...config,
            params: queryParams,
        });
    },
};

export default AxiosServices;
