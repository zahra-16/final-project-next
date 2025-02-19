import { deleteAlat, getAlat } from "@/dataservices/alat/api";
import { Alat } from "@/dataservices/alat/type";
import { getPelanggan } from "@/dataservices/pelanggan/api";
import { getPenyewaan } from "@/dataservices/penyewaan/api";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@heroui/react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function SearchCard() {
  const [tools, setTools] = useState<Alat[]>([]);
  const [penyewaan, setPenyewa] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5); // Set a default limit
  const [isSearched, setIsSearched] = useState(false); // State untuk melacak apakah pencarian sudah dilakukan

  const fetchTools = async () => {
    try {
      const response = await getAlat(limit, searchTerm); // Pass limit and searchTerm to getAlat function
      setTools(response.data);
      setIsSearched(true); // Update state setelah pencarian dilakukan
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

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

  const fetchPenyewa = async () => {
    try {
      const response = await getPenyewaan(limit, searchTerm); // Pass limit and searchTerm to getPenyewaan function
      setPenyewa(response.data);
      setIsSearched(true); // Update state setelah pencarian dilakukan
    } catch (error) {
      console.error("Error fetching penyewaan:", error);
    }
  };

  const fetchPelanggan = async () => {
    try {
      const response = await getPelanggan(limit, searchTerm); // Pass limit and searchTerm to getPenyewaan function
      setPelanggan(response.data);
      setIsSearched(true); // Update state setelah pencarian dilakukan
    } catch (error) {
      console.error("Error fetching penyewaan:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <Input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button
        name="submit"
          onClick={() => {
            fetchTools();
            fetchPenyewa();
            fetchPelanggan();
          }}
          className="px-4 py-2 bg-[#3F4F44] text-white rounded-lg hover:bg-[#A4B465] hover:text-black transition-all"
        >
          Search Tools
        </Button>
      </div>

      {isSearched && (
        <div className="grid grid-cols-6 gap-4 p-8">
          {tools.length === 0 ? (
            <p>No tools found</p>
          ) : (
            tools.map((tool, index) => (
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
            ))
          )}
        </div>
      )}
    <h1 className="pb-3 font-bold">Daftar Penyewaan</h1>
      {isSearched && (
      
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
            {penyewaan.map((item) => (
              <TableRow key={item.penyewaan_id}>
                <TableCell>{item.penyewaan_pelanggan_id}</TableCell>
                <TableCell>{item.penyewaan_tglsewa}</TableCell>
                <TableCell>{item.penyewaan_tglkembali}</TableCell>
                <TableCell>
                  <Chip
                    color={
                      item.penyewaan_sttspembayaran === "Belum Dibayar"
                        ? "danger"
                        : "success"
                    }
                  >
                    {item.penyewaan_sttspembayaran}
                  </Chip>
                </TableCell>
                <TableCell>{item.penyewaan_sttskembali}</TableCell>
                <TableCell>
                  Rp {parseInt(item.penyewaan_totalharga).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Tooltip content="Edit Data">
                    <Button
                      onClick={() => handleEditClick(item.penyewaan_id)}
                      variant="light"
                      className="bg-[#A27B5C] hover:bg-[#DCD7C9] rounded-lg"
                    >
                      Edit
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip content="Detail">
                    <Button
                      onClick={() => handleDetailClick(item.penyewaan_id)}
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
                      onClick={() => handleDelete(item.penyewaan_id)}
                      variant="light"
                      className="bg-red-600 hover:bg-[#DCD7C9] rounded-lg"
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


      <h1 className="pt-5 font-bold">Daftar Pelanggan</h1>
      <Table aria-label="Daftar Penyewaan Alat" className="pt-3">
        <TableHeader>
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
          {pelanggan.map((pelanggan) => (
            <TableRow key={pelanggan.pelanggan_id}>
              <TableCell>{pelanggan.pelanggan_id}</TableCell>
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
    </div>
  );
}
