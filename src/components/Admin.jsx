import React, { useState } from "react";
import FileUpload from "./FileUpload";
import PdfList from "./PdfList";

const Admin = () => {
  const [reload, setReload] = useState(false);

  return (
    <div className="screen-div">
      <h1 className="admin-panel-heading">Admin Panel</h1>
      <FileUpload setReload={setReload} />
      <PdfList setReload={setReload} reload={reload} />
    </div>
  );
};

export default Admin;
