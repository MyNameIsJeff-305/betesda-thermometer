import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './IconThemeSwitch.css';

const IconThemeSwitch = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDarkMode = theme === 'dark';

    return (
        <div
            className="icon-theme-switch"
            onClick={toggleTheme}
            style={{ cursor: 'pointer' }}
        >
            {isDarkMode ? <FaMoon /> : <FaSun />}
        </div>
    );
};

export default IconThemeSwitch;