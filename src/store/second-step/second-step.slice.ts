import { createSlice } from "@reduxjs/toolkit";
import { sewingOptions, TSewingOptions } from "../../utils/constants";


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
    sewingOptions: TSewingOptions;
    furniture: {
        isCord: boolean;
        cordColor: string; 
        sizeLabel: Array<{ type: string, name: string, status: boolean, }>;
        sizeLabelAssembling: string,
        containLabel: Array<{ type: string, name: string, status: boolean, }>;
        containLabelAssembling: string,
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
    sewingOptions,
    furniture: {
        isCord: true,
        cordColor: '',
        sizeLabel: [{ type: 'basicSizeLabel', name: 'Размерник PNHD', status: true, }, { type: 'customSizeLabel', name: 'Кастомный размерник', status: false, }],
        sizeLabelAssembling: '',
        containLabel: [{ type: 'basicContainLabel', name: 'Составник PNHD', status: true, }, { type: 'customContainLabel', name: 'Кастомный составник', status: false, }],
        containLabelAssembling: '',
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
                    item!.qty = payload.qty === '' ? 0 : payload.qty;
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
        },       
        setSewingComment: (state, { payload }) => {        
            state.sewingComment = payload;
        },       
        setLabels: (state, { payload }) => { 
       
            const {id, name} = payload
            if (id === 'sizeLabel') {
        
                state.furniture.sizeLabel.forEach((item) => {
                    item.status = item.type === name ? true : false;
                })
            }
            if (id === 'containLabel') {
                state.furniture.containLabel.forEach((item) => {
                    item.status = item.type === name ? true : false;
                })
            }
        },
        setLabelsAssembling: (state, { payload }) => {   
            const { id, value } = payload;    
            if (id === 'sizeLabelAssemblingType') state.furniture.sizeLabelAssembling = value;
            if (id === 'containLabelAssemblingType') state.furniture.containLabelAssembling = value;
        },
        setIsCord: (state) => {
            return {
                ...state,
                furniture: {
                    ...state.furniture,
                    isCord: !state.furniture.isCord,
                }
            }
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