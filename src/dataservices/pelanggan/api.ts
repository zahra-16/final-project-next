import axios from "axios";
import { GetPelangganResponse } from "./type";

const API_BASE_URL = "https://penyewaan.vercel.app/api/v1";

export const getPelanggan = async (limit: number, searchTerm: string ): Promise<GetPelangganResponse> => {
    try {
      const response = await axios.get<GetPelangganResponse>(`${API_BASE_URL}/pelanggan?search=${searchTerm}`, {
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