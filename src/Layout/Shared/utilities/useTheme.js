// src/Hooks/useTheme.js
import { useEffect, useState } from "react";

const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
        setIsDarkMode(storedTheme === "dark");
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newTheme = prev ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.toggle("dark", !prev);
            return !prev;
        });
    };

    return { isDarkMode, toggleTheme };
};

export default useTheme;
