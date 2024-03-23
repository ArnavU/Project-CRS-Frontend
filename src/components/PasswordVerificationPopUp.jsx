import React, { useState } from 'react'
import useOpenPdf from '../hooks/useOpenPdf';
import { RxCross1 } from "react-icons/rx";
import useDeletePdf from '../hooks/useDeletePdf';

const PasswordVerificationPopUp = ({pdf, setDeletePdfId, setReload, reload}) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if(password === "abc@123") {
      useDeletePdf(pdf, setReload, reload);
      setDeletePdfId("");
    }
    else {
      setErrorMessage("Incorrect password")
    }
  }


  return (
    <div className='absolute top-0 left-0'>
      <div><RxCross1 /></div>
        <form onSubmit={handlePasswordSubmit} className='verification-form bg-black'>
          <div className='text-red-600 font-bold'>Delete: <br/>{pdf.name}</div>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
        />
        <p className='text-red-500'>{errorMessage}</p>
        <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default PasswordVerificationPopUp