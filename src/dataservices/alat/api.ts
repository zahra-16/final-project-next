"use client";

import axios from "axios";
import { GetAlatResponse } from "./type";

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

export const fetchAlatById = async (alatId: number): Promise<GetAlatResponse> => {
  try {
    const response = await axios.get<GetAlatResponse>(`${API_BASE_URL}/alat/${alatId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`, // Ganti dengan token yang sesuai
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Gagal menghapus alat:", error);
    throw new Error("Gagal menghapus alat");
  }
};

// Fungsi untuk mengedit alat

export const editAlat = async (alatId: number, updatedAlat): Promise<void> => {
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`, // Ganti dengan token yang sesuai
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Gagal mengedit alat:", error);
    throw new Error("Gagal mengedit alat");
  }
};


// Fungsi untuk menambah alat
export const addAlat = async (newAlat) => {
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`, // Ganti dengan token yang sesuai
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error response from API:", error.response);
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`, // Ganti dengan token yang sesuai
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data alat berdasarkan kategori:", error);
    throw new Error("Gagal mengambil data alat berdasarkan kategori");
  }
};
