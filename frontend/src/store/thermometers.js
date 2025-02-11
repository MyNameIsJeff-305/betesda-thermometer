import { csrfFetch } from "./csrf";

// CONSTANTS
const GET_ALL_THERMOMETERS = "thermometer/getAllThermometers";
const SET_THERMOMETER = "thermometer/setThermometer";
const ADD_THERMOMETER = "thermometer/addThermometer";
const EDIT_THERMOMETER = "thermometer/editThermometer";
const DELETE_THERMOMETER = "thermometer/deleteThermometer";
const MOST_RECENT_THERMOMETER = "thermometer/mostRecentThermometer";

// ACTION CREATORS
const getAllThermometers = (thermometers) => ({
    type: GET_ALL_THERMOMETERS,
    payload: thermometers || [],
});

const setThermometer = (thermometer) => ({
    type: SET_THERMOMETER,
    payload: thermometer || null,
});

const addThermometer = (thermometer) => ({
    type: ADD_THERMOMETER,
    payload: thermometer || {},
});

const editThermometer = (thermometer) => ({
    type: EDIT_THERMOMETER,
    payload: thermometer || {},
});

const deleteThermometer = (thermometerId) => ({
    type: DELETE_THERMOMETER,
    payload: thermometerId,
});

const mostRecentThermometer = (thermometer) => ({
    type: MOST_RECENT_THERMOMETER,
    payload: thermometer || null,
});

// THUNKS
export const getAllThermometersThunk = () => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/thermometers");
        if (!response.ok) throw new Error("Failed to fetch thermometers");

        const data = await response.json();
        dispatch(getAllThermometers(data));
    } catch (error) {
        console.error("Error fetching thermometers:", error);
    }
};

export const getThermometerThunk = (thermometerId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/thermometers/${thermometerId}`);
        if (!response.ok) throw new Error("Thermometer not found");

        const data = await response.json();
        dispatch(setThermometer(data));
    } catch (error) {
        console.error("Error fetching thermometer:", error);
    }
};

export const addThermometerThunk = (thermometer) => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/thermometers", {
            method: "POST",
            body: JSON.stringify(thermometer),
        });

        if (!response.ok) throw new Error("Failed to add thermometer");

        const data = await response.json();
        dispatch(addThermometer(data));
        return data;
    } catch (error) {
        console.error("Error adding thermometer:", error);
    }
};

export const editThermometerThunk = (thermometer) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/thermometers/${thermometer.id}`, {
            method: "PUT",
            body: JSON.stringify(thermometer),
        });

        if (!response.ok) throw new Error("Failed to update thermometer");

        const data = await response.json();
        dispatch(editThermometer(data));
        return data;
    } catch (error) {
        console.error("Error updating thermometer:", error);
    }
};

export const deleteThermometerThunk = (thermometerId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/thermometers/${thermometerId}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete thermometer");

        dispatch(deleteThermometer(thermometerId));
    } catch (error) {
        console.error("Error deleting thermometer:", error);
    }
};

export const mostRecentThermometerThunk = () => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/thermometers/recent");
        if (!response.ok) throw new Error("Failed to fetch most recent thermometer");

        const data = await response.json();
        dispatch(mostRecentThermometer(data));
    } catch (error) {
        console.error("Error fetching most recent thermometer:", error);
    }
};

// INITIAL STATE
const initialState = {
    thermometers: [],
    currentThermometer: null,
};

// REDUCER
const thermometerReducer = (state = initialState, action = {}) => {
    console.log("Reducer Action:", action); // Debugging log (can be removed in production)

    switch (action.type) {
        case GET_ALL_THERMOMETERS:
            return {
                ...state,
                thermometers: action.payload || [],
                currentThermometer: action.payload?.length ? action.payload[action.payload.length - 1] : null,
            };
        case SET_THERMOMETER:
            return {
                ...state,
                currentThermometer: action.payload || null,
            };
        case ADD_THERMOMETER:
            return {
                ...state,
                thermometers: [...state.thermometers, action.payload],
            };
        case EDIT_THERMOMETER:
            return {
                ...state,
                thermometers: state.thermometers.map((thermometer) =>
                    thermometer.id === action.payload.id ? action.payload : thermometer
                ),
            };
        case DELETE_THERMOMETER:
            return {
                ...state,
                thermometers: state.thermometers.filter((thermometer) => thermometer.id !== action.payload),
            };
        case MOST_RECENT_THERMOMETER:
            return {
                ...state,
                currentThermometer: action.payload || null,
            };
        default:
            return state;
    }
};

export default thermometerReducer;
