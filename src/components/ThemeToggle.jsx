import "../index.css";
import { IoCloudyNightSharp } from "react-icons/io5";
import { useState } from "react";

const ThemeToggle = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const toggleTheme = (e) => {
    console.log(e);
  };
  return (
    <div className="themediv" onClick={toggleTheme}>
      <IoCloudyNightSharp className="darkthemeicon" />
    </div>
  );
};

export default ThemeToggle;
