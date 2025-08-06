import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportToPDF = ({
  title = "Exported Data",
  subtitle = "", 
  headers = [],
  rows = [],
  fileName = "report.pdf",
}) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.setTextColor(40);
  doc.text(title, 14, 20);

  // Line after title
  doc.setDrawColor(100); // Gray line
  doc.line(14, 22, 196, 22); // x1, y1, x2, y2

  // Subtitle or additional info
  if (subtitle) {
    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text(subtitle, 14, 28);
  }

  const tableStartY = subtitle ? 35 : 30;

  // Table
  autoTable(doc, {
    startY: tableStartY,
    head: [headers],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: [251, 191, 36],    // Amber
      textColor: 0,
      fontStyle: "bold",
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: [255, 251, 235],   // Light amber
    },
    styles: {
      fontSize: 10,
      cellPadding: 4,
      textColor: 20,
    },
  });

  doc.save(fileName);
};

export default exportToPDF;
