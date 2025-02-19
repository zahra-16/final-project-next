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
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk4NTQwNDMsImV4cCI6MTczOTg2NDg0M30.Q7rtyrYwNMIFGVi4RGDVvLGErLduVD1Xnk3wPFUuqmCaEYRa6egWujdR2p9DvSyxLoR58au5X1n5Li__cf_ZPIGkn8KIYnoMkT00V6abnrLGTcRlaFVo3FM_O7I0q4mMmo-frs7qzZ_BBSey5pAayfRLS-lGN2Myjfo_xVxX1qPsSv8m0wjDIIdmWbyf9yczuHsU7f6XXiAFPst1VXmyoXwkqOoHa2lj6oAfSZCxuoTJiGhKF0LgCksz8cC7x610phHOHd02Tou8L4yLiPlZ4l1YQz0dlTYNhSy96p-WT2D1ZB0xwO8jw7VpOJQYu9ebfFG4k85URn2ilKBvpvoBwGdGdraFem9XTcOYll0Yd7D4VXN2b7MRRoiRJT67lrla2dVvfXPPpKZtYFQ21Ak6pv2JSgbASFYY0yfEEPmzZASe_8R8FQuqJStC4c3pGK0fLV7ce35azBQxDBAsQxmuDnZBhrY4pShbd6xEPfAoVZJOKWFAx1-lqofqI6VTCN7APY-9VsI-oQ4j1sBMZ1bTDyYUnazusSM79L3s7-gfaok92DtcwsgBebwBeWauA7rp8I2SHShAZ8ew0Pwbfi3vaaZO4yY-BbvZFeaPUSKo9nNsHSgaM7tS0W203xEsT-OUzEPcrxr2m59MTZhewAlbBc_51mL6k4-O2S7ELh2e55M`,
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
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk4NTQwNDMsImV4cCI6MTczOTg2NDg0M30.Q7rtyrYwNMIFGVi4RGDVvLGErLduVD1Xnk3wPFUuqmCaEYRa6egWujdR2p9DvSyxLoR58au5X1n5Li__cf_ZPIGkn8KIYnoMkT00V6abnrLGTcRlaFVo3FM_O7I0q4mMmo-frs7qzZ_BBSey5pAayfRLS-lGN2Myjfo_xVxX1qPsSv8m0wjDIIdmWbyf9yczuHsU7f6XXiAFPst1VXmyoXwkqOoHa2lj6oAfSZCxuoTJiGhKF0LgCksz8cC7x610phHOHd02Tou8L4yLiPlZ4l1YQz0dlTYNhSy96p-WT2D1ZB0xwO8jw7VpOJQYu9ebfFG4k85URn2ilKBvpvoBwGdGdraFem9XTcOYll0Yd7D4VXN2b7MRRoiRJT67lrla2dVvfXPPpKZtYFQ21Ak6pv2JSgbASFYY0yfEEPmzZASe_8R8FQuqJStC4c3pGK0fLV7ce35azBQxDBAsQxmuDnZBhrY4pShbd6xEPfAoVZJOKWFAx1-lqofqI6VTCN7APY-9VsI-oQ4j1sBMZ1bTDyYUnazusSM79L3s7-gfaok92DtcwsgBebwBeWauA7rp8I2SHShAZ8ew0Pwbfi3vaaZO4yY-BbvZFeaPUSKo9nNsHSgaM7tS0W203xEsT-OUzEPcrxr2m59MTZhewAlbBc_51mL6k4-O2S7ELh2e55M`,
          },
        }
      );
      if (response.status !== 400) {
        setKategoriData((prevData) => [...prevData, response.data.data]);
        setNewKategori("");
        onAddOpenChange(false); // Close the Add modal
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
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NCwiYWRtaW5fdXNlcm5hbWUiOiJhZG1pbjYiLCJhZG1pbl9lbWFpbCI6ImFkbWluZW5hbUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk4NTQwNDMsImV4cCI6MTczOTg2NDg0M30.Q7rtyrYwNMIFGVi4RGDVvLGErLduVD1Xnk3wPFUuqmCaEYRa6egWujdR2p9DvSyxLoR58au5X1n5Li__cf_ZPIGkn8KIYnoMkT00V6abnrLGTcRlaFVo3FM_O7I0q4mMmo-frs7qzZ_BBSey5pAayfRLS-lGN2Myjfo_xVxX1qPsSv8m0wjDIIdmWbyf9yczuHsU7f6XXiAFPst1VXmyoXwkqOoHa2lj6oAfSZCxuoTJiGhKF0LgCksz8cC7x610phHOHd02Tou8L4yLiPlZ4l1YQz0dlTYNhSy96p-WT2D1ZB0xwO8jw7VpOJQYu9ebfFG4k85URn2ilKBvpvoBwGdGdraFem9XTcOYll0Yd7D4VXN2b7MRRoiRJT67lrla2dVvfXPPpKZtYFQ21Ak6pv2JSgbASFYY0yfEEPmzZASe_8R8FQuqJStC4c3pGK0fLV7ce35azBQxDBAsQxmuDnZBhrY4pShbd6xEPfAoVZJOKWFAx1-lqofqI6VTCN7APY-9VsI-oQ4j1sBMZ1bTDyYUnazusSM79L3s7-gfaok92DtcwsgBebwBeWauA7rp8I2SHShAZ8ew0Pwbfi3vaaZO4yY-BbvZFeaPUSKo9nNsHSgaM7tS0W203xEsT-OUzEPcrxr2m59MTZhewAlbBc_51mL6k4-O2S7ELh2e55M`,
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
        onEditOpenChange(false); // Close the Edit modal
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

      <Button name="tambah" onPress={onAddOpen} className="bg-[#2C3930]/80 text-white">
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
            <Button name="submit" color="primary" onPress={handleTambahKategori}>
              Tambah
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => onAddOpenChange(false)}
            >
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
              onPress={() => onEditOpenChange(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default KategoriPage;
