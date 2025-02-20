"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Style_Script } from "next/font/google";

interface Kategori {
  kategori_id: number;
  kategori_nama: string;
  _count: { alat: number };
}

interface GetKategoriResponse {
  success: boolean;
  message: string;
  data: Kategori[];
  pagination: {
    item: number;
    matchData: number;
    allPage: number;
    currentPage: number;
  };
}

const KategoriPage: FC = () => {
  const [kategoriData, setKategoriData] = useState<Kategori[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states for Add and Edit
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const [newKategori, setNewKategori] = useState<string>("");
  const [editingKategori, setEditingKategori] = useState<Kategori | null>(null);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axios.get<GetKategoriResponse>(
          "https://penyewaan.vercel.app/api/v1/kategori"
        );
        if (response.data.success) {
          setKategoriData(response.data.data);
        } else {
          setError("Gagal mengambil data kategori");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchKategori();
  }, []);

  const deleteKategori = async (kategori_id: number) => {
    try {
      const response = await axios.delete(
        `https://penyewaan.vercel.app/api/v1/kategori/${kategori_id}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`,
          },
        }
      );
      if (response.status !== 400) {
        setKategoriData((prevData) =>
          prevData.filter((kategori) => kategori.kategori_id !== kategori_id)
        );
      } else {
        setError("Gagal menghapus kategori");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus kategori");
    }
  };

  const handleTambahKategori = async () => {
    try {
      const response = await axios.post(
        "https://penyewaan.vercel.app/api/v1/kategori",
        { kategori_nama: newKategori },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`,
          },
        }
      );
      if (response.status !== 400) {
        setKategoriData((prevData) => [...prevData, response.data.data]);
        setNewKategori("");
        onAddOpenChange; // Close the Add modal
      } else {
        setError("Gagal menambah kategori");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menambah kategori");
    }
  };

  const handleEditKategori = async () => {
    if (!editingKategori) return;

    try {
      const response = await axios.put(
        `https://penyewaan.vercel.app/api/v1/kategori/${editingKategori.kategori_id}`,
        { kategori_nama: editingKategori.kategori_nama },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3NDAwMTQ1OTksImV4cCI6MTc0MDAyNTM5OX0.v0jph2G_GZINPosUHpLJPin0kKfZlfuYnrOs2jPABtcR3_uoOHf0HM69sOrvDDF7UHLGVjIsij4qDQDFiNr6uibb5fJu0W3TGdFu9IIddpA65_v_jge1AMoc1QBZsIV5lOYEnGqL5l4c5ZmELoYfPUuYDG7MSMPouhXXP_bkHEIu8HI1tIBgrjTpwLTcTv5z1TasJdlkaN8urw9f6j0qM9OzYyILPQ-DvZM1eTsCmz6wGc4xx8AwXZMyI9F6Gk6Mwn4zs10uRRLhFvrB1sk5aa33sr3bHQ45kMnTJ39u0ZztgSYiesxUqkc70U16VAO8a8n4u944P88QnoI3rqt_X9lR_wy4uiPnOX_-YjXJNhFoT0ALP0WIdevu-h1wx7jIva3q2G_tb1ZnjjM8wb1YIcChumOuDSPYt7IH2hSPX5BNaH8cUMueIPAG9dTWgHfbgGJXE4KjbJIlFyK5Q-qN1j5iyqGRapwRvLXNzcjXwQaIu8j1FpqaWYNJhnH2vKSgf4Lu4-j9z3ecbiIbgLcnuBc7fOVtaoEnTiFc8EGnbMy4yz1fvSgG2RNDMVkI9jmf89VUZ-QSNQ1YllZ0z9tdhC3Lp46DsuTpi7SiTvtUNkvkrICI4zyJtwALe7HcnMiE4nyQWOr3Z1OPKo4_DBLTuDAdxjwpvvbtaNWOGCLof0Q`,
          },
        }
      );
      if (response.status !== 400) {
        setKategoriData((prevData) =>
          prevData.map((item) =>
            item.kategori_id === editingKategori.kategori_id
              ? response.data.data
              : item
          )
        );
        onEditOpenChange; // Close the Edit modal
      } else {
        setError("Gagal mengedit kategori");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengedit kategori");
    }
  };

  if (isLoading) return <p className="text-center text-xl pt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-xl text-red-600 pt-10">Error: {error}</p>
    );

  return (
    <div className="p-6 mx-auto pt-28 max-w-7xl min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center pb-6">
        Kategori Penyewaan
      </h1>

      <Button
        name="tambah"
        onPress={onAddOpen}
        className="bg-[#2C3930]/80 text-white"
      >
        Tambah Kategori
      </Button>
      <Modal isOpen={isAddModalOpen} onOpenChange={onAddOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 ">
            Tambah Kategori
          </ModalHeader>
          <ModalBody>
            <input
              type="text"
              value={newKategori}
              onChange={(e) => setNewKategori(e.target.value)}
              placeholder="Nama Kategori"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <Button
              name="submit"
              color="primary"
              onPress={() => handleTambahKategori()}
            >
              Tambah
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onAddOpenChange}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 ">
        {kategoriData.map((kategori) => (
          <Card key={kategori.kategori_id} className="p-4 shadow-lg border-2 ">
            <h2 className="text-lg font-semibold">{kategori.kategori_nama}</h2>
            <div className="flex justify-start gap-3 mt-2">
              <Button
                className="bg-[#626F47]/60"
                onPress={() => {
                  setEditingKategori(kategori);
                  onEditOpen();
                }}
              >
                Edit
              </Button>

              <Button
                className="bg-red-600 text-white"
                onClick={() => deleteKategori(kategori.kategori_id)}
              >
                Hapus
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onOpenChange={onEditOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit Kategori
          </ModalHeader>
          <ModalBody>
            {editingKategori && (
              <>
                <input
                  type="text"
                  value={editingKategori.kategori_nama}
                  onChange={(e) =>
                    setEditingKategori({
                      ...editingKategori,
                      kategori_nama: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <Button color="primary" onPress={handleEditKategori}>
                  Edit
                </Button>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={onEditOpenChange}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default KategoriPage;
