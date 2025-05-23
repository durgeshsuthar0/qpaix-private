import { toPng } from "html-to-image";
import jsPDF from "jspdf";
export const generatePdf = async (element, fileName) => {
  try {
    const options = {
      backgroundColor: "white",
      quality: 1, // Highest quality
      pixelRatio: 3, // Higher resolution
      style: {
        transform: "scale(1)",
        "box-shadow": "none",
        "-webkit-print-color-adjust": "exact",
        "print-color-adjust": "exact",
        "color-adjust": "exact",
      },
    };

    const dataUrl = await toPng(element, options);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
    });

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
