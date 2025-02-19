export interface Alat {
    alat_id: number;
    alat_kategori_id: number;
    alat_nama: string;
    alat_deskripsi: string;
    alat_hargaperhari: number;
    alat_stok: number;
    kategori: Kategori;
    _count: {
        total_disewa: number;
    };
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

export interface Pagination {
    item: number;
    matchData: number;
    allPage: number;
    currentPage: number;
}
