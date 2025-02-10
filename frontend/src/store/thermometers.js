import { csrfFetch } from "./csrf";

//CONSTANTS
const GET_ALL_THERMOMETERS = "thermometer/getAllThermometers";
const SET_THERMOMETER = "thermometer/setThermometer";
const ADD_THERMOMETER = "thermometer/addThermometer";
const EDIT_THERMOMETER = "thermometer/editThermometer";
const DELETE_THERMOMETER = "thermometer/deleteThermometer"; 
const MOST_RECENT_THERMOMETER = "thermometer/mostRecentThermometer";

//ACTION CREATORS
const getAllThermometers = (thermometers) => {
    return {
        type: GET_ALL_THERMOMETERS,
        payload: thermometers
    }
};

const setThermometer = (thermometer) => {
    return {
        type: SET_THERMOMETER,
        payload: thermometer
    }
};

const addThermometer = (thermometer) => {
    return {
        type: ADD_THERMOMETER,
        payload: thermometer
    }
};

const editThermometer = (thermometer) => {
    return {
        type: EDIT_THERMOMETER,
        payload: thermometer
    }
};

const deleteThermometer = (thermometerId) => {
    return {
        type: DELETE_THERMOMETER,
        payload: thermometerId
    }
};

const mostRecentThermometer = (thermometer) => {
    return {
        type: MOST_RECENT_THERMOMETER,
        payload: thermometer
    }
}

//THUNKS
export const getAllThermometersThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/thermometers");
    const data = await response.json();
    dispatch(getAllThermometers(data));
};

export const getThermometerThunk = (thermometerId) => async (dispatch) => {
    const response = await csrfFetch(`/api/thermometers/${thermometerId}`);
    const data = await response.json();
    dispatch(setThermometer(data));
};

export const addThermometerThunk = (thermometer) => async (dispatch) => {
    const response = await csrfFetch("/api/thermometers", {
        method: "POST",
        body: JSON.stringify(thermometer)
    });
    const data = await response.json();
    dispatch(addThermometer(data));
    return response;
};

export const editThermometerThunk = (thermometer) => async (dispatch) => {
    const response = await csrfFetch(`/api/thermometers/${thermometer.id}`, {
        method: "PUT",
        body: JSON.stringify(thermometer)
    });
    const data = await response.json();
    dispatch(editThermometer(data));
    return response;
};

export const deleteThermometerThunk = (thermometerId) => async (dispatch) => {
    const response = await csrfFetch(`/api/thermometers/${thermometerId}`, {
        method: "DELETE"
    });
    dispatch(deleteThermometer(thermometerId));
    return response;
};

export const mostRecentThermometerThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/thermometers/recent");
    const data = await response.json();
    dispatch(mostRecentThermometer(data));
}

//REDUCER
const initialState = {
    thermometers: [],
    currentThermometer: null
};

const thermometerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_THERMOMETERS:
            return {
                ...state,
                thermometers: action.payload,
                currentThermometer: action.payload[action.payload.length - 1]
            };
        case SET_THERMOMETER:
            return {
                ...state,
                currentThermometer: action.payload
            };
        case ADD_THERMOMETER:
            return {
                ...state,
                thermometers: [...state.thermometers, action.payload]
            };
        case EDIT_THERMOMETER:
            return {
                ...state,
                thermometers: state.thermometers.map(thermometer => {
                    return thermometer.id === action.payload.id ? action.payload : thermometer
                })
            };
        case DELETE_THERMOMETER:
            return {
                ...state,
                thermometers: state.thermometers.filter(thermometer => thermometer.id !== action.payload)
            };
        case MOST_RECENT_THERMOMETER:
            return {
                ...state,
                currentThermometer: action.payload
            };
        default:
            return state;
    }
};

export default thermometerReducer;