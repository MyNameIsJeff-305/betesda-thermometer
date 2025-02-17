import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import { getAllThermometersThunk } from '../../store/thermometers';
import { ThemeContext } from '../../context/ThemeContext';
import CustomThermometer from '../CustomThermometer/CustomThermometer';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import AddThermometerModal from '../AddThermometerModal/AddThermometerModal';
import { MdRefresh } from "react-icons/md";
import * as sessionActions from '../../store/session';
import './ThermometerScreen.css';

const ThermometerScreen = () => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [thermometerChecker, setThermometerChecker] = useState(false);

    const thermometer = useSelector(state => state.thermometers.currentThermometer);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllThermometersThunk());
        dispatch(sessionActions.restoreUser());
    }, [dispatch]);

    useEffect(() => {
        if (thermometerChecker) {
            dispatch(getAllThermometersThunk()).then(() => setThermometerChecker(false));
        }
    }, [thermometerChecker, dispatch]);

    const handleUpdateThermometer = () => {
        dispatch(getAllThermometersThunk());
    };

    if (!thermometer) {
        return <div>Loading...</div>;
    }

    return (
        <div className='thermometer-container'>
            <div className="thermometer-labels-regular">
                <CustomThermometer
                    theme={theme}
                    value={thermometer?.value}
                    steps={40}
                    max={2200000}
                    size="large"
                    height={600}
                />
            </div>
            <div className="thermometer-labels-mobile">
                <CustomThermometer
                    theme={theme}
                    value={thermometer?.value}
                    steps={40}
                    max={2200000}
                    size="large"
                    height={600}
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
                            <OpenModalMenuItem
                                style={{color: 'white'}}
                                itemText="Add a Thermometer"
                                modalComponent={<AddThermometerModal user={user?.id} setThermometerChecker={setThermometerChecker}/>}
                            />
                        </button>
                        <div className='add-thermometer-button-mobile'>
                            <OpenModalMenuItem
                                style={{color: 'white'}}
                                itemText="Add a Thermometer"
                                modalComponent={<AddThermometerModal user={user?.id} setThermometerChecker={setThermometerChecker}/>}
                            />
                        </div>
                    </div>
                    
                )
            }
        </div>
    );
};

export default ThermometerScreen;
