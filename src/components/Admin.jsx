import React, { useState } from "react";
import FileUpload from "./FileUpload";
import PdfList from "./PdfList";

const Admin = () => {
	const [reload, setReload] = useState(false);

	return (
		<>
			<div>Admin</div>
			<FileUpload setReload={setReload}/>
			<PdfList setReload={setReload} reload={reload}/>
		</>
	);
};

export default Admin;
