import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfListShimmer from "./PdfListShimmer";
import useGetPdf from "../hooks/useGetPdf.jsx";
import useOpenPdf from "../hooks/useOpenPdf.jsx";
import PasswordVerificationPopUp from "./PasswordVerificationPopUp.jsx";

function PdfList({ setReload, reload }) {
	const [pdfs, setPdfs] = useState([]);
	const [shimmerQty, setShimmerQty] = useState(6);
	const [isLoading, setIsLoading] = useState(true);
	const [deletePdfId, setDeletePdfId] = useState("");

	window.addEventListener('click', (e) => {
		const element = e.target;
		if(!element.closest('.verification-form') && !element.closest('.delete-btn') && !element.closest(".themediv")) {
			setDeletePdfId("");
		}
	})

	const fetchPdfs = async () => {
		try {
			const yearListResponse = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/api/v1/lists/yearlist/mht-cet`
			);
			if (!yearListResponse.ok) {
				console.log("FAiled to fetch yearlist")
				throw new Error("Failed to fetch year list");
			}
			const yearData = await yearListResponse.json();
			const arrOfYears = Object.keys(yearData.data);
			let totalPdfs = 0;
			for(let year of arrOfYears) {
				totalPdfs += yearData.data[year];
			}
			setShimmerQty(totalPdfs);

			setIsLoading(true);
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
			setIsLoading(false);


		} catch (error) {
			// console.error("Error fetching year list:", error);
			console.log("Some error occured", error)
		}
	};

	useEffect(() => {
		setPdfs([]);
		fetchPdfs();
	}, [reload]);

	console.log("PdfList length: ", pdfs.length)

	return (
		<div className="pdf-list">
			{/* {isLoading && <UploadingShimmer />} */}
			
				{pdfs?.map((pdf, index) => (
					<div key={`${pdf._id}`} className="pdf-card">
						<h3>{pdf.name}</h3>
						<p>Year: {pdf.year}</p>
						<p>Round: {pdf.round}</p>
						<p>Exam: {pdf.exam}</p>
						<button
							className="view-pdf-button"
							onClick={() => useOpenPdf(pdf)}
						>
							View
						</button>

						{isLoading ? <span className="px-[20px] py-[10px] font-semibold text-black cursor-pointer bg-zinc-500 opacity-85 rounded-[15px]">Delete</span> :
							<button
								className="delete-pdf-button delete-btn"
								onClick={() => setDeletePdfId(pdf._id)}
							>
								Delete
							</button>
						}

						{deletePdfId == pdf._id &&
							<PasswordVerificationPopUp pdf={pdf} setDeletePdfId={setDeletePdfId} setReload={setReload} reload={reload}/>
						}
					</div>
				))
				}
			
			{shimmerQty>0 && <PdfListShimmer numbers={shimmerQty} />} 
		</div>
	);
}

export default PdfList;
