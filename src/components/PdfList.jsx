import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/constants";
import axios from "axios";

function PdfList({ setReload, reload }) {
  const [pdfs, setPdfs] = useState([]);

  const getPdfList = async (year) => {
    const response = await fetch(`${SERVER_URL}/api/v1/lists/pdfList/${year}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDFs for year ${year}`);
    }
    return response.json();
  };

  const fetchPdfs = async () => {
    try {
      const yearList = await fetch(
        "https://project-crs-server-1.onrender.com/api/v1/lists/yearlist/mht-cet"
      );
      const yearData = await yearList.json();
      const arrOfYears = Object.keys(yearData.data);
      const data = [];

      for (let year of arrOfYears) {
        try {
          const pdfArrOfYear = await getPdfList(year);
          data.push(...pdfArrOfYear);
        } catch (error) {
          console.error(`Error fetching PDFs for year ${year}:`, error);
        }
      }

      console.log(data);
      setPdfs(data);
    } catch (error) {
      console.error("Error fetching year list:", error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [reload]);

  const openPdf = (pdf) => {
    try {
      const pdfData = new Uint8Array(pdf.content.data);
      const blob = new Blob([pdfData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error opening PDF:", error);
    }
  };

  const deletePdf = async (year, round, exam, name) => {
    try {
      await axios.delete(
        `${SERVER_URL}/api/v1/pdf/delete/${year}/${round}/${exam}/${name}`
      );
      setReload(!reload);
    } catch (err) {
      console.log("Error Deleting pdf", err);
    }
  };

  return (
    <div className="pdf-list">
      {pdfs.map((pdf, index) => (
        <div key={index} className="pdf-card">
          <h3>{pdf.name}</h3>
          <p>Year: {pdf.year}</p>
          <p>Round: {pdf.round}</p>
          <p>Exam: {pdf.exam}</p>
          <button className="view-pdf-button" onClick={() => openPdf(pdf)}>View</button>
          <button className="delete-pdf-button"
            onClick={() => deletePdf(pdf.year, pdf.round, pdf.exam, pdf.name)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PdfList;
