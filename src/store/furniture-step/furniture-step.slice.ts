import { createSlice } from "@reduxjs/toolkit";
import { TSewingOptions } from "../../utils/constants";
import { sewingOptions } from "../../utils/constants";

export interface IFurnitureState {
    sewingOptions: TSewingOptions;
    furniture: {
        isCord: boolean;
        cordColor: string; 
        sizeLabel: Array<{ type: string, name: string, status: boolean, preview?: string}>;
        sizeLabelAssembling: string,
        containLabel: Array<{ type: string, name: string, status: boolean, preview?: string}>;
        containLabelAssembling: string,
    };
    additionalFurnitureQuantity: string,
    additionalFurniture?: Array<{ id: string, name: string, preview: string, assembling: string}>
}


const initialState: IFurnitureState = {
    sewingOptions,
    furniture: {
        isCord: true,
        cordColor: '',
        sizeLabel: [{ type: 'basicSizeLabel', name: 'Размерник PNHD', status: true, }, { type: 'customSizeLabel', name: 'Кастомный размерник', status: false, preview: ''}],
        sizeLabelAssembling: '',
        containLabel: [{ type: 'basicContainLabel', name: 'Составник PNHD', status: true, }, { type: 'customContainLabel', name: 'Кастомный составник', status: false, preview: ''}],
        containLabelAssembling: '',
        
    },
    additionalFurnitureQuantity: '',
    additionalFurniture: [],
}


const FurnitureSlice = createSlice({
    name: 'furniture',
    initialState,
    reducers: {
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
        setAdditionalFurnitureQuantity: (state, action) => {
            const arrayLength = parseInt(action.payload);
            const additionalFurnitureArray = [];
            for (let i = 0; i < arrayLength; i++) {
                additionalFurnitureArray.push({ id: `additionalFurniture#${i + 1}`,name: '', preview: '', assembling: ''})
            } 
            return {
                ...state,
                additionalFurnitureQuantity: action.payload,
                additionalFurniture: additionalFurnitureArray
            }
        },
        updateAdditionalFurnitureArray: (state, action) => {
            const { index: currIndex, value, type } = action.payload;
            //console.log(value);
            state.additionalFurniture?.forEach((item, index) => {
                if (index === currIndex && type === 'furnitureName') {
                    item.name = value
                };
                if (index === currIndex && type === 'furnitureAssembling') {
                    item.assembling = value
                };
                if (index === currIndex && type === 'preview') {
                    item.preview = value
                };
            })
            
        },
        setLabelPreview: (state, action) => {
            const { value, id } = action.payload;
            console.log(value);
            if (id === 'sizeLabel') state.furniture.sizeLabel[1].preview = value;
            if (id === 'containLabel') state.furniture.containLabel[1].preview = value;
            
        },
        //@ts-ignore
        restoreState: (state, action) => {
            return action.payload;
        },
        //@ts-ignore
        resetState: (state) => {
            return initialState;
        },
        deleteAdditionalFurniture: (state, action) => {
            console.log(action)
            state.additionalFurniture?.splice(action.payload, 1)
            let newQty = parseInt(state.additionalFurnitureQuantity);
            state.additionalFurnitureQuantity = (newQty - 1).toString();

        }
    },
});


export const { actions, reducer } = FurnitureSlice;