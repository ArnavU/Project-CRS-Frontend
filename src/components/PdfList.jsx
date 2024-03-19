import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/constants";
import axios from "axios";
import PdfListShimmer from "./PdfListShimmer";
import useGetPdf from "../hooks/useGetPdf";

function PdfList({ setReload, reload }) {
	const [pdfs, setPdfs] = useState([]);
	const [shimmerQty, setShimmerQty] = useState(6);

	const fetchPdfs = async () => {
		try {
			const yearListResponse = await fetch(
				`${SERVER_URL}/api/v1/lists/yearlist/mht-cet`
			);
			if (!yearListResponse.ok) {
				throw new Error("Failed to fetch year list");
			}
			const yearData = await yearListResponse.json();
			const arrOfYears = Object.keys(yearData.data);
			let totalPdfs = 0;
			for(let year of arrOfYears) {
				totalPdfs += yearData.data[year];
			}
			setShimmerQty(totalPdfs);

			for (let year of arrOfYears) {
				console.log("Year: ", year);
				for (let round = 1; round <= yearData.data[year]; round++) {
					console.log(year, round);
					try {
						const pdfOfYearRound = await useGetPdf(year, round);
						setPdfs((previousPdfs) => [...previousPdfs, ...pdfOfYearRound]);
						setShimmerQty(prevQty => prevQty-1)
					} catch (error) {
						console.error(
							`Error fetching PDFs for year ${year} round :${round}:`,
							error
						);
					}
				}
			}

		} catch (error) {
			console.error("Error fetching year list:", error);
		}
	};

	useEffect(() => {
		fetchPdfs();
	}, []);

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
	console.log("PdfList length: ", pdfs.length)

	return (
		<div className="pdf-list">
			
				{pdfs?.map((pdf, index) => (
					<div key={`${pdf.year}${pdf.round}`} className="pdf-card">
						<h3>{pdf.name}</h3>
						<p>Year: {pdf.year}</p>
						<p>Round: {pdf.round}</p>
						<p>Exam: {pdf.exam}</p>
						<button
							className="view-pdf-button"
							onClick={() => openPdf(pdf)}
						>
							View
						</button>
						<button
							className="delete-pdf-button"
							onClick={() =>
								deletePdf(
									pdf.year,
									pdf.round,
									pdf.exam,
									pdf.name
								)
							}
						>
							Delete
						</button>
					</div>
				))
				}
			
			{shimmerQty>0 && <PdfListShimmer numbers={shimmerQty} />} 
		</div>
	);
}

export default PdfList;
