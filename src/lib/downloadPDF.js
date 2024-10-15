import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";

const downloadPDF = async (id) => {
  console.log(id);
  
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;

  try {
    const url = `http://localhost:4000/cart/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const cartData = response.data.data;

    if (cartData) {
      // Initialize jsPDF
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text("WIKUSAMA CAFE", 105, 10, { align: "center" });

      // Add customer and transaction details
      doc.setFontSize(12);
      doc.text(`ID Cart: ${cartData.id_cart}`, 10, 20);
      doc.text(`Nama Pelanggan: ${cartData.nama_pelanggan}`, 10, 30);
      doc.text(`Nomor Meja: ${cartData.meja.nomor_meja}`, 10, 40);
      doc.text(`Nama Kasir: ${cartData.user.nama_user}`, 10, 50);

      // Prepare the table data
      const tableData = cartData.KeranjangMenu.map((item) => [
        item.menu.nama_menu,
        item.menu.jenis,
        item.quantity,
        `Rp ${item.menu.harga.toLocaleString()}`,
        `Rp ${(item.menu.harga * item.quantity).toLocaleString()}`,
      ]);

      // Add the table to PDF using autotable
      doc.autoTable({
        head: [["Menu", "Jenis", "Jumlah", "Harga", "Total"]],
        body: tableData,
        startY: 60, // Y position for the table
        theme: 'grid', // Use grid theme for better visual
        styles: {
          fontSize: 12,
          cellPadding: 4,
          halign: 'left', // Align text to the left
          valign: 'middle', // Align text to the middle
        },
        headStyles: {
          fillColor: [240, 240, 240], // Light gray background for headers
          textColor: [0, 0, 0], // Black text color for headers
          fontStyle: 'bold',
        },
        didParseCell: (data) => {
          if (data.section === 'body' && data.cell.text[0] === '') {
            data.cell.styles.fillColor = [255, 255, 255]; // White for empty cells
          }
        },
      });

      // Add total harga
      const totalHarga = cartData.KeranjangMenu.reduce(
        (total, item) => total + item.menu.harga * item.quantity,
        0
      );
      doc.setFontSize(12);
      doc.text(`Total Harga: Rp ${totalHarga.toLocaleString()}`, 10, doc.lastAutoTable.finalY + 10);

      // Save PDF
      doc.save(`receipt_${cartData.id_cart}.pdf`);
    }
  } catch (error) {
    console.error("Failed to download PDF:", error);
  }
};

export default downloadPDF;
