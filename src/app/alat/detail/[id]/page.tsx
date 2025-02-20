"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardBody, Button, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@heroui/react";
import { Alat, AlatOne, GetAlatResponse, GetAlatResponseOne } from "@/dataservices/alat/type";
import {
  fetchAlatById,
  editAlat, // Pastikan editAlat diimport
  uploadAlatImage,
} from "@/dataservices/alat/api";
import { Plus, Trash2 } from "lucide-react";
import axios from "axios"; // Jangan lupa import axios!
import { Params } from "next/dist/server/request/params";

const DetailPage = ({ params }: { params: Params }) => {
  const [alat, setAlat] = useState<AlatOne | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Untuk modal edit
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [updatedAlat, setUpdatedAlat] = useState({
    alat_nama: '',
    alat_deskripsi: '',
    alat_hargaperhari: 0,
    alat_stok: 0,
    alat_kategori_id: 0,
  });

  const getAlat = async () => {
    try {
      const response: GetAlatResponseOne = await fetchAlatById(Number(id));
      setAlat(response.data);
      setUpdatedAlat({
        alat_nama: response.data.alat_nama || '',
        alat_deskripsi: response.data.alat_deskripsi || '',
        alat_hargaperhari: response.data.alat_hargaperhari ,
        alat_stok: response.data.alat_stok ,
        alat_kategori_id: response.data.alat_kategori_id ,
      });
    } catch (error) {
      console.error("Error fetching alat details:", error);
    }
  };

  useEffect(() => {
    getAlat();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddAlat = async () => {
    if (!selectedFile || !alat?.alat_id) {
      alert("Please select a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await uploadAlatImage(alat.alat_id, selectedFile);
      console.log(uploadResponse);

      alert("Alat added successfully!");
      getAlat();
    } catch (error) {
      console.error("Error adding alat:", error);
      alert("Failed to add alat. Please try again.");
    }
  };

  const handleEditAlat = async () => {
    if (!alat?.alat_id) {
      alert("Alat ID is missing!");
      return;
    }

    try {
      await editAlat(alat.alat_id, updatedAlat);
      alert("Alat updated successfully!");
      getAlat();
    } catch (error) {
      console.error("Error updating alat:", error);
      alert("Failed to update alat. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAlat({ ...updatedAlat, [name]: value });
  };
  
  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };
  
  if (!alat) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-24">
        <div>
          <Card className="w-full h-full border border-gray-200 shadow-sm">
            <CardBody className="overflow-visible py-2">
              <img
                src={alat.gambar_utama}
                alt={alat.alat_nama}
                className="rounded-xl w-full h-full object-contain"
              />
              <div className="flex gap-2 mt-4">
                {alat.alat_gambar &&
                  alat.alat_gambar.map((gambar, index) => (
                    <img
                      key={index}
                      src={gambar.gambar.gambar}
                      alt={`Gambar ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{alat.alat_nama}</h1>
          <p className="text-gray-600 mt-2">{alat.alat_deskripsi}</p>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-red-600">
                Rp. {alat.alat_hargaperhari}
              </h2>

              <Button
                onClick={handleAddAlat}
                className="bg-green-600 hover:bg-green-800 text-white"
              >
                <Plus />
                <input type="file" onChange={handleFileChange} />
              </Button>
            </div>
            <p className="text-gray-600 text-base pt-2">
              Stock: {alat.alat_stok}
            </p>
            <div className="mt-4 flex gap-2 pt-5">
            <Button onPress={toggleEditModal}>Edit Alat</Button>
              <Modal isOpen={isEditModalOpen} onOpenChange={toggleEditModal}>
                <ModalContent>
                  <ModalHeader className="flex flex-col gap-1">
                    Edit Alat
                  </ModalHeader>
                  <ModalBody>
                    <p>Nama Alat</p>
                    <input
                      type="text"
                      name="alat_nama"
                      placeholder="Nama Alat"
                      value={updatedAlat.alat_nama}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <p>Deskripsi Alat</p>
                    <input
                      type="text"
                      name="alat_deskripsi"
                      placeholder="Deskripsi Alat"
                      value={updatedAlat.alat_deskripsi}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded mt-4"
                    />
                    <p>Harga</p>
                    <input
                      type="number"
                      name="alat_hargaperhari"
                      placeholder="Harga per Hari"
                      value={updatedAlat.alat_hargaperhari}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded mt-4"
                    />
                    <p>Stok</p>
                    <input
                      type="number"
                      name="alat_stok"
                      placeholder="Stok"
                      value={updatedAlat.alat_stok}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded mt-4"
                    />
                    <p>Kategori ID</p>
                    <input
                      type="text"
                      name="alat_kategori_id"
                      placeholder="Kategori ID"
                      value={updatedAlat.alat_kategori_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded mt-4"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={() => {handleEditAlat(); toggleEditModal();}}>
                      Save
                    </Button>
                    <Button
                      color="danger"
                      variant="light"
                      onClick={toggleEditModal}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
