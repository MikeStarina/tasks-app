import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
//import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { StepButton } from '@mui/material';
import { actions } from '../../store/stepper/stepper.slice';

const steps = ['Общая информация', 'Пошив', 'Печать', 'Доставка и упаковка'];





const StepperComponent: React.FC = () => {
    
    const { activeStep, currentStep } = useAppSelector(store => store.stepper)
    const dispatch = useAppDispatch();

    const stepClickHandler = (index: number) => () => {
         dispatch(actions.changeActiveStep(index + 1));
    }


    return (
    <>
        <Box sx={{ width: '80%' }}>
            <Stepper nonLinear activeStep={activeStep - 1}>
                {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {completed: index + 1 < currentStep};
                return (
                    <Step key={label} {...stepProps}>
                        <StepButton onClick={stepClickHandler(index)} disabled={index + 1 > currentStep}>
                            <StepLabel>{label}</StepLabel>
                        </StepButton>
                    </Step>
                );
                })}
            </Stepper>
            
        </Box>
    </>
    )
}

export default StepperComponent;