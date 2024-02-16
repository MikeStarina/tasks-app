import React from 'react'
import styles from './third-step.module.css';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as thirdStepActions } from '../../store/third-step/third-step.slice';
import PrintComp from '../print-comp/print-comp';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { actions as stepperActions } from '../../store/stepper/stepper.slice';








const ThirdStep: React.FC = () => {

    const { isOrderWithPrint, printQty, prints } = useAppSelector(store => store.thirdStep)
    const { activeStep, currentStep } = useAppSelector(store => store.stepper)
    const dispatch = useAppDispatch();
    //console.log(prints)
    const onChangeHandler = (e: any) => {
        const { name } = e.target;
        name === 'isOrderWithPrint' && dispatch(thirdStepActions.setIsOrderWithPrint(e.target.checked))
        name === 'printQty' && dispatch(thirdStepActions.setPrintQty(e.target.value))
    }
    const submitHandler = (e: any) => {
        e.preventDefault();
        const newCurrentStep = activeStep === currentStep ? currentStep + 1 : currentStep;
        dispatch(stepperActions.changeCurrentStep(newCurrentStep))
    }

    return(
        <section className={styles.content}>
                <Box component="form" 
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                    onSubmit={submitHandler}
                >
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox name='isOrderWithPrint' />
                            }
                            label='Печать на изделиях' 
                            checked={isOrderWithPrint} 
                            name='isOrderWithPrint'
                            onChange={onChangeHandler}                    
                        />
                    </FormGroup>
                    {isOrderWithPrint && <TextField id="printQty" name='printQty' label="Количество принтов" variant="outlined" required={true} inputProps={{ pattern: "[1-9]" }} value={printQty} onChange={onChangeHandler}/>}
                    {prints && prints!.length > 0 && prints!.map((item, index) => {
                        if (item)
                        return (
                           
                                <PrintComp index={index} key={index}/>
                            
                        )
                    })}
                    <Button variant="contained" type='submit'
                        sx={{
                            width: '200px',
                            alignSelf: 'center',
                            marginTop: '30px'
                        }}
                        
                    >Далее</Button>
                </Box>
        </section>
    )
}

export default ThirdStep;