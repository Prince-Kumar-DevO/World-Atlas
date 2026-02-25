import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

function Navbar() {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme === "dark";
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if (isDark) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <nav className="navbar">
            <h2 className="logo">🌍 World Atlas</h2>

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/countries">Countries</Link></li>
                <li>
                    <button
                        className="theme-toggle-btn"
                        onClick={() => setIsDark(!isDark)}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;