import React, { useState } from "react";
import axios from "axios";
import "../Styles/AdminIndex.css";
import { HashLoader } from "react-spinners";
import UploadingShimmer from "./UploadingShimmer";
import useHandleUpload from "../hooks/useHandleUpload";
import PasswordVerificationUpload from "./PasswordVerificationUpload";

function FileUpload({ setReload }) {
	const [selectedFile, setSelectedFile] = useState(null);
	const [exam, setExam] = useState("cet");
	const [year, setYear] = useState(null);
	const [round, setRound] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [showAuthCard, setShowAuthCard] = useState(false);

	if(showAuthCard && (!selectedFile || !year || !round)) {
			let message = "";
			if(!selectedFile) {
				message = "Please select a file";
			}
			else if(!year) {
				alert("Please provide year");
			}
			else if(!round) {
				alert("Please provide round");
			}
			alert(message);
			setShowAuthCard(false);
	}

	window.addEventListener('click', (e) => {
		const element = e.target;

		if(!element.closest('.verification-form') && !element.closest('.upload-btn') && !element.closest('.themediv') || element.closest('.cross')) {
			setShowAuthCard(false);
		}
	})

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
							required={true}
							value={year}
							onChange={handleYearChange}
						/>
						<br />
						<input
							type="text"
							placeholder="Round"
							required={true}
							value={round}
							onChange={handleRoundChange}
						/>

						<br />
					</div>
					<button className="upload-btn"
					// onClick={() => useHandleUpload(selectedFile, setIsUploading, exam, year, round, setReload)}
					onClick={() => setShowAuthCard(true)}
					>{isUploading ? "Uploading..." : "Upload"}
					</button>

					{showAuthCard && 
						<PasswordVerificationUpload setShowAuthCard={setShowAuthCard} exam={exam} year={year} round={round} setReload={setReload} selectedFile={selectedFile} setIsUploading={setIsUploading}/>
					}
				</div>
			</div>
		</div>
	);
}

export default FileUpload;
