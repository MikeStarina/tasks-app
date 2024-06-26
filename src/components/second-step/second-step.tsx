import React, { useEffect, useRef, useState } from "react";
import styles from './second-step.module.css';
import FabricTypeComponent from "../fabric-type-component/fabric-type-component";
import Button from '@mui/material/Button';
import SizesComponent from "../sizes-component/sizes-component";
import PartForPrintComponent from "../parts-for-print-component/parts-for-print-component";
//import SewingOptions from "../sewing-options-comp/sewing-options";
//import FurnitureOptions from "../furniture-options-comp/furniture-options";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import TextField from '@mui/material/TextField';
import { actions as secondStepActions } from "../../store/second-step/second-step.slice";
import { actions as stepperActions } from "../../store/stepper/stepper.slice";
import Box from '@mui/material/Box';






const SecondStep: React.FC = () => {

    const { activeStep, currentStep } = useAppSelector(store => store.stepper);
    const { orderType } = useAppSelector(store => store.firstStep);
    const { isQtyEqual, sewingComment } = useAppSelector(store => store.secondStep);
    const secondStep = useAppSelector(store => store.secondStep);
    const [formValidity, setFormValidity] = useState<boolean>(false);

    const ref = useRef(null)
    const dispatch = useAppDispatch();

    const commentsHandler = (e: any) => {
        dispatch(secondStepActions.setSewingComment(e.target.value));
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (orderType === 'new') {
            const newCurrentStep = activeStep === currentStep ? currentStep + 1 : currentStep;
            dispatch(stepperActions.changeCurrentStep(newCurrentStep))
        } else {
            dispatch(stepperActions.changeCurrentStep(3))
        }
    }

    useEffect(() => {
        const form: HTMLFormElement = ref?.current!;
        setFormValidity(form?.checkValidity());
    }, [secondStep]);


    return (
        <section className={styles.content}>

            <Box component="form"
                onSubmit={submitHandler}
                ref={ref}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >

                <FabricTypeComponent />
                <SizesComponent />
                
                <div className={styles.wrapper}>
                    <PartForPrintComponent />
                </div>
                {/* <SewingOptions textileType={textileType} /> */}
                {/* <FurnitureOptions textileType={textileType} /> */}
                <h3>Комментарии</h3>
                <TextField
                    id="sewingComments"
                    label="Комментарии к пошиву"
                    multiline
                    rows={6}
                    onChange={commentsHandler}
                    value={sewingComment}
                />


                <Button variant="contained" type='submit'
                    sx={{
                        width: '200px',
                        alignSelf: 'center',
                        marginTop: '30px'
                    }}
                    disabled={!isQtyEqual || !formValidity}
                >Далее</Button>
            </Box>


        </section>
    )
}

export default SecondStep;