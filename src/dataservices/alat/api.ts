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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`, // Ganti dengan token yang sesuai
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`, // Ganti dengan token yang sesuai
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`, // Ganti dengan token yang sesuai
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`, // Ganti dengan token yang sesuai
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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data alat berdasarkan kategori:", error);
    throw new Error("Gagal mengambil data alat berdasarkan kategori");
  }
};
