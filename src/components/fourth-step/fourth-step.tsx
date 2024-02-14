import React from "react";
import styles from './fourth-step.module.css';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as stepperActions } from "../../store/stepper/stepper.slice";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';






const FourthStep: React.FC = () => {
    const dispatch = useAppDispatch();
    const { activeStep, currentStep } = useAppSelector(store => store.stepper)

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
                   
                    <Button variant="contained" type='submit'
                        sx={{
                            width: '200px',
                            alignSelf: 'center',
                            marginTop: '30px'
                        }}
                        
                    >Далее</Button>
                    <Link to='/render'>RENDER
                    </Link>
                </Box>
        </section>
    )
}

export default FourthStep;