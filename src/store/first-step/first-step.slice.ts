import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import 'dayjs/locale/de';

interface IFirstStep {
    orderNumber: string;
    managerName: string;
    startDate: any;
    dueDate: any;
    textileType: string;
    textileQty?: number;
}

const initialState: IFirstStep = {
    orderNumber: '',
    managerName: '',
    startDate: JSON.stringify(dayjs().locale("de")),
    dueDate: JSON.stringify(dayjs().locale("de").add(30, 'day')),
    textileType: '',
    textileQty: 0
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
        
    },
});


export const { actions, reducer } = firstStepSlice;