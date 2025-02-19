import axios from "axios";
import { GetPenyewaanResponse } from "./type";

const API_BASE_URL = "https://penyewaan.vercel.app/api/v1";

export const getPenyewaan = async (limit: number, searchTerm: string ): Promise<GetPenyewaanResponse> => {
    try {
      const response = await axios.get<GetPenyewaanResponse>(`${API_BASE_URL}/penyewaan?search=${searchTerm}`, {
        params: {
          limit: limit,
          search: searchTerm,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Gagal mengambil data alat:", error);
      throw new Error("Gagal mengambil data alat");
    }
  };