export interface Alat {
  alat_id: number;
  alat_kategori_id: number;
  alat_nama: string;
  alat_deskripsi: string;
  alat_hargaperhari: number;
  alat_stok: number;
  kategori: Kategori;
  gambar_utama: string;
  _count: {
    total_disewa: number;
  };
}

export interface AlatOne {
    alat_id: number;
    alat_kategori_id: number;
    alat_nama: string;
    alat_deskripsi: string;
    alat_hargaperhari: number;
    alat_stok: number;
    kategori: Kategori;
    gambar_utama: string;
    alat_gambar: {
        alat_id: number;
        gambar_id: number;
        gambar: {
            gambar_id: number;
            gambar: string;
        }
    }[];
    _count: {
      total_disewa: number;
    };
  }

export interface UpdatedAlat {
  alat_nama: string;
  alat_deskripsi: string;
  alat_hargaperhari: number;
  alat_stok: number;
  alat_kategori_id: number;
}

export interface NewAlat {
  alat_nama: string;
  deskripsi: string;
  hargaPerHari: number;
  stok: number;
  kategoriId: number;
}

export interface Kategori {
  kategori_id: number;
  kategori_nama: string;
  _count: {
    alat: number;
  };
}

export interface GetAlatResponse {
  success: boolean;
  message: string;
  data: Alat[];
  pagination: Pagination;
}

export interface GetAlatResponseOne {
  success: boolean;
  message: string;
  data: AlatOne;
  pagination: Pagination;
}

export interface Pagination {
  item: number;
  matchData: number;
  allPage: number;
  currentPage: number;
}
