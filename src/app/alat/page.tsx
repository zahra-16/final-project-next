"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardFooter,
  Image,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Alat, GetAlatResponse } from "@/dataservices/alat/type";
import {
  fetchAlat,
  addAlat,
  deleteAlat,
  getToolsByCategoryId,
} from "@/dataservices/alat/api";
import axios from "axios";

export default function AdminTools() {
  const [tools, setTools] = useState<Alat[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [alatNama, setAlatNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [hargaPerHari, setHargaPerHari] = useState("");
  const [stok, setStok] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [kategori, setKategori] = useState();
  const [gambarUtama, setGambarUtama] = useState("");
  const router = useRouter();

  //nyoba
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://penyewaan.vercel.app/api/v1/kategori"
      );
      setKategori(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    getAllTools();
  }, []);

  const getToolsByCategory = async (categoryId: number) => {
    try {
      const response = await getToolsByCategoryId(categoryId);

      setTools(response.data);
    } catch (error) {
      console.error("Error fetching tools by category:", error);
    }
  };

  const getAllTools = async () => {
    try {
      const response = await fetchAlat();
      setTools(response.data);
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };
  //sampai sini

  useEffect(() => {
    getAllTools();
  }, []);

  useEffect(() => {
    const getTools = async () => {
      try {
        const response: GetAlatResponse = await fetchAlat();
        setTools(response.data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };

    getTools();
  }, []);

  const handleDelete = async (alatId: number) => {
    try {
      await deleteAlat(alatId);
      setTools((prevTools) =>
        prevTools.filter((tool) => tool.alat_id !== alatId)
      );
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  const handleTambahAlat = async () => {
    const newAlat = {
      alat_nama: alatNama,
      deskripsi,
      hargaPerHari,
      stok,
      kategoriId,
    };

    try {
      const addedAlat = await addAlat(newAlat);
      setTools((prevTools) => [...prevTools, addedAlat.data]);
      setIsAddModalOpen(false); // Close the modal after adding the tool
      // Reset input fields after adding the tool
      setAlatNama("");
      setDeskripsi("");
      setHargaPerHari("");
      setStok("");
      setKategoriId("");
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };

  return (
    <div className="pt-20">
      <h1 className="text-center text-2xl font-bold mb-4 font-sans pt-8">
        Daftar Alat Tersedia
      </h1>

      {/* ini saya coba */}
      <div>
        <div className="flex justify-center gap-4 mb-4 pt-5 font">
          {kategori?.map((kategori, index) => (
            <Button
            id="alat"
              key={index}
              className="text-white bg-[#A27B5C] hover:bg-[#DCD7C9] hover:text-[#2C3930] hover:border-2 hover:border-[#2C3930]"
              onClick={() => getToolsByCategory(kategori.kategori_id)}
            >
              {kategori.kategori_nama}
            </Button>
          ))}
        </div>

        {/* <Button
          className="text-white bg-blue-500 hover:bg-blue-600 p-3"
          onClick={getAllTools}
        >
          Semua Alat
        </Button> */}

        <div>
          {tools.map((tool, index) => (
            <div key={index}>
              <h3>{tool.kategori_nama}</h3>
              <p>{tool.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>
      {/* sampai sini */}

      <div className="flex justify-between gap-4 pt-2 p-8">
        <Button
        name="Alat"
          className="flex items-center gap-2 text-white bg-[#2C3930]/80"
          onClick={() => setIsAddModalOpen(true)}
          radius="lg"
          size="sm"
          variant="flat"
        >
          <Plus className="w-4 h-4" />
          Tambah Alat
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-4 p-8">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <Link href={`/alat/detail/${tool.alat_id}`} legacyBehavior>
              <a>
                <img
                  className="rounded-t-lg object-cover"
                  src={tool.gambar_utama}
                  alt="Tool image"
                />
              </a>
            </Link>
            <div className="px-5 pb-5 pt-3 rounded-lg">
              <Link href={`/alat/detail/${tool.alat_id}`} legacyBehavior>
                <a>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                    {tool.alat_nama}
                  </h5>
                </a>
              </Link>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  Rp.{tool.alat_hargaperhari}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link href={`/alat/detail/${tool.alat_id}`} passHref>
                  <Button
                  id="detail"
                    className="text-tiny text-black bg-[#626F47]/60 mr-1"
                    radius="sm"
                    size="sm"
                    variant="flat"
                  >
                    Detail
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(tool.alat_id)}
                  className="text-tiny text-white bg-red-600 hover:bg-red-700"
                  radius="sm"
                  size="sm"
                  variant="flat"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal untuk Menambah Alat */}
      <Modal
        isOpen={isAddModalOpen}
        onOpenChange={(open) => setIsAddModalOpen(open)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Tambah Alat</ModalHeader>
          <ModalBody>
            <p>Nama Alat</p>
            <input
            name="nama"
              className="border p-2"
              placeholder="Masukkan Nama Alat"
              value={alatNama}
              onChange={(e) => setAlatNama(e.target.value)}
            />
            <p>Deskripsi Alat</p>
            <input
            name="deskripsi"
              className="border p-2"
              placeholder="Masukkan Deskripsi Alat"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
            <p>Harga per Hari</p>
            <input
            name="harga"
              className="border p-2"
              placeholder="Masukkan Harga per Hari"
              value={hargaPerHari}
              onChange={(e) => setHargaPerHari(e.target.value)}
            />
            <p>Stok</p>
            <input
            name="stok"
              className="border p-2"
              placeholder="Masukkan Jumlah Stok"
              value={stok}
              onChange={(e) => setStok(e.target.value)}
            />
            <p>Kategori ID</p>
            <input
            name="kategori"
              className="border p-2"
              placeholder="Masukkan Kategori ID"
              value={kategoriId}
              onChange={(e) => setKategoriId(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button name="tambah" color="primary" onClick={handleTambahAlat}>
              Tambah
            </Button>
            <Button
              color="danger"
              variant="light"
              onClick={() => setIsAddModalOpen(false)}
            >
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
