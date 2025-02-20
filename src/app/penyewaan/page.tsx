"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@heroui/react";
import axios from "axios";

interface PenyewaanData {
  penyewaan_id: number;
  penyewaan_pelanggan_id: number;
  penyewaan_tglsewa: string;
  penyewaan_tglkembali: string;
  penyewaan_sttspembayaran: "BELUM_DIBAYAR" | "LUNAS" | "DP";
  penyewaan_sttskembali: "SUDAH_KEMBALI" | "BELUM_KEMBALI";
  penyewaan_totalharga: string;
  data_alat: {
    alat_id: number;
    jumlah: number;
  }[];
}

export interface PenyewaanDetail {
  penyewaan_detail_id: number;
  penyewaan_detail_penyewaan_id: number;
  penyewaan_detail_alat_id: number;
  penyewaan_detail_jumlah: number;
  penyewaan_detail_subharga: number;
}

export interface Penyewaan {
  penyewaan_id: number;
  penyewaan_pelanggan_id: number;
  penyewaan_tglsewa: string;
  penyewaan_tglkembali: string;
  penyewaan_sttspembayaran:  "BELUM_DIBAYAR" | "LUNAS" | "DP";
  penyewaan_sttskembali:  "SUDAH_KEMBALI" | "BELUM_KEMBALI";
  penyewaan_totalharga: number;
  penyewaan_detail: PenyewaanDetail[];
}

