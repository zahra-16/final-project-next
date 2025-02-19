import { Pagination } from "../alat/type";

interface Pelanggan {
    pelanggan_id: number;
    pelanggan_nama: string;
    pelanggan_alamat: string;
    pelanggan_notelp: string;
    pelanggan_email: string;
    pelanggan_data_jenis: string;
    pelanggan_data_file: File | null | string;
  }

  export interface GetPelangganResponse {
      success: boolean;
      message: string;
      data: Pelanggan[];
      pagination: Pagination;
  }