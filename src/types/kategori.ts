export interface Kategori {
    kategori_id: number;
    kategori_nama: string;
    _count: {
      alat: number;
    };
  }
  
  export interface GetKategoriResponse {
    success: boolean;
    message?: string;
    data?: Kategori[];
  }
  