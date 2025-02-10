import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllThermometersThunk } from '../../store/thermometers';

import Thermometer from 'react-thermometer-component'

import './ThermometerScreen.css';

const ThermometerScreen = () => {

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
                theme="light"
                value={thermometer?.value}
                // steps="5"
                max={thermometer?.max}
                size="large"
                height="500"
            />
        </div>
    )
}

export default ThermometerScreen;