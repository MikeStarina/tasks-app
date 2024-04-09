import { createSlice } from "@reduxjs/toolkit";


export interface ISecondStep {
    stepTwoName: string;
    supplier: string;
    primaryFabricType: string;
    secondaryFabricType: string;
    sizes: Array<
        {
            size: string;
            qty: string;
        } 
    > | undefined;
    fabricColor: string;
    isQtyEqual: boolean;
    printOnParts: {
        isPrintOnParts: boolean;
        partsForPrint: Array<{ name: string, isForPrint: boolean, method: string, ruName: string }>;
    };
    sewingComment: string;
}

const initialState: ISecondStep = {
    stepTwoName: 'ЗАКРОЙ И ПОШИВ',
    supplier: '',
    primaryFabricType: '',
    secondaryFabricType: '',
    sizes: [],
    fabricColor: '',
    isQtyEqual: false,
    printOnParts: {
        isPrintOnParts: false,
        partsForPrint: [
            {name: 'front', ruName: 'Полочка', isForPrint: false, method: ''},
            {name: 'back', ruName: 'Спинка', isForPrint: false, method: ''},
            {name: 'leftSleeve', ruName: 'Левый рукав', isForPrint: false, method: ''},
            {name: 'rightSleeve', ruName: 'Правый рукав', isForPrint: false, method: ''},
            {name: 'pocket', ruName: 'Карман', isForPrint: false, method: ''},
            {name: 'leftHood', ruName: 'Левый Капюшон', isForPrint: false, method: ''},
            {name: 'rightHood', ruName: 'Правый Капюшон', isForPrint: false, method: ''},
    ]
    },
    sewingComment: '',
};

export const secondStepSlice = createSlice({
    name: 'secondStep',
    initialState,
    reducers: {
        setSupplier: (state, { payload }) => {
              state.supplier = payload;
        },        
        setMainFabric: (state, { payload }) => {
              state.primaryFabricType = payload;
        },        
        setSecondaryFabric: (state, { payload }) => {
              state.secondaryFabricType = payload;
        },        
        setFabricColor: (state, { payload }) => {
              state.fabricColor = payload;
        },        
        setQtyEquality: (state, { payload }) => {
              state.isQtyEqual = payload;
        },        
        resetSizes: (state) => {
            state.sizes = undefined;
        },
        setInitialSizes: (state, action) => {
            state.sizes = [];
            action.payload.forEach((item: any) => {
                const sizeObj = {
                    size: item.attributes.name,
                    qty: ''
                }
                
                state.sizes!.push(sizeObj);
            })
        },
        setSizes: (state, { payload }) => {
              state.sizes?.forEach((item) => {
                if (item?.size === payload.size) {
                    item!.qty = payload.qty;
                }
              })
        },
        setIsPrintOnParts: (state, { payload }) => {

            state.printOnParts.isPrintOnParts = payload;
            if (!payload) {
                state.printOnParts.partsForPrint.forEach((part) => {
                    part.isForPrint = false;
                    part.method = '';
                })
            }

        },        
        setPartsForPrint: (state, { payload }) => {
            state.printOnParts.partsForPrint?.forEach((part) => {
                if (part.name === payload.name && payload.status) {
                    part.isForPrint = payload.status;
                }
                else if (part.name === payload.name && !payload.status) {
                    part.isForPrint = payload.status;
                    part.method = '';
                }
            })
        },        
        setPartsPrintMethod: (state, { payload }) => {
            state.printOnParts.partsForPrint?.forEach((part) => {
                if (part.name === payload.name) part.method = payload.method;
            })
        },                    
        setSewingComment: (state, { payload }) => {        
            state.sewingComment = payload;
        },       
        resetState: () => {
            return initialState
        },
        //@ts-ignore
        restoreState: (state, action) => {
            return action.payload;
        }
}});


export const { actions, reducer } = secondStepSlice;