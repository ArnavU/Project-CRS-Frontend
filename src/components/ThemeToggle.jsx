import "../Styles/AdminIndex.css";
import { IoCloudyNightSharp } from "react-icons/io5";
import { useState } from "react";

const ThemeToggle = () => {
  let [isDark, setIsDark] = useState(false);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    setIsDark(true);
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    setIsDark(false);
  };

  const toggleTheme = (e) => {
    if (isDark) {
      setLightMode();
    } else {
      setDarkMode();
    }
  };
  return (
    <button className="themediv" onClick={toggleTheme}>
      <IoCloudyNightSharp className="darkthemeicon" />
    </button>
  );
};

export default ThemeToggle;
