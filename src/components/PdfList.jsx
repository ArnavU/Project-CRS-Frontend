import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/constants";
import axios from "axios";

function PdfList({ setReload, reload }) {
	const [pdfs, setPdfs] = useState([]);

	useEffect(() => {
		const fetchPdfs = async () => {
			try {
				const yearList = await fetch(
					`https://project-crs-server-1.onrender.com/api/v1/lists/yearlist/mht-cet`
				);
				const yearData = await yearList.json();
				console.log(Object.keys(yearData.data));
				const arrOfYears = Object.keys(yearData.data);
				const data = [];
				let response = null;

				const getPdfList = () => {
					return new Promise(async (res, rej) => {
						for(let year of arrOfYears) {
							response = await fetch(
								`${SERVER_URL}/api/v1/lists/pdfList/${year}`
							);
							if (!response.ok) {
								throw new Error("Failed to fetch PDFs");
							}
							let pdfArrOfYear = await response.json();
							data.push(...pdfArrOfYear);
							console.log(year, "data fetched")
						}
						res();
					});
				};

				await getPdfList();

				console.log(data);
				setPdfs(data);
			} catch (error) {
				console.error("Error fetching PDFs:", error);
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
			let response = await axios.delete(
				`${SERVER_URL}/api/v1/pdf/delete/${year}/${round}/${exam}/${name}`
			);
			setReload((flag) => !flag);
			// console.log(response);
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
					<button onClick={() => openPdf(pdf)}>View</button>
					<button
						onClick={() =>
							deletePdf(pdf.year, pdf.round, pdf.exam, pdf.name)
						}
					>
						Delete
					</button>
				</div>
			))}
		</div>
	);
}

export default PdfList;
