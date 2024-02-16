import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeStep: 3,
    currentStep: 3,
}
export const stepperSlice = createSlice({
    name: 'stepper',
    initialState,
    reducers: {
        changeActiveStep: (state, action) => {
            state.activeStep = action.payload;
        },
        changeCurrentStep: (state, {payload}) => {
            state.activeStep = payload;
            state.currentStep = payload;
        }
    },
});


export const { actions, reducer } = stepperSlice;