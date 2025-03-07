import React, { useEffect, useState } from "react";
import "../styles/DarkMode.css";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  return (
    <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default DarkModeToggle;
