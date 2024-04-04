import { createSlice } from "@reduxjs/toolkit";

export interface IFourthStep {
    fourthStepName: string,
    isVTO: boolean,
    isIndividualPack: boolean,
    isStretch: boolean,
    VTOComments: string,
    delivery: Array<{ type: string, name: string, status: boolean }>,
    deliveryData?: string
}

const initialState: IFourthStep = {
    fourthStepName: 'УПАКОВКА И ДОСТАВКА',
    isVTO: true,
    isIndividualPack: true,
    isStretch: true,
    VTOComments: '',
    delivery: [{type: 'self', name: 'Самовывоз', status: true},{type: 'intraCity', name: 'по СПБ', status: false},{type: 'cTc', name: 'Межгород', status: false}]
}
export const fourthStepSlice = createSlice({
    name: 'stepper',
    initialState,
    reducers: {
        setPackParams: (state, { payload }) => {
            const { name, value } = payload;
            if (name === 'ВТО') state.isVTO = value;
            if (name === 'Индивидуальная упаковка') state.isIndividualPack = value;
            if (name === 'Стрейч') state.isStretch = value;
            if (name === 'VTOComments') state.VTOComments = value;
            if (name === 'DeliveryComments') state.deliveryData = value;
        },
        setDelivery: (state, { payload }) => {
            
            const { name } = payload;
            state.delivery.forEach((item) => {
                item.status = false;
                if (item.type === name) item.status = true;
            })
        },
        resetState: () => {
            return initialState
        },
        restoreState: (state, action) => {
            return action.payload;
        }
    },
});


export const { actions, reducer } = fourthStepSlice;