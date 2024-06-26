import { createSlice } from "@reduxjs/toolkit";
import { IPrint } from "../../utils/types";
import { initialPrintState } from "../../utils/constants";
import { printParams } from "../../utils/constants";


export interface IThirdStep {
    stepThreeName: string,
    isOrderWithPrint: boolean,
    printQty: string,
    prints?: Array<IPrint>,
}

const initialState: IThirdStep = {
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
            if (!payload) {
                state.printQty = '';
                state.prints = undefined;
            }
        },
        setPrintQty: (state, { payload }) => {
            const { value, sizes } = payload;
            state.printQty = value;
            state.prints = [];
            const printSizes = sizes.map((size: any) => {
                return {
                    ...size,
                    printQty: '',
                }
            })
            initialPrintState.sizes = printSizes;
            for (let i = 0; i < parseInt(value); i++) {
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
            state.prints![index].sizes!.forEach((item) => {
                if (item.size === size) item.printQty = value;
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
        resetState: () => {
            return initialState
        },
        //@ts-ignore
        restoreState: (state, action) => {
            return action.payload;
        },
        deletePrint: (state, action) => {
            state.prints?.splice(action.payload, 1);
            let newQty = parseInt(state.printQty);
            state.printQty = (newQty - 1).toString();
        }
    },
});


export const { actions, reducer } = ThirdStepSlice;