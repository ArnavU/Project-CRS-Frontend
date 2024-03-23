import React from 'react'

const useOpenPdf = (pdf) => {
    try {
        const pdfData = new Uint8Array(pdf.content.data);
        const blob = new Blob([pdfData], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    } catch (error) {
        console.error("Error opening PDF:", error);
    }
}

export default useOpenPdf