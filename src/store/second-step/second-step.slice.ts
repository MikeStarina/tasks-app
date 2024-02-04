import { createSlice } from "@reduxjs/toolkit";

interface ISecondStep {
    supplier: string;
    primaryFabricType: string;
    secondaryFabricType: string;
}

const initialState: ISecondStep = {
    supplier: '',
    primaryFabricType: '',
    secondaryFabricType: '',
};

export const firstStepSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setSupplier: (state, { payload }) => {
              
        },        
    },
});


export const { actions, reducer } = firstStepSlice;