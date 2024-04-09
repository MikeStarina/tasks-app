import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from './furniture-step.module.css'
import { Box, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { actions as stepperActions } from "../../store/stepper/stepper.slice";
import FurnitureOptions from "../furniture-options-comp/furniture-options";
import FurnitureComponent from "../furniture-component/furniture-component";
import AdditionalFurniture from "../additional-furniture/additional-furniture";
import { actions as furnitureActions } from "../../store/furniture-step/furniture-step.slice";


const FurnitureStep: React.FC = () => {
    //@ts-ignore
    const [formValidity, setFormValidity] = useState<boolean>(false);
    const ref = useRef(null);
    const dispatch = useAppDispatch();
    const { orderType, textileType } = useAppSelector(store => store.firstStep);
    const { activeStep, currentStep } = useAppSelector(store => store.stepper);
    const furnitureState = useAppSelector(store => store.furniture);
    const { additionalFurnitureQuantity, additionalFurniture } = useAppSelector(store => store.furniture);

    useEffect(() => {
        const form: HTMLFormElement = ref?.current!;
        form && setFormValidity(form.checkValidity())
    }, [furnitureState])

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (orderType === 'new') {
            const newCurrentStep =
                activeStep === currentStep ? currentStep + 1 : currentStep;
            dispatch(stepperActions.changeCurrentStep(newCurrentStep));
            
        } else {
            dispatch(stepperActions.changeCurrentStep(4));
        }
    };

    return (
        <section className={styles.furniture}>
            <Box
                component="form"
                onSubmit={submitHandler}
                noValidate
                ref={ref}
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >   

                <FurnitureOptions textileType={textileType} />
                <FurnitureComponent type='Размерник' id='sizeLabel' />
                <FurnitureComponent type='Составник' id='containLabel'/>

                <TextField
                    sx={{ marginTop: '100px'}}
                    label='Введите количество дополнительной фурнитуры' 
                    value={additionalFurnitureQuantity}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {dispatch(furnitureActions.setAdditionalFurnitureQuantity(e.target.value))}}
                />

                {additionalFurniture && additionalFurniture.length > 0 &&
                    additionalFurniture.map((item, index) => (
                        <AdditionalFurniture type={`Дополнительная фурнитура #${index + 1}`} id='additionalFurniture' index={index} key={item.id}/>
                    ))
                }
                
                <Button
                    variant="contained"
                    type="submit"
                    //disabled={!formValidity}
                    sx={{
                        width: "200px",
                        alignSelf: "center",
                        marginTop: "30px",
                    }}
                >
                    Далее
                </Button>
            </Box>
            </section>
    )
}

export default FurnitureStep;