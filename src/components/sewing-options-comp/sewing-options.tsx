import React, { useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from './sewing-options.module.css';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as secondStepActions } from "../../store/second-step/second-step.slice";





type TProps = {
    textileType: String
}



const SewingOptions: React.FC<TProps> = (props) => {

    const { sewingOptions } = useAppSelector(store => store.secondStep)
    const { textileType } = props;
    const [ currentOptions ] = sewingOptions;


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(secondStepActions.setSewingOptions(textileType));
    }, [])

    const radioOnChangeHandler = (e: any) => {
        e.target.name == 'neckClosure' && dispatch(secondStepActions.setNeckClosure(e.target.value));
        e.target.name == 'neckSewing' && dispatch(secondStepActions.setNeckSewing(e.target.value));
        
    }
    const checkBoxOnChangeHandler = (e: any) => {
        dispatch(secondStepActions.setFlatlock({value: e.target.value, status: e.target.checked}));
    }
    



    return (
        <>
        {sewingOptions.length === 1 &&
        <>
        <h3>Опции пошива</h3>
        <div className={styles.box}>
            <div className={styles.column}>
                <FormControl>
                        <FormLabel id="neckClosureLabel">Закрытие горловины:</FormLabel>
                        <RadioGroup
                            aria-labelledby="neckClosureLabel"
                            name="neckClosure-buttons-group"
                        >
                            {currentOptions.neckClosure.map((item, index) => {

                                return (
                                    <FormControlLabel key={index} value={item.label} control={<Radio />} name={item.name} label={item.label} onChange={radioOnChangeHandler} checked={item.status}/>
                                )
                            })}
                        </RadioGroup>
                </FormControl>
            </div>
            <div className={styles.column}>
                <FormControl>
                        <FormLabel id="neckSewingLabel">Обработка горловины:</FormLabel>
                        <RadioGroup
                            aria-labelledby="neckSewingLabel"
                            name="neckSewing-buttons-group"
                        >
                            {currentOptions.neckSewing.map((item, index) => {

                                return (
                                    <FormControlLabel key={index} value={item.label} control={<Radio />} label={item.label} name={item.name} checked={item.status} onChange={radioOnChangeHandler}/>
                                )
                            })}
                        </RadioGroup>
                </FormControl>
            </div>
            <div className={styles.column}>
                <FormGroup>
                        <FormLabel id="FlatlockLabel">Распошив элементов:</FormLabel>
                    {currentOptions.flatlock.map((item, index) => {

                        return (
                            <FormControlLabel
                                        control={
                                        <Checkbox name={item.tagName} />
                                        }
                                        label={item.label}
                                        key={index} 
                                        value={item.label} 
                                        onChange={checkBoxOnChangeHandler}                      
                            />
                        )
                        })}
                </FormGroup>
            </div>
        </div>
        </>
        }
        
        
        </>
    )
};

export default SewingOptions;