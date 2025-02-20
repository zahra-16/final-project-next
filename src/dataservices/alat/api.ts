"use client";

import axios from "axios";
import { GetAlatResponse, GetAlatResponseOne, NewAlat, UpdatedAlat } from "./type";

const API_BASE_URL = "https://penyewaan.vercel.app/api/v1";

// Fungsi untuk mengambil data alat
export const fetchAlat = async (): Promise<GetAlatResponse> => {
  try {
    const response = await axios.get<GetAlatResponse>(`${API_BASE_URL}/alat`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data alat:", error);
    throw new Error("Gagal mengambil data alat");
  }
};

export const getAlat = async (limit: number, searchTerm: string): Promise<GetAlatResponse> => {
  try {
    const response = await axios.get<GetAlatResponse>(`${API_BASE_URL}/alat`, {
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

export const fetchAlatById = async (alatId: number): Promise<GetAlatResponseOne> => {
  try {
    const response = await axios.get<GetAlatResponseOne>(`${API_BASE_URL}/alat/${alatId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Gagal mengambil detail alat:", error);
    throw new Error("Gagal mengambil detail alat");
  }
};

// Fungsi untuk menghapus alat
export const deleteAlat = async (alatId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/alat/${alatId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`, // Ganti dengan token yang sesuai
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Gagal menghapus alat:", error);
    throw new Error("Gagal menghapus alat");
  }
};

// Fungsi untuk mengedit alat

export const editAlat = async (alatId: number, updatedAlat: UpdatedAlat): Promise<void> => {
  try {
    const payload = {
      alat_nama: updatedAlat.alat_nama,
      alat_deskripsi: updatedAlat.alat_deskripsi,
      alat_hargaperhari: updatedAlat.alat_hargaperhari,
      alat_stok: updatedAlat.alat_stok,
      alat_kategori_id: updatedAlat.alat_kategori_id,
    };
    await axios.patch(`${API_BASE_URL}/alat/${alatId}`, payload, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`, // Ganti dengan token yang sesuai
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Gagal mengedit alat:", error);
    throw new Error("Gagal mengedit alat");
  }
};


// Fungsi untuk menambah alat
export const addAlat = async (newAlat: NewAlat) => {
  try {
    const payload = {
      alat_nama: newAlat.alat_nama,
      alat_deskripsi: newAlat.deskripsi,
      alat_hargaperhari: newAlat.hargaPerHari,
      alat_stok: newAlat.stok,
      alat_kategori_id: newAlat.kategoriId,
    };
    const response = await axios.post(`${API_BASE_URL}/alat`, payload, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`, // Ganti dengan token yang sesuai
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error response from API:", error);
    throw new Error("Gagal menambahkan alat");
  }
};

// Fungsi untuk mengunggah gambar alat
export const uploadAlatImage = async (alatId: number, imageFile: File): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("gambar_utama", imageFile);

    await axios.post(`${API_BASE_URL}/alat/${alatId}/gambar`, formData, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`, // Ganti dengan token yang sesuai
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Gagal mengunggah gambar alat:", error);
    throw new Error("Gagal mengunggah gambar alat");
  }
};

// Fungsi untuk mengambil data alat berdasarkan kategori
export const getToolsByCategoryId = async (categoryId: number): Promise<GetAlatResponse> => {
  try {
    const response = await axios.get<GetAlatResponse>(`${API_BASE_URL}/alat?kategori_id=${categoryId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data alat berdasarkan kategori:", error);
    throw new Error("Gagal mengambil data alat berdasarkan kategori");
  }
};
