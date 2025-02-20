import axios from "axios";
import { GetPelangganResponse } from "./type";

const API_BASE_URL = "https://penyewaan.vercel.app/api/v1";
const API_KEY = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug";

export const getPelanggan = async (limit: number, searchTerm: string ): Promise<GetPelangganResponse> => {
    try {
      const response = await axios.get<GetPelangganResponse>(`${API_BASE_URL}/pelanggan?search=${searchTerm}`, {
        params: {
          limit: limit,
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Gagal mengambil data alat:", error);
      throw new Error("Gagal mengambil data alat");
    }
  };