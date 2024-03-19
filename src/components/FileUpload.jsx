import React, { useState } from "react";
import { SERVER_URL } from "../utils/constants.js";
import axios from "axios";
import "../AdminIndex.css";

function FileUpload({ setReload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [exam, setExam] = useState("cet");
  const [year, setYear] = useState("");
  const [round, setRound] = useState("");

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
      const response = await axios.post(
        `${SERVER_URL}/api/v1/admin/pdf/${exam}/${year}/${round}`,

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
  };

  return (
    <div style={{ paddingBottom: "70px" }}>
      <div className="file-upload-div">
        <div className="choosefile-div">
          <h3>Drag and Drop file</h3>
          <input type="file" draggable="true" onChange={handleFileChange} />
          <br />
        </div>
        <div className="fileupload-options-div">
          <label htmlFor="exam-options" className="labelofexam">
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
          <br />
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
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default FileUpload;
