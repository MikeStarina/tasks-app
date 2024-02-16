import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import 'dayjs/locale/de';

interface IFirstStep {
    stepOneName: string;
    orderNumber: string;
    managerName: string;
    startDate: any;
    dueDate: any;
    textileType: string;
    textileQty: string;
    passport: string;
}

const initialState: IFirstStep = {
    stepOneName: 'ОБЩАЯ ИНФОРМАЦИЯ',
    orderNumber: '',
    managerName: '',
    startDate: JSON.stringify(dayjs().locale("de")),
    dueDate: JSON.stringify(dayjs().locale("de").add(30, 'day')),
    textileType: '',
    textileQty: '',
    passport: '',
};

export const firstStepSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addOrderNumber: (state, { payload }) => {
            state.orderNumber = payload;            
        },
        addManagerName: (state, { payload }) => {
            state.managerName = payload;
        },
        addStartDate: (state, { payload }) => {
            state.startDate = payload;
        },
        addDueDate: (state, { payload }) => {
            state.dueDate = payload;
        },
        addTextileType: (state, { payload }) => {
            state.textileType = payload;
        },
        addTextileQty: (state, { payload }) => {
            state.textileQty = payload;
        },
        addPassport: (state, { payload }) => {
            state.passport = payload;
        },
        
    },
});


export const { actions, reducer } = firstStepSlice;