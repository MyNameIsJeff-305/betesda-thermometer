import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { mostRecentThermometerThunk, getAllThermometersThunk } from '../store/thermometers';

import Thermometer from 'react-thermometer-component'

const ThermometerScreen = () => {

    const dispatch = useDispatch();
    const thermometer = useSelector(state => state.thermometers.currentThermometer);

    useEffect(() => {
        dispatch(getAllThermometersThunk());
        console.log(thermometer, "PRINTING THERMOMETER");
    }, [dispatch]);

    if(!thermometer) return (
        <div>
            Loading...
        </div>
    )

    return (
        <Thermometer
            theme="light"
            value={thermometer?.value}
            max={thermometer?.max}
            // steps={thermometer?.steps}
            format={thermometer?.format}
            size="large"
            height="300"
        />
    )
}

export default ThermometerScreen;