import type { ICategoryWithProducts } from "@/interface/Category";
import type { Axios } from "axios";

export class HttpGetCategory {
    private axios: Axios;
    private baseUrl: string;

    constructor(axiosInstance: Axios, baseUrl: string) {
        this.axios = axiosInstance;
        this.baseUrl = baseUrl;
    }

    async getAllCategoryAndProduct(idUser: string): Promise<ICategoryWithProducts> {
        try {
            const { data } = await this.axios.get(`${this.baseUrl}/category`, {
                params: { idUser },
                withCredentials: true,
            });
            return data;
        } catch (error) {
            console.error("Erro ao buscar categorias e produtos:", error);
            throw new Error("Não foi possível buscar as categorias e produtos.");
        }
    }
}
