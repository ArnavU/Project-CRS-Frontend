import React, { useState } from "react";
import axios from "axios";
import "../Styles/AdminIndex.css";
import { HashLoader } from "react-spinners";
import UploadingShimmer from "./UploadingShimmer";

function FileUpload({ setReload }) {
	const [selectedFile, setSelectedFile] = useState(null);
	const [exam, setExam] = useState("cet");
	const [year, setYear] = useState("");
	const [round, setRound] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleExamChange = (event) => {
		setExam(event.target.value);
	};

	const handleYearChange = (event) => {
		setYear(event.target.value);
	};

	const handleRoundChange = (event) => {
		setRound(event.target.value);
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			alert("Please select a file");
			return;
		}

		const formData = new FormData();
		formData.append("pdfFile", selectedFile);

		try {
			console.log("Uploading Started");
			setIsUploading(true);
			const response = await axios.post(
				`${
					import.meta.env.VITE_SERVER_URL
				}/api/v1/admin/pdf/${exam}/${year}/${round}`,
				formData
			);
			console.log(response.request.status);
			if (response.request.status == 200) {
				alert("File uploaded successfully");
				setReload((flag) => !flag);
			} else {
				alert("Failed to upload file");
			}
		} catch (error) {
			console.error("Error uploading file:", error);
			alert("An error occurred while uploading the file");
		}
		setIsUploading(false);
	};

	return (
		<div>
      {isUploading && <UploadingShimmer/>}
			<div style={{ paddingBottom: "70px" }}>
				<div className="file-upload-div">
					<div className="choosefile-div">
						<h3>Drag and Drop file</h3>
						<input
							type="file"
							draggable="true"
							onChange={handleFileChange}
						/>
						<br />
					</div>

					<div className="fileupload-options-div">
						<div className="admin-exam-option">
							<label
								htmlFor="exam-options"
								className="labelofexam"
							>
								Exam:
							</label>
							<select
								name="exam-options"
								id="exam-options"
								onChange={handleExamChange}
							>
								<option value="mht-cet">MHT-CET</option>
								<option disabled={true} value="jee">
									JEE
								</option>
							</select>
						</div>
						<input
							type="text"
							placeholder="Year"
							value={year}
							onChange={handleYearChange}
						/>
						<br />
						<input
							type="text"
							placeholder="Round"
							value={round}
							onChange={handleRoundChange}
						/>

						<br />
					</div>
					<button onClick={handleUpload}>{isUploading ? "Uploading..." : "Upload"}</button>
				</div>
			</div>
		</div>
	);
}

export default FileUpload;
