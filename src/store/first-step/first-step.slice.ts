import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import 'dayjs/locale/de';
import { TPassport } from "../../utils/types";

export interface IFirstStep {
    orderType: 'new' | 'edit';
    stepOneName: string;
    orderNumber: string;
    managerName: string;
    startDate: any;
    dueDate: any;
    textileType: string;
    textileQty: string;
    passport: string;
    validPassport: TPassport | undefined;
}

const initialState: IFirstStep = {
    orderType: 'new',
    stepOneName: 'ОБЩАЯ ИНФОРМАЦИЯ',
    orderNumber: '',
    managerName: '',
    startDate: JSON.stringify(dayjs().locale("de")),
    dueDate: JSON.stringify(dayjs().locale("de").add(30, 'day')),
    textileType: '',
    textileQty: '',
    passport: '',
    validPassport: undefined,
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
        setValidPassport: (state, action: PayloadAction<TPassport>) => {
            return {
                ...state,
                validPassport: action.payload,
            }
        },
        resetState: () => {
            return initialState
        },
        restoreState: (state, action) => {
            return action.payload;
        },
        setOrderType: (state, action) => {
            return {
                ...state,
                orderType: action.payload
            }
        }
        
    },
});


export const { actions, reducer } = firstStepSlice;