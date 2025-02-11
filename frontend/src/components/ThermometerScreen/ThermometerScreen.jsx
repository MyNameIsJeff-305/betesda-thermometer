import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllThermometersThunk } from '../../store/thermometers';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import CustomThermometer from '../CustomThermometer/CustomThermometer';
import { MdRefresh } from "react-icons/md";
import * as sessionActions from '../../store/session';
import './ThermometerScreen.css';


const ThermometerScreen = () => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();

    const thermometer = useSelector(state => state.thermometers.currentThermometer);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllThermometersThunk());
        dispatch(sessionActions.restoreUser());
    }, [dispatch]);

    const handleUpdateThermometer = () => {
        dispatch(getAllThermometersThunk());
    };

    if (!thermometer) {
        return <div>Loading...</div>;
    }

    return (
        <div className='thermometer-container'>
            <div className="thermometer-labels">
                <CustomThermometer
                    theme={theme}
                    value={thermometer?.value}
                    steps={10}
                    max={2200000}
                    size="large"
                    height={500}
                />
            </div>
            <div className='additional-info'>
                <p>
                    Date: {moment(thermometer?.createdAt).format('MMMM Do YYYY h:mm:ss a')}
                </p>
                <button className='update-button' onClick={handleUpdateThermometer}><MdRefresh /></button>
            </div>
            {
                user && (
                    <div className='add-thermometer'>
                        <button className='add-thermometer-button'>
                            Add Thermometer
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default ThermometerScreen;
