import axios from "axios";
import { GetPenyewaanResponse } from "./type";

const API_BASE_URL = "https://penyewaan.vercel.app/api/v1";
const API_KEY = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q";

export const getPenyewaan = async (limit: number, searchTerm: string): Promise<GetPenyewaanResponse> => {
  try {
    const response = await axios.get<GetPenyewaanResponse>(`${API_BASE_URL}/penyewaan?search=${searchTerm}`, {
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
