import { createSlice } from "@reduxjs/toolkit";
import { sewingOptions, TSewingOptions } from "../../utils/constants";


interface ISecondStep {
    stepTwoName: string;
    supplier: string;
    primaryFabricType: string;
    secondaryFabricType: string;
    sizes: Array<
        {
            size: string;
            qty: string;
        }
    >;
    fabricColor: string;
    isQtyEqual: boolean;
    printOnParts: {
        isPrintOnParts: boolean;
        partsForPrint: Array<{ name: string, isForPrint: boolean, method: string, ruName: string }>;
    };
    sewingOptions: TSewingOptions;
    furniture: {
        isCord: boolean;
        cordColor: string;
        basicSizeLabel: boolean;
        basicContainLabel: boolean;
    };
    sewingComment: string;
}

const initialState: ISecondStep = {
    stepTwoName: 'ЗАКРОЙ И ПОШИВ',
    supplier: '',
    primaryFabricType: '',
    secondaryFabricType: '',
    sizes: [{ size: 'XS', qty: ''}, { size: 'S', qty: ''}, { size: 'M', qty: ''}, { size: 'L', qty: ''}, { size: 'XL', qty: ''}, { size: 'XXL', qty: ''}, { size: 'XXXL', qty: ''}],
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
    sewingOptions,
    furniture: {
        isCord: true,
        cordColor: '',
        basicSizeLabel: true,
        basicContainLabel: true
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
        setSizes: (state, { payload }) => {
              state.sizes?.forEach((item) => {
                if (item.size === payload.size) {
                    item.qty = payload.qty;
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
        setSewingOptions: (state, { payload }) => {            
            const options = state.sewingOptions.filter((item) => item.name === payload);
            state.sewingOptions = options;
        },        
        setNeckClosure: (state, { payload }) => {          
            state.sewingOptions[0].neckClosure.forEach((item) => {
                item.status = false;
                if (item.label === payload) item.status = true; 
            });
        },        
        setNeckSewing: (state, { payload }) => {          
            state.sewingOptions[0].neckSewing.forEach((item) => {
                item.status = false;
                if (item.label === payload) item.status = true; 
            });
        },        
        setFlatlock: (state, { payload }) => {          
            state.sewingOptions[0].flatlock.forEach((item) => {                
                if (item.label === payload.value) item.status = payload.status; 
            });
        },       
        setFurniture: (state, { payload }) => {        
            if (payload.name === 'cord') state.furniture.isCord = payload.value;
            if (payload.name === 'cordColor') state.furniture.cordColor = payload.value;
            if (payload.name === 'basicSizeLabel') state.furniture.basicSizeLabel = payload.value;
            if (payload.name === 'basicContainLabel') state.furniture.basicContainLabel = payload.value;
        },       
        setSewingComment: (state, { payload }) => {        
            state.sewingComment = payload;
        },       
         
}});


export const { actions, reducer } = secondStepSlice;