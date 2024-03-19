import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/constants";
import axios from "axios";
import PdfListShimmer from "./PdfListShimmer";

function PdfList({ setReload, reload }) {
  const [pdfs, setPdfs] = useState([]);

  const getPdfList = async (year) => {
    const response = await fetch(`${SERVER_URL}/api/v1/lists/pdfList/${year}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDFs for year ${year}`);
    }
    return response.json();
  };

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const yearListResponse = await fetch(
          "https://project-crs-server-1.onrender.com/api/v1/lists/yearlist/mht-cet"
        );
        if (!yearListResponse.ok) {
          throw new Error("Failed to fetch year list");
        }
        const yearData = await yearListResponse.json();
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

        setPdfs(data);
      } catch (error) {
        console.error("Error fetching year list:", error);
      }
    };

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

  // Conditional rendering based on pdfs length
  return (
    <div className="pdf-list">
      {pdfs.length ? (
        pdfs.map((pdf, index) => (
          <div key={index} className="pdf-card">
            <h3>{pdf.name}</h3>
            <p>Year: {pdf.year}</p>
            <p>Round: {pdf.round}</p>
            <p>Exam: {pdf.exam}</p>
            <button className="view-pdf-button" onClick={() => openPdf(pdf)}>
              View
            </button>
            <button
              className="delete-pdf-button"
              onClick={() => deletePdf(pdf.year, pdf.round, pdf.exam, pdf.name)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <PdfListShimmer />
      )}
    </div>
  );
}

export default PdfList;