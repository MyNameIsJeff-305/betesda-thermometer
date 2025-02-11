import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addThermometerThunk } from "../../store/thermometers";
import "./AddThermometerModal.css";

function AddThermometerModal({ user, setThermometerChecker }) {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { closeModal } = useModal();

    useEffect(() => {
        setErrors({});
    }, []);

    useEffect(() => {
        const newErrors = {};
        if (value < 0) {
            newErrors.value = "Value must be greater than 0";
        }
        if (value > 2200000) {
            newErrors.value = "Value must be less than 2,200,000";
        }
        setErrors(newErrors);
        setIsButtonDisabled(!!newErrors.value);
    }, [value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        dispatch(addThermometerThunk({
            value: parseInt(value),
            max: 2200000,
            steps: 10,
            format: "$",
            userId: user
        }))
            .then(() => {
                setThermometerChecker(true);
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setErrors(data);
                }
            });
    };

    return (
        <div className="add-thermometer-container">
            <form onSubmit={handleSubmit} className="add-thermometer-form">
                <h1>Add Thermometer</h1>
                <div className="add-thermometer-items">
                    <label id="value-field">
                        Value
                        <input
                            type="number"
                            className="add-thermometer-box"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        {errors.value && <p className="error-message">{errors.value}</p>}
                    </label>
                    <button type="submit" className="add-thermometer-button-form" disabled={isButtonDisabled}>
                        Add Thermometer
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddThermometerModal;
