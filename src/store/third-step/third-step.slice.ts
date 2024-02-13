import { createSlice } from "@reduxjs/toolkit";
import { IPrint } from "../../utils/types";
import { initialPrintState } from "../../utils/constants";
import { printParams } from "../../utils/constants";


interface IInitialState {
    stepThreeName: string,
    isOrderWithPrint: boolean,
    printQty: string,
    prints?: Array<IPrint>,
}

const initialState: IInitialState = {
    stepThreeName: 'Печать',
    isOrderWithPrint: true,
    printQty: '',
}
export const ThirdStepSlice = createSlice({
    name: 'ThirdStep',
    initialState,
    reducers: {
        setIsOrderWithPrint: (state, { payload }) => {
            state.isOrderWithPrint = payload;
        },
        setPrintQty: (state, { payload }) => {
            state.printQty = payload;
            state.prints = [];
            for (let i = 0; i < parseInt(payload); i++) {
                state.prints.push(initialPrintState);
            }
        },
        setPrintMethod: (state, { payload }) => {
            state.prints![payload.index].method = payload.method;
            const p = printParams.filter(item => item.method === payload.method)[0];
            state.prints![payload.index].params = p?.params;
        },
        setSSParams: (state, { payload }) => {
            const { name, value, index } = payload;
            if (name === 'pantoneColors') state.prints![index].params!.pantoneColors = value;
            if (name === 'specialEffects') state.prints![index].params!.specialEffects = value;
            if (name === 'isCMYK') state.prints![index].params!.isCMYK = value;
            if (name === 'isStretch') state.prints![index].params!.isStretch = value;
            if (name === 'isAntimigration') state.prints![index].params!.isAntimigration = value;
            
        },
        setEmbParams: (state, { payload }) => {
            const { value, index } = payload;
            state.prints![index].params!.threadsColors = value;
            
        },
        setHTParams: (state, { payload }) => {
            const { value, index } = payload;
            state.prints![index].params!.specialEffects = value;
            
        },
        setPrintSizes: (state, { payload }) => {
            const { value, index, size } = payload;
            state.prints![index].sizes.forEach((item) => {
                if (item.size === size) item.qty = value;
            });
            
        },
        setBasicPrintInfo: (state, { payload }) => {
            const { name, value, index } = payload;
            if (name === 'printWidth') state.prints![index].printWidth = value;
            if (name === 'printHeight') state.prints![index].printHeight = value;
            if (name === 'printPosition') state.prints![index].position = value;
            if (name === 'printMargins') state.prints![index].printMargins = value;
            
        },
        setImages: (state, { payload }) => {
            if (payload.name === 'printPreview') {
                //console.log(payload);
                state.prints![payload.index].printPreview = payload.fileLink;
                //state.prints![payload.index].blobPreview = payload.data;
            }
            if (payload.name === 'mockup') {
                state.prints![payload.index].mockup = payload.fileLink
                //state.prints![payload.index].blobMockup = payload.data
            };
        },
    },
});


export const { actions, reducer } = ThirdStepSlice;