import React, { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import PdfList from "./PdfList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import "../Styles/AdminIndex.css"

const Admin = () => {
  const [reload, setReload] = useState(false);
  
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate('/');
    }
  }, []);

  return userLoggedIn ? (
    <div className="screen-div">
      <h1 className="admin-panel-heading">Admin Panel</h1>
      <FileUpload setReload={setReload} />
      <PdfList setReload={setReload} reload={reload} />
    </div>
  ) : null;
};

export default Admin;
