import { AxiosResponse, AxiosError } from "axios";
import AxiosServices from "@/utils/axiosServices";
import useSWR from "swr";

export interface CustomAxiosResponse<T = any> {
    isLoading: boolean;
    error?: AxiosError;
    data: AxiosResponse<T>["data"];
}

const fetchData = async <T = any>(url: string, params: Record<string, number | string> = {}) => {
    const res: AxiosResponse<T> = await AxiosServices.get(url, params);
    return res.data;
};

const useAxios = (url: string, params: Record<string, number | string> = {}) => {
    const { data, error, isLoading } = useSWR([url, params], ([url, params]) =>
        fetchData(url, params)
    );

    return { data, error, isLoading };
};

export { useAxios, fetchData };
