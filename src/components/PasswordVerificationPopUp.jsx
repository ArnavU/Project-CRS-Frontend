import React, { useState } from "react";
import useOpenPdf from "../hooks/useOpenPdf";
import { RxCross1 } from "react-icons/rx";
import useDeletePdf from "../hooks/useDeletePdf";

const PasswordVerificationPopUp = ({
  pdf,
  setDeletePdfId,
  setReload,
  reload,
}) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password === "abc@123") {
      useDeletePdf(pdf, setReload, reload);
      setDeletePdfId("");
    } else {
      setErrorMessage("Incorrect password");
    }
  };

  return (
    <div className="absolute top-0 left-0 delete-pdf--card backdrop-blur-xl">
      <div className="delete-pdf--card-cross-icon">
        <RxCross1 />
      </div>
      <form onSubmit={handlePasswordSubmit} className="verification-form ">
        <div className="text-red-600 font-bold">
          Delete: <br />
          {pdf.name}
        </div>
        <input
          type="password"
          style={{ padding: "2px 10px", marginTop: "5px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <p className="text-red-500">{errorMessage}</p>
        <button type="submit" style={{ background: "red" }}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default PasswordVerificationPopUp;
