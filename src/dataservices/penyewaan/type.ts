import { Pagination } from "../alat/type";

export interface Penyewaan {
  penyewaan_id: number;
  penyewaan_nama: string;
  penyewaan_hargaperhari: number;
  gambar_utama: string;
  pelanggan_id: number;
  penyewaan_tglsewa: string;
  penyewaan_tglkembali: string;
  penyewaan_sttspembayaran: string;
  penyewaan_sttskembali: string;
  penyewaan_totalharga: number;
  _count: {
    penyewaan_detail: number;
  };
  pelanggan: {
    pelanggan_id: number;
    pelanggan_nama: string;
  };
}

export interface GetPenyewaanResponse {
    success: boolean;
    message: string;
    data: Penyewaan[];
    pagination: Pagination;
}