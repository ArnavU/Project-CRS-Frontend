import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import useHandleUpload from "../hooks/useHandleUpload";

const PasswordVerificationUpload = ({setShowAuthCard, exam, year, round, setReload, selectedFile, setIsUploading}) => {

    

	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handlePasswordSubmit = (e) => {
		e.preventDefault();

		setErrorMessage("");
		if (password === "abc@123") {
            useHandleUpload(selectedFile, setIsUploading, exam, year, round, setReload)
            setShowAuthCard(false);
		} else {
			setErrorMessage("Incorrect password");
		}
	};

	return (
		<div className="fixed flex justify-center h-[100vh] z-[100] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  backdrop-blur-md  w-[100vw]">
			
			<form
				onSubmit={handlePasswordSubmit}
				className="relative h-[30%] flex flex-col verification-form my-auto border-red-600 border-2 p-[20px] rounded-xl w-[30%] pt-[40px]"
			>
                {/* delete-pdf--card-cross-icon */}
                <div className="cross absolute right-0  cursor-pointer bg-black text-white font-bold rounded-[17px] p-[10px] ">
				<RxCross1 />
			</div>
				<div className="text-red-600 font-bold">
					Upload: <br />
                    {selectedFile.name}
				</div>
				<input
					type="password"
					style={{ padding: "2px 10px", marginTop: "5px" }}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter password"
				/>
				<p className="text-red-500">{errorMessage}</p>
				<button className="" type="submit" style={{ background: "red" }}>
					Upload
				</button>
			</form>
		</div>
	);
};

export default PasswordVerificationUpload;
