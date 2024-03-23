import axios from "axios";

const useHandleUpload = async(selectedFile, setIsUploading, exam, year, round, setReload) => {

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

}

export default useHandleUpload