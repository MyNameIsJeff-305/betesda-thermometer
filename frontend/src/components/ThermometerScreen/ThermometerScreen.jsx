import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllThermometersThunk } from '../../store/thermometers';

import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import Thermometer from 'react-thermometer-component'

import './ThermometerScreen.css';

const ThermometerScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDarkMode = theme === 'dark';

    const dispatch = useDispatch();
    const thermometer = useSelector(state => state.thermometers.currentThermometer);

    useEffect(() => {
        dispatch(getAllThermometersThunk());
    }, [dispatch]);

    if (!thermometer) return (
        <div>
            Loading...
        </div>
    )

    return (
        <div className='thermometer-container'>
            <Thermometer
                theme={theme}
                value={thermometer?.value}
                steps="5"
                max="2200000"
                size="large"
                height="500"
            />
        </div>
    )
}

export default ThermometerScreen;