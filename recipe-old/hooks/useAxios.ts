import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import AxiosServices from "@/utils/axiosServices";
import useSWR from "swr";

export interface CustomAxiosResponse<T = any> {
    isLoading: boolean;
    error?: AxiosError<T>;
    data?: AxiosResponse<T>["data"];
}

const fetchData = async <T = any>(
    url: string,
    params: Record<string, number | string> = {},
    config?: AxiosRequestConfig
) => {
    try {
        const res: AxiosResponse<T> = await AxiosServices.get(url, params, config);
        return res.data;
    } catch (error: any) {
        //returns AxiosError or other error
        //By default, the error thrown inside the fetcher function has type any/unknown.
        console.error(error.message);
        throw error;
    }
};

function useAxios<T = any>(
    url: string,
    params: Record<string, number | string> = {},
    config?: Omit<AxiosRequestConfig, "params">
) {
    const { data, error, isLoading }: CustomAxiosResponse<T> = useSWR(
        [url, params, config],
        ([url, params, config]) => fetchData<T>(url, params, config)
    );

    return { data, error, isLoading };
}

export { useAxios, fetchData };
