import React from 'react';
import styles from './parts-for-print-component.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as secondStepActions } from '../../store/second-step/second-step.slice';

const partsOptions = [ 
    {
        name: 'Футболка',
        parts: [
            {
                ruName: 'Полочка',
                engName: 'front'
            },
            {
                ruName: 'Спинка',
                engName: 'back'
            },
            {
                ruName: 'Левый рукав',
                engName: 'leftSleeve'
            },
            {
                ruName: 'Правый рукав',
                engName: 'rightSleeve'
            },
        ]
    },
    {
        name: 'Худи',
        parts: [
            {
                ruName: 'Полочка',
                engName: 'front'
            },
            {
                ruName: 'Спинка',
                engName: 'back'
            },
            {
                ruName: 'Левый рукав',
                engName: 'leftSleeve'
            },
            {
                ruName: 'Правый рукав',
                engName: 'rightSleeve'
            },
            {
                ruName: 'Карман',
                engName: 'pocket'
            },
            {
                ruName: 'Левый Капюшон',
                engName: 'leftHood'
            },
            {
                ruName: 'Правый Капюшон',
                engName: 'rightHood'
            },
        ]
    },
    {
        name: 'Свитшот',
        parts: [
            {
                ruName: 'Полочка',
                engName: 'front'
            },
            {
                ruName: 'Спинка',
                engName: 'back'
            },
            {
                ruName: 'Левый рукав',
                engName: 'leftSleeve'
            },
            {
                ruName: 'Правый рукав',
                engName: 'rightSleeve'
            },
        ]
    },
    
 ];

 const printMethods = [
    {
        ruMethod: 'Шелкография',
        engMethod: 'Screenprinting'
    },
    {
        ruMethod: 'Прямая печать',
        engMethod: 'DTG'
    },
    {
        ruMethod: 'ДТФ',
        engMethod: 'DTF'
    },
    {
        ruMethod: 'Термоперенос',
        engMethod: 'HeatTransfer'
    },
    {
        ruMethod: 'Вышивка',
        engMethod: 'Embroidery'
    },
 ]


const PartForPrintComponent: React.FC = () => {

    const dispatch = useAppDispatch();
    const { printOnParts } = useAppSelector(store => store.secondStep);
    const { textileType } = useAppSelector(store => store.firstStep);
    const { isPrintOnParts, partsForPrint } = printOnParts;



    const filteredOptions = partsOptions.filter((item) => item.name === textileType);
    const [ currentOption ] = filteredOptions;


    const switchChangeHandler = () => {        
        dispatch(secondStepActions.setIsPrintOnParts(!isPrintOnParts))
    }

    const checkboxChangeHandler = (e: any) => {
        dispatch(secondStepActions.setPartsForPrint({name: e.target.name, status: e.target.checked}))
    }

    const selectOnChangeHandler = (e: any) => {
        dispatch(secondStepActions.setPartsPrintMethod({name: e.target.name, method: e.target.value}))
    } 

    return (
        <>
        <FormControlLabel control={<Switch value={isPrintOnParts} onChange={switchChangeHandler} />} label="Печать в крое" sx={{marginBottom: '50px'}}/>
        <div className={styles.boxWrapper}>     
            <div className={styles.parts_box}>    
                <FormGroup>
                    {isPrintOnParts && currentOption.parts.map(({ruName, engName}, index) => {

                        return (                    
                                <FormControlLabel
                                    control={
                                    <Checkbox name={engName} onChange={checkboxChangeHandler} />
                                    }
                                    label={ruName}
                                    key={index}                            
                                />          
                            
                        )
                    })}
                </FormGroup>
            </div>

                    <div className={styles.methods_box}>
                    {partsForPrint.map((part, index) => {

                        if (part.isForPrint) {
                        return (
                            <FormControl sx={{width: '100%'}} key={index}>
                                <InputLabel id={part.name}>{part.ruName} - метод печати</InputLabel>
                                <Select labelId={`${part.name}Label`} id={`${part.name}Method`} name={part.name} label={`${part.ruName} - метод печати`} variant="outlined" required size='small' onChange={selectOnChangeHandler} value={part.method} sx={{padding: '5px'}}>
                                    {printMethods.map(({ruMethod}, index)=>(
                                        <MenuItem key={index} value={ruMethod}>{ruMethod}</MenuItem>
                                    ))}
                                        
                                    
                                </Select>
                            </FormControl>
                        )
                    }
                    })}
                    </div>
        </div>

        </>
    )
}

export default PartForPrintComponent;