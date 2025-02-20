"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
interface Pelanggan {
  pelanggan_id: number;
  pelanggan_nama: string;
  pelanggan_alamat: string;
  pelanggan_notelp: string;
  pelanggan_email: string;
  pelanggan_data_jenis: string;
  pelanggan_data_file: File | null | string;
}

interface GetPelanggan {
  pelanggan_id: number;
  pelanggan_nama: string;
  pelanggan_alamat: string;
  pelanggan_notelp: string;
  pelanggan_email: string;
  pelanggan_data: {
    pelanggan_data_jenis: string;
    pelanggan_data_file: string;
  };
}

export default function App() {
  const [PelangganData, setPelangganData] = useState<GetPelanggan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [formData, setFormData] = useState<Pelanggan>({
    pelanggan_id: 0,
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_notelp: "",
    pelanggan_email: "",
    pelanggan_data_jenis: "",
    pelanggan_data_file: null,
  });

  const pelanggan = async () => {
    try {
      const response = await fetch(
        "https://penyewaan.vercel.app/api/v1/pelanggan", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        console.log(result.data);
        setPelangganData(result.data);
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
    pelanggan();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !formData.pelanggan_nama ||
      !formData.pelanggan_alamat ||
      !formData.pelanggan_notelp ||
      !formData.pelanggan_email ||
      !formData.pelanggan_data_jenis ||
      !formData.pelanggan_data_file
    ) {
      alert("Semua field harus diisi!");
      return false;
    }
    return true;
  };

  const handleSubmitTambah = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("pelanggan_id", formData.pelanggan_id.toString());
      formDataToSend.append("pelanggan_nama", formData.pelanggan_nama);
      formDataToSend.append("pelanggan_alamat", formData.pelanggan_alamat);
      formDataToSend.append("pelanggan_notelp", formData.pelanggan_notelp);
      formDataToSend.append("pelanggan_email", formData.pelanggan_email);
      formDataToSend.append(
        "pelanggan_data_jenis",
        formData.pelanggan_data_jenis
      );
      if (formData.pelanggan_data_file) {
        formDataToSend.append(
          "pelanggan_data_file",
          formData.pelanggan_data_file
        );
      }

      const response = await fetch(
        "https://penyewaan.vercel.app/api/v1/pelanggan",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`,
          },
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setPelangganData([...PelangganData, result.data]);
        alert("Data berhasil disimpan!");
        setIsModalOpen(false);
        setFormData({
          pelanggan_id: 0,
          pelanggan_nama: "",
          pelanggan_alamat: "",
          pelanggan_notelp: "",
          pelanggan_email: "",
          pelanggan_data_jenis: "",
          pelanggan_data_file: null,
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
  const handleEditClick = (pelanggan: GetPelanggan) => {
    setFormData({
      pelanggan_id: pelanggan.pelanggan_id,
      pelanggan_nama: pelanggan.pelanggan_nama,
      pelanggan_alamat: pelanggan.pelanggan_alamat,
      pelanggan_notelp: pelanggan.pelanggan_notelp,
      pelanggan_email: pelanggan.pelanggan_email,
      pelanggan_data_jenis:
        pelanggan.pelanggan_data?.pelanggan_data_jenis || "", // Pastikan tidak null
      pelanggan_data_file:
        pelanggan.pelanggan_data?.pelanggan_data_file || null, // Pastikan tidak null
    });
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("pelanggan_id", formData.pelanggan_id.toString());
      formDataToSend.append("pelanggan_nama", formData.pelanggan_nama);
      formDataToSend.append("pelanggan_alamat", formData.pelanggan_alamat);
      formDataToSend.append("pelanggan_notelp", formData.pelanggan_notelp);
      formDataToSend.append("pelanggan_email", formData.pelanggan_email);
      formDataToSend.append(
        "pelanggan_data_jenis",
        formData.pelanggan_data_jenis
      );
      if (formData.pelanggan_data_file) {
        formDataToSend.append(
          "pelanggan_data_file",
          formData.pelanggan_data_file
        );
      }

      const response = await fetch(
        `https://penyewaan.vercel.app/api/v1/pelanggan/${formData.pelanggan_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`,
          },
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setPelangganData(
          PelangganData.map((pel) =>
            pel.pelanggan_id === formData.pelanggan_id ? result.data : pel
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
    setFormData({
      pelanggan_id: 0,
      pelanggan_nama: "",
      pelanggan_alamat: "",
      pelanggan_notelp: "",
      pelanggan_email: "",
      pelanggan_data_jenis: "",
      pelanggan_data_file: null,
    });
  };

  // detail
  const handleDetailClick = (pelanggan: GetPelanggan) => {
    setFormData({
      pelanggan_id: pelanggan.pelanggan_id,
      pelanggan_nama: pelanggan.pelanggan_nama,
      pelanggan_alamat: pelanggan.pelanggan_alamat,
      pelanggan_notelp: pelanggan.pelanggan_notelp,
      pelanggan_email: pelanggan.pelanggan_email,
      pelanggan_data_jenis:
        pelanggan.pelanggan_data?.pelanggan_data_jenis || "", // Pastikan tidak null
      pelanggan_data_file:
        pelanggan.pelanggan_data?.pelanggan_data_file || null, // Pastikan tidak null
    });
    setIsDetailModalOpen(true); // Show modal with the details
  };

  // You can also use a modal that shows data in a read-only state
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false); // Close the modal
  };

  // Assuming you already have a state to control the modal visibility

  // hapus data
  const handleDelete = async (pelangganId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await fetch(
          `https://penyewaan.vercel.app/api/v1/pelanggan/${pelangganId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`,
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

        // Periksa jika respons ada body JSON
        const result = await response.text(); // Menggunakan .text() agar tidak error jika body kosong

        try {
          const jsonResult = result ? JSON.parse(result) : {}; // Coba parsing JSON jika ada data
          if (response.ok) {
            // Filter out the deleted customer from the state
            setPelangganData(
              PelangganData.filter(
                (pelanggan) => pelanggan.pelanggan_id !== pelangganId
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
    <div className="container mx-auto p-6 pt-24 max-w-9xl min-h-screen  ">
      <div className="mb-6 flex justify-end">
        <Button
        name="pelanggan"
          className="bg-[#A27B5C] hover:bg-[#DCD7C9] rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Tambah Pelanggan
        </Button>
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Table aria-label="Daftar Penyewaan Alat">
          <TableHeader >
            <TableColumn>Id</TableColumn>
            <TableColumn>Nama</TableColumn>
            <TableColumn>Alamat</TableColumn>
            <TableColumn>No telp</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Jenis Data</TableColumn>
            <TableColumn>Data File</TableColumn>
            <TableColumn>Edit</TableColumn>
            <TableColumn>Detail</TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableHeader>
          <TableBody>
            {PelangganData.map((pelanggan) => (
              <TableRow key={pelanggan.pelanggan_id}>
                <TableCell >{pelanggan.pelanggan_id}</TableCell>
                <TableCell>{pelanggan.pelanggan_nama}</TableCell>
                <TableCell>{pelanggan.pelanggan_alamat}</TableCell>
                <TableCell>{pelanggan.pelanggan_notelp}</TableCell>
                <TableCell>{pelanggan.pelanggan_email}</TableCell>
                <TableCell>
                  {pelanggan.pelanggan_data?.pelanggan_data_jenis}
                </TableCell>
                <TableCell>
                  {pelanggan.pelanggan_data?.pelanggan_data_file &&
                  typeof pelanggan.pelanggan_data.pelanggan_data_file ===
                    "string" ? (
                    <img
                      src={pelanggan.pelanggan_data.pelanggan_data_file}
                      alt="File Pelanggan"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  ) : (
                    "Tidak ada file"
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip content="Edit Data">
                    <Button
                      variant="light"
                      className="bg-[#A27B5C] hover:bg-[#DCD7C9] rounded-lg"
                      onClick={() => handleEditClick(pelanggan)}
                    >
                      Edit
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip content="Detail">
                    <Button
                    id="detail"
                      variant="light"
                      className="bg-[#A27B5C] hover:bg-[#DCD7C9] rounded-lg"
                      onClick={() => handleDetailClick(pelanggan)}
                    >
                      Detail
                    </Button>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <Tooltip content="Delete">
                    <Button
                      variant="light"
                      className="bg-red-500 hover:bg-[#DCD7C9] rounded-lg"
                      onClick={() => handleDelete(pelanggan.pelanggan_id)}
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

      {/* detail */}
      <Modal isOpen={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <ModalContent>
          <ModalBody className="bg-[#f8f8f8] p-4 rounded-lg shadow-md">
            <h2>Detail Pelanggan</h2>
            <p>
              <strong>ID:</strong> {formData.pelanggan_id}
            </p>
            <p>
              <strong>Nama:</strong> {formData.pelanggan_nama}
            </p>
            <p>
              <strong>Alamat:</strong> {formData.pelanggan_alamat}
            </p>
            <p>
              <strong>No Telp:</strong> {formData.pelanggan_notelp}
            </p>
            <p>
              <strong>Email:</strong> {formData.pelanggan_email}
            </p>
            <p>
              <strong>Jenis Data:</strong> {formData.pelanggan_data_jenis}
            </p>
            <p>
              <strong>File Data:</strong>{" "}
              {formData.pelanggan_data_file ? "Available" : "No file uploaded"}
            </p>
            <button id="close" onClick={handleCloseDetailModal}>Close</button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {/* tambah */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>Tambah Pelanggan Baru</ModalHeader>
          <ModalBody className="bg-[#f8f8f8] p-4 rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Nama Pelanggan</label>
                <Input
                  name="pelanggan_nama"
                  value={formData.pelanggan_nama}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Alamat</label>
                <Input
                  name="pelanggan_alamat"
                  value={formData.pelanggan_alamat}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">No Telp</label>
                <Input
                  name="pelanggan_notelp"
                  value={formData.pelanggan_notelp}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Email</label>
                <Input
                  name="pelanggan_email"
                  value={formData.pelanggan_email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Jenis Data</label>
                <Input
                  name="pelanggan_data_jenis"
                  value={formData.pelanggan_data_jenis}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Data File</label>
                <Input
                  name="pelanggan_data_file"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pelanggan_data_file: e.target.files?.[0] || null,
                    })
                  }
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleSubmitTambah}
              className="bg-[#A27B5C] hover:bg-[#DCD7C9]"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* modal edit */}
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <ModalContent>
          <ModalBody className="bg-[#f8f8f8] p-4 rounded-lg shadow-md">
            <ModalHeader>Edit Pelanggan</ModalHeader>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Nama Pelanggan</label>
                <Input
                  name="pelanggan_nama"
                  value={formData.pelanggan_nama}
                  onChange={(e) =>
                    setFormData({ ...formData, pelanggan_nama: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Alamat</label>
                <Input
                  name="pelanggan_alamat"
                  value={formData.pelanggan_alamat}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pelanggan_alamat: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium">No telp</label>
                <Input
                  name="pelanggan_notelp"
                  value={formData.pelanggan_notelp}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pelanggan_notelp: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Email</label>
                <Input
                  name="pelanggan_email"
                  value={formData.pelanggan_email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pelanggan_email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Jenis Data</label>
                <Input
                  name="pelanggan_data_jenis"
                  value={formData.pelanggan_data_jenis}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Data File</label>
                <Input
                  name="pelanggan_data_file"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pelanggan_data_file: e.target.files?.[0] || null,
                    })
                  }
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
    </div>
  );
}
