import { FaGithub } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

const currentYear = new Date().getFullYear();

import './Footer.css'
import IconThemeSwitch from "../IconThemeSwitch/IconThemeSwitch";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-text">
                <p>&copy; {currentYear} Betesda Church. All rights reserved.</p>
            </div>
            <div className="footer-links">
                <a href="https://github.com/MyNameIsJeff-305"><FaGithub /></a>
                <a href="https://mynameisjeffportfolio.netlify.app/"><BiWorld /></a>
                <IconThemeSwitch />
            </div>
        </footer>
    );
};

export default Footer;