export default function Penyewaan() {
  const [alatData, setAlatData] = useState<Penyewaan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [penyewaanId, setPenyewaanId] = useState<number>(0);
  const [formData, setFormData] = useState({
    penyewaan_pelanggan_id: 0,
    penyewaan_tglkembali: "",
    penyewaan_sttspembayaran: "BELUM_DIBAYAR",
    penyewaan_sttskembali: "BELUM_KEMBALI",
    daftar_alat: [{ alat_id: 0, jumlah: 0 }],
  });
  const [DetailData, setDetailData] = useState({
    penyewaan_id: "",
    penyewaan_pelanggan_id: "",
    penyewaan_pelanggan_nama: "",
    penyewaan_pelanggan_alamat: "",
    penyewaan_tglsewa: "",
    penyewaan_tglkembali: "",
    penyewaan_sttspembayaran: "",
    penyewaan_sttskembali: "",
    penyewaan_totalharga: "",
    alat_nama: "",
    alat_deskripsi: "",
    alat_hargaperhari: "",
  });

  // Fetch data dari API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://penyewaan.vercel.app/api/v1/penyewaan", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setAlatData(result.data);
      } else {
        console.error("Gagal mengambil data:", result);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleAlatChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedAlat = formData.daftar_alat.map((alat, i) =>
      i === index ? { ...alat, [name]: isNaN(Number(value)) ? value : Number(value) } : alat
    );
  
    setFormData((prev) => ({
      ...prev,
      daftar_alat: updatedAlat,
    }));
  };
  

  // Validasi sebelum submit
  const validateForm = () => {
    if (
      !formData.penyewaan_pelanggan_id ||
      !formData.penyewaan_tglkembali ||
      !formData.penyewaan_sttspembayaran ||
      !formData.penyewaan_sttskembali
    ) {
      alert("Semua field harus diisi!");
      return false;
    }
    return true;
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        "https://penyewaan.vercel.app/api/v1/penyewaan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`,
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setAlatData([...alatData, result.data]);
        alert("Data berhasil disimpan!");
        setIsModalOpen(false);
        setFormData({
          penyewaan_pelanggan_id: 0,
          penyewaan_tglkembali: "",
          penyewaan_sttspembayaran: "",
          penyewaan_sttskembali: "",
          daftar_alat: [],
        });
      } else {
        console.error("Gagal menyimpan data:", result.errors);
        alert(`Gagal menyimpan data! ${JSON.stringify(result.errors)}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat menyimpan data!");
    }
  };

  // edit
  const handleEditClick = (penyewaan: Penyewaan) => {
    setPenyewaanId(penyewaan.penyewaan_id);
    setFormData({
      penyewaan_pelanggan_id: penyewaan.penyewaan_pelanggan_id,
      penyewaan_tglkembali: penyewaan.penyewaan_tglkembali,
      penyewaan_sttspembayaran: penyewaan.penyewaan_sttspembayaran,
      penyewaan_sttskembali: penyewaan.penyewaan_sttskembali,
      daftar_alat: penyewaan.penyewaan_detail.map(
        (item: {
          penyewaan_detail_alat_id: number;
          penyewaan_detail_jumlah: number;
        }) => {
          return {
            alat_id: item.penyewaan_detail_alat_id,
            jumlah: item.penyewaan_detail_jumlah,
          };
        }
      ),
    });
    setIsEditModalOpen(true); // Buka modal
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        `https://penyewaan.vercel.app/api/v1/penyewaan/${penyewaanId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`,
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setAlatData(
          alatData.map((alat) =>
            alat.penyewaan_id === penyewaanId ? result.data : alat
          )
        );
        alert("Data berhasil diperbarui!");
        setIsEditModalOpen(false);
        resetFormData();
      } else {
        console.error("Gagal memperbarui data:", result.errors);
        alert(`Gagal memperbarui data! ${JSON.stringify(result.errors)}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat memperbarui data!");
    }
  };

  const resetFormData = () => {
    setPenyewaanId(0);
    setFormData({
      penyewaan_pelanggan_id: 0,
      penyewaan_tglkembali: "",
      penyewaan_sttspembayaran: "",
      penyewaan_sttskembali: "",
      daftar_alat: []
    });
  };

  // Handle click on 'Detail' button or item
  const fetchPenyewaanDetail = async (id: number) => {
    try {
      const response = await axios.get(
        `https://penyewaan.vercel.app/api/v1/penyewaan/${id}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`,
          },
        }
      );

      const penyewaan = response.data.data;
      console.log(penyewaan);
      setDetailData({
        penyewaan_id: penyewaan.penyewaan_id,
        penyewaan_pelanggan_id: penyewaan.pelanggan.pelanggan_id,
        penyewaan_pelanggan_nama: penyewaan.pelanggan.pelanggan_nama,
        penyewaan_pelanggan_alamat: penyewaan.pelanggan.pelanggan_alamat,
        penyewaan_tglsewa: penyewaan.penyewaan_tglsewa,
        penyewaan_tglkembali: penyewaan.penyewaan_tglkembali,
        penyewaan_sttspembayaran: penyewaan.penyewaan_sttspembayaran,
        penyewaan_sttskembali: penyewaan.penyewaan_sttskembali,
        penyewaan_totalharga: penyewaan.penyewaan_totalharga.toString(),
        alat_nama: penyewaan.penyewaan_detail[0]?.alat.alat_nama || "-",
        alat_deskripsi:
          penyewaan.penyewaan_detail[0]?.alat.alat_deskripsi || "-",
        alat_hargaperhari:
          penyewaan.penyewaan_detail[0]?.alat.alat_hargaperhari.toString() ||
          "-",
      });
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleDetailClick = (id: number) => {
    fetchPenyewaanDetail(id);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setDetailData({
      penyewaan_id: "",
      penyewaan_pelanggan_id: "",
      penyewaan_pelanggan_nama: "",
      penyewaan_pelanggan_alamat: "",
      penyewaan_tglsewa: "",
      penyewaan_tglkembali: "",
      penyewaan_sttspembayaran: "",
      penyewaan_sttskembali: "",
      penyewaan_totalharga: "",
      alat_nama: "",
      alat_deskripsi: "",
      alat_hargaperhari: "",
    });
  };

  // hapus
  const handleDelete = async (penyewaanId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await fetch(
          `https://penyewaan.vercel.app/api/v1/penyewaan/${penyewaanId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMjA1ODcsImV4cCI6MTc0MDYyNTM4N30.d4rh1njreViNow5x_lc3I6L4EW6L_8YqUT6Drjhi7C77gQ3A1PcoX76Sk2gpAQa_HVfCL3b94s8TSHIxa_HG9y3s018eM_Zvyr9lFKxv3e0WqQ26jmvBBh9oR6PZLpbd7uBhISCDTcEK88wSvbgM4Mw7pgKsttSqfw4SHh_ulQQIBEtSIdBH9JsvNOoHqw6u6QO5FpNYNWuxhQ-NFuiCdyvqMsJmnCFddKTrP1Z5lIn_Rr4vDrAQdMwv6g27ijFE9BHtemOfnRT07ilB8yx-JP_586s4BFTwgxiqk8-fiNF9Owv0ZHm3z6-1ihgNgy3acsYdbMcj8AkA2schGZVcAWscx9lz-N32GemmUC3VVjCexPalt6DH7leYD4a6Dp3os-w3SRKzlTaxP1HNNqNwHX3oEef6n_N-pufyX6zrpwd1_-GKaUi_JNDKT7EUi9Hra94quuuAXkcJJoqX8MneLtDfBKg1zkNnbDjHpg3Gh7iVpjwLrvt37ypIDWF-809BHX11GfCta0xlTaa-CMFoJCTcdV5NbRiSZewDYnkprUEWP8xX56qVc3P8C9mEP4BCAcWzV9am7p6cXGCNwaYg2hGXfH5zqlypLgJyQ22F1VenHOz7GVYs9qvmzz5JzID0kEBjIMiJzAUO4_mIWUkDFPWQKcQwDzPxscYgmPO3tug`,
            },
          }
        );

        if (!response.ok) {
          console.error(
            "Gagal menghapus data: Server tidak merespon dengan benar."
          );
          alert("Gagal menghapus data!");
          return;
        }

        const result = await response.text();
        try {
          const jsonResult = result ? JSON.parse(result) : {};
          if (response.ok) {
            setAlatData(
              alatData.filter(
                (penyewaan) => penyewaan.penyewaan_id !== penyewaanId
              )
            );
            alert("Data berhasil dihapus!");
          } else {
            console.error("Gagal menghapus data:", jsonResult.errors || result);
            alert("Gagal menghapus data!");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Terjadi kesalahan saat memproses data!");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat menghapus data:", error);
        alert("Terjadi kesalahan saat menghapus data!");
      }
    }
  };
  return (
    <div className="container mx-auto p-6 pt-24 min-h-screen">
      <div className="mb-6 flex justify-end">
        <Button
          className="bg-[#A27B5C] hover:bg-[#DCD7C9] rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Tambah Penyewaan
        </Button>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Table aria-label="Daftar Penyewaan Alat">
          <TableHeader>
            <TableColumn>ID Pelanggan</TableColumn>
            <TableColumn>Tanggal Sewa</TableColumn>
            <TableColumn>Tanggal Kembali</TableColumn>
            <TableColumn>Status Pembayaran</TableColumn>
            <TableColumn>Status Kembali</TableColumn>
            <TableColumn>Total Harga</TableColumn>
            <TableColumn>Edit</TableColumn>
            <TableColumn>Detail</TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableHeader>
          <TableBody>
            {alatData.map((penyewaan) => (
              <TableRow key={penyewaan.penyewaan_id}>
                <TableCell>{penyewaan.penyewaan_pelanggan_id}</TableCell>
                <TableCell>{penyewaan.penyewaan_tglsewa}</TableCell>
                <TableCell>{penyewaan.penyewaan_tglkembali}</TableCell>
                <TableCell>
                  <Chip
                    color={
                      penyewaan.penyewaan_sttspembayaran === "BELUM_DIBAYAR"
                        ? "danger"
                        : "success"
                    }
                  >
                    {penyewaan.penyewaan_sttspembayaran}
                  </Chip>
                </TableCell>
                <TableCell>{penyewaan.penyewaan_sttskembali}</TableCell>
                <TableCell>
                  Rp {penyewaan.penyewaan_totalharga.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Tooltip content="Edit Data">
                    <Button
                      onClick={() => handleEditClick(penyewaan)}
                      variant="light"
                      className="bg-[#3F4F44] text-white hover:bg-[#DCD7C9] hover:text-black rounded-xl"
                    >
                      Edit
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip content="Detail">
                    <Button
                      id="detail"
                      onClick={() => handleDetailClick(penyewaan.penyewaan_id)}
                      variant="light"
                      className="bg-[#A27B5C] hover:bg-[#DCD7C9] rounded-lg"
                    >
                      Detail
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip content="Delete Data">
                    <Button
                      onClick={() => handleDelete(penyewaan.penyewaan_id)}
                      variant="light"
                      className="bg-red-800 text-white hover:bg-[#C2B8A3] rounded-lg"
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>Tambah Penyewaan Baru</ModalHeader>
          <ModalBody className="bg-[#f8f8f8] p-4 rounded-lg shadow-md">
            <div className="space-y-4">
              {/* ID Pelanggan */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">ID Pelanggan</label>
                <Input
                  name="penyewaan_pelanggan_id"
                  value={formData.penyewaan_pelanggan_id.toString()}
                  onChange={handleChange}
                />
              </div>

              {/* Tanggal Kembali */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Tanggal Kembali</label>
                <input
                  type="date"
                  name="penyewaan_tglkembali"
                  value={formData.penyewaan_tglkembali}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>

              {/* Status Pembayaran */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Status Pembayaran</label>
                <Input
                  name="penyewaan_sttspembayaran"
                  value={formData.penyewaan_sttspembayaran}
                  onChange={handleChange}
                />
              </div>

              {/* Status Kembali */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Status Kembali</label>
                <Input
                  name="penyewaan_sttskembali"
                  value={formData.penyewaan_sttskembali}
                  onChange={handleChange}
                />
              </div>

              {/* Daftar Alat */}
              {formData?.daftar_alat?.map((alat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium">Alat ID</label>
                    <Input
                      name="alat_id"
                      value={alat.alat_id.toString()}
                      onChange={(e) => handleAlatChange(e, index)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-medium">Jumlah</label>
                    <Input
                      name="jumlah"
                      value={alat.jumlah.toString()}
                      onChange={(e) => handleAlatChange(e, index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#A27B5C] hover:bg-[#DCD7C9]"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* edit */}
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <ModalContent>
          <ModalHeader>Edit penyewaan</ModalHeader>
          <ModalBody className="bg-[#f8f8f8] p-4 rounded-lg shadow-md">
            <p className="text-center mb-4">Form Edit penyewaann</p>

            <div className="space-y-4">
              {/* ID Pelanggan */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">ID Pelanggan</label>
                <Input
                  name="penyewaan_pelanggan_id"
                  value={formData.penyewaan_pelanggan_id.toString()}
                  onChange={handleChange}
                />
              </div>

              {/* Tanggal Kembali */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Tanggal Kembali</label>
                <input
                  type="date"
                  name="penyewaan_tglkembali"
                  value={formData.penyewaan_tglkembali}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>

              {/* Status Pembayaran */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Status Pembayaran</label>
                <Input
                  name="penyewaan_sttspembayaran"
                  value={formData.penyewaan_sttspembayaran}
                  onChange={handleChange}
                />
              </div>

              {/* Status Kembali */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Status Kembali</label>
                <Input
                  name="penyewaan_sttskembali"
                  value={formData.penyewaan_sttskembali}
                  onChange={handleChange}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setIsEditModalOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleSubmitEdit}
              className="bg-[#A27B5C] hover:bg-[#DCD7C9]"
            >
              Simpan Perubahan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <ModalContent>
          <ModalHeader>Detail Penyewaan</ModalHeader>
          <ModalBody className="bg-[#f8f8f8] p-4 rounded-lg shadow-md">
            <p>
              <strong>ID Pelanggan:</strong> {DetailData.penyewaan_pelanggan_id}
            </p>
            <p>
              <strong>Nama Pelanggan:</strong>{" "}
              {DetailData.penyewaan_pelanggan_nama}
            </p>
            <p>
              <strong>Alamat Pelanggan:</strong>{" "}
              {DetailData.penyewaan_pelanggan_alamat}
            </p>
            <p>
              <strong>Tanggal Sewa:</strong> {DetailData.penyewaan_tglsewa}
            </p>
            <p>
              <strong>Tanggal Kembali:</strong>{" "}
              {DetailData.penyewaan_tglkembali}
            </p>
            <p>
              <strong>Status Pembayaran:</strong>{" "}
              {DetailData.penyewaan_sttspembayaran}
            </p>
            <p>
              <strong>Status Kembali:</strong>{" "}
              {DetailData.penyewaan_sttskembali}
            </p>
            <p>
              <strong>Total Harga:</strong> {DetailData.penyewaan_totalharga}
            </p>
            <hr className="my-2" />
            <h4 className="font-bold">Detail Alat</h4>
            <p>
              <strong>Nama Alat:</strong> {DetailData.alat_nama}
            </p>
            <p>
              <strong>Deskripsi:</strong> {DetailData.alat_deskripsi}
            </p>
            <p>
              <strong>Harga Per Hari:</strong> {DetailData.alat_hargaperhari}
            </p>
            
          </ModalBody>
          <ModalFooter><button id="close" onClick={handleCloseDetailModal} className="rounded-md bg-[#A27B5C] hover:bg-[#C2B8A3] mr-4 p-2 px-9 ">Close</button></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
