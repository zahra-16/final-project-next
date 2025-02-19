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
import { error } from "console";

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
  }[]; // Tambahkan ini!
}



export default function Penyewaan() {
  const [alatData, setAlatData] = useState<PenyewaanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    penyewaan_pelanggan_id: "",
    penyewaan_tglkembali: "",
    penyewaan_sttspembayaran: "BELUM_DIBAYAR",
    penyewaan_sttskembali: "BELUM_KEMBALI",
    daftar_alat: [{ alat_id: "", jumlah: "" }],
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
    alat_hargaperhari: ""
  });

  // Fetch data dari API
  const fetchData = async () => {
    try {
      const response = await fetch("https://penyewaan.vercel.app/api/v1/penyewaan");
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAlatChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAlat = [...formData.daftar_alat];
    updatedAlat[index][name] = value;
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
      const response = await fetch("https://penyewaan.vercel.app/api/v1/penyewaan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`,
        },
        body: JSON.stringify({
          ...formData,
          penyewaan_totalharga: parseInt(formData.penyewaan_totalharga),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setAlatData([...alatData, result.data]);
        alert("Data berhasil disimpan!");
        setIsModalOpen(false);
        setFormData({
          penyewaan_id: 0,
          penyewaan_pelanggan_id: 0,
          penyewaan_tglkembali: "",
          penyewaan_sttspembayaran: "",
          penyewaan_sttskembali: "",
          alat_id: 0,
          jumlah: 0,
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
  const handleEditClick = (penyewaan) => {
    setFormData({
      penyewaan_id: penyewaan.penyewaan_id,
      penyewaan_pelanggan_id: penyewaan.penyewaan_pelanggan_id,
      penyewaan_tglkembali: penyewaan.penyewaan_tglkembali,
      penyewaan_sttspembayaran: penyewaan.penyewaan_sttspembayaran,
      penyewaan_sttskembali: penyewaan.penyewaan_sttskembali,
    });
    setIsEditModalOpen(true); // Buka modal
  };
  
  
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await fetch(`https://penyewaan.vercel.app/api/v1/penyewaan/${formData.penyewaan_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`,
        },
        body: JSON.stringify({
          ...formData,
          penyewaan_totalharga: parseInt(formData.penyewaan_totalharga),
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setAlatData(
          alatData.map((alat) => (alat.penyewaan_id === formData.penyewaan_id ? result.data : alat))
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
    setFormData({
      penyewaan_id: 0,
      penyewaan_pelanggan_id: 0,
      penyewaan_tglkembali: "",
      penyewaan_sttspembayaran: "",
      penyewaan_sttskembali: "",


    });
  };  
  

  // Handle click on 'Detail' button or item
  const fetchPenyewaanDetail = async (id) => {
    try {
      const response = await axios.get(`https://penyewaan.vercel.app/api/v1/penyewaan/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`
        }
      });
      
      const penyewaan = response.data.data;
      console.log(penyewaan)
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
        alat_deskripsi: penyewaan.penyewaan_detail[0]?.alat.alat_deskripsi || "-",
        alat_hargaperhari: penyewaan.penyewaan_detail[0]?.alat.alat_hargaperhari.toString() || "-"
      });
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleDetailClick = (id) => {
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
      alat_hargaperhari: ""
    });
  };



  // hapus
  const handleDelete = async (penyewaanId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await fetch(`https://penyewaan.vercel.app/api/v1/penyewaan/${penyewaanId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5NTc2NzQsImV4cCI6MTczOTk2ODQ3NH0.J7ZAtTMoeR2iyhrnD25mZbB1v9o_P98ERUknCRmFWlfR8hQzS_enogL5KKo18puJyniGngoFg795nN1MtOy7WAzZb8bZZqRhgbi2zN0hbEpKJNwvZECfJT2PJ5N-ZKBRd8LUTDlgveJ2pEFC9xHk1ZygKIDNeJMQBenyNlPjAheKIUtniFzWhs8LJzfbkCS_fXZdKNHtt4mxw_-ipoXSg6_wQE1aJpJVIEaOz8NQHY3jlFJ5hXoRcZ27F_Gb2TGDyNw0neD97LS54RwSewBMbv28PP3bWV5HoTl1V6OHqhYJBaX8U7JSjxO0jBklLNBNCjfq8cGpPPgByufmquLMw3Zc01oeIBM4Rzijfepy5ORjRF7cveV5EDHfzswAXjl2Q4H6bt2LRX-jM0ZRvCqz7Jy9Xnq0L1x5XU8x_QdcH0BPnNNx6oPT-u3qCbDzibiBc0kH13n-pwChaoJ1dnoTCyWeKnhkRO3WqfRpq8ZMqS2jcgi3CiCe-XtNLIXEgov2qhI9PAMu5BEI0k9odiGptueB8CUjTxa2npOTbsM9gUHnVgJ5b6Lv0BDWIcN-pzpCqVbWdxhqTNTxFccPT8MhzbFWVFucZW-eRRlhgEAs2bzRe3P4V1M6FOHb-8E6wRiCIXEVw9sBEh_tuw9TtM7GfCI3FmFtis8bRPkIqQrSAT4`,
          },
        });
  
        if (!response.ok) {
          console.error("Gagal menghapus data: Server tidak merespon dengan benar.");
          alert("Gagal menghapus data!");
          return;
        }
  
        const result = await response.text();
        try {
          const jsonResult = result ? JSON.parse(result) : {};
          if (response.ok) {
            setAlatData(alatData.filter(penyewaan => penyewaan.penyewaan_id !== penyewaanId));
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
        <Button className="bg-[#A27B5C] hover:bg-[#DCD7C9] rounded-md" onClick={() => setIsModalOpen(true)}>
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
                <Chip color={penyewaan.penyewaan_sttspembayaran === "Belum Dibayar" ? "danger" : "success"}>
                  {penyewaan.penyewaan_sttspembayaran}
                </Chip>
              </TableCell>
              <TableCell>{penyewaan.penyewaan_sttskembali}</TableCell>
              <TableCell>Rp {parseInt(penyewaan.penyewaan_totalharga).toLocaleString()}</TableCell>
              <TableCell>
                <Tooltip content="Edit Data">
                  <Button onClick={() => handleEditClick(penyewaan.penyewaan_id)} variant="light" className="bg-[#A27B5C] hover:bg-[#DCD7C9] rounded-lg">Edit</Button>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip content="Detail">
                  <Button  id="detail" onClick={() => handleDetailClick(penyewaan.penyewaan_id)} variant="light" className="bg-[#A27B5C] hover:bg-[#DCD7C9] rounded-lg">Detail</Button>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip content="Delete Data">
                  <Button  onClick={() => handleDelete(penyewaan.penyewaan_id)} variant="light" className="bg-red-600 hover:bg-[#DCD7C9] rounded-lg">Delete</Button>
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
        <Input name="penyewaan_pelanggan_id" value={formData.penyewaan_pelanggan_id} onChange={handleChange} />
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
        <Input name="penyewaan_sttspembayaran" value={formData.penyewaan_sttspembayaran} onChange={handleChange} />
      </div>

      {/* Status Kembali */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium">Status Kembali</label>
        <Input name="penyewaan_sttskembali" value={formData.penyewaan_sttskembali} onChange={handleChange} />
      </div>

      {/* Daftar Alat */}
      {formData?.daftar_alat?.map((alat, index) => (
        <div key={index} className="space-y-2">
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Alat ID</label>
            <Input
              name="alat_id"
              value={alat.alat_id}
              onChange={(e) => handleAlatChange(e, index)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Jumlah</label>
            <Input
              name="jumlah"
              value={alat.jumlah}
              onChange={(e) => handleAlatChange(e, index)}
            />
          </div>
        </div>
      ))}
    </div>
    </ModalBody>
    <ModalFooter>
      <Button variant="light" onClick={() => setIsModalOpen(false)}>Batal</Button>
      <Button onClick={handleSubmit} className="bg-[#A27B5C] hover:bg-[#DCD7C9]">Simpan</Button>
    </ModalFooter>
  </ModalContent>
</Modal>


{/* edit */}
<Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <ModalContent>
          <ModalHeader>Edit penyewaan</ModalHeader>
          <ModalBody  className="bg-[#f8f8f8] p-4 rounded-lg shadow-md">
          <p className="text-center mb-4">Form Edit penyewaann</p>

<div className="space-y-4">
  {/* ID Pelanggan */}
  <div className="flex flex-col">
    <label className="mb-2 font-medium">ID Pelanggan</label>
    <Input name="penyewaan_pelanggan_id" value={formData.penyewaan_pelanggan_id} onChange={handleChange} />
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
    <Input name="penyewaan_sttspembayaran" value={formData.penyewaan_sttspembayaran} onChange={handleChange} />
  </div>

  {/* Status Kembali */}
  <div className="flex flex-col">
    <label className="mb-2 font-medium">Status Kembali</label>
    <Input name="penyewaan_sttskembali" value={formData.penyewaan_sttskembali} onChange={handleChange} />
  </div>

</div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setIsEditModalOpen(false)}>Batal</Button>
            <Button onClick={handleSubmitEdit} className="bg-[#A27B5C] hover:bg-[#DCD7C9]">Simpan Perubahan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


<Modal isOpen={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
  <ModalContent>
    <ModalHeader>Detail Penyewaan</ModalHeader>
    <ModalBody className="bg-[#f8f8f8] p-4 rounded-lg shadow-md">
      <p><strong>ID Pelanggan:</strong> {DetailData.penyewaan_pelanggan_id}</p>
      <p><strong>Nama Pelanggan:</strong> {DetailData.penyewaan_pelanggan_nama}</p>
      <p><strong>Alamat Pelanggan:</strong> {DetailData.penyewaan_pelanggan_alamat}</p>
      <p><strong>Tanggal Sewa:</strong> {DetailData.penyewaan_tglsewa}</p>
      <p><strong>Tanggal Kembali:</strong> {DetailData.penyewaan_tglkembali}</p>
      <p><strong>Status Pembayaran:</strong> {DetailData.penyewaan_sttspembayaran}</p>
      <p><strong>Status Kembali:</strong> {DetailData.penyewaan_sttskembali}</p>
      <p><strong>Total Harga:</strong> {DetailData.penyewaan_totalharga}</p>
      <hr className="my-2" />
      <h4 className="font-bold">Detail Alat</h4>
      <p><strong>Nama Alat:</strong> {DetailData.alat_nama}</p>
      <p><strong>Deskripsi:</strong> {DetailData.alat_deskripsi}</p>
      <p><strong>Harga Per Hari:</strong> {DetailData.alat_hargaperhari}</p>
      <button id="close" onClick={handleCloseDetailModal}>Close</button>
    </ModalBody>
    <ModalFooter></ModalFooter>
  </ModalContent>
</Modal>


    </div>
  );
}
