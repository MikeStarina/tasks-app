import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from "./first-step.module.css";
import { useAppSelector } from "../../store/hooks";
import { useAppDispatch } from "../../store/hooks";
import { actions as firstStepActions } from "../../store/first-step/first-step.slice";
import { actions as stepperActions } from "../../store/stepper/stepper.slice";
import { actions as secondStepActions } from "../../store/second-step/second-step.slice";
import "dayjs/locale/de";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { useGetPassportsQuery } from "../../api/api";
import { useGetModelTypesQuery } from '../../api/api';

const FirstStep: React.FC = () => {
    const {
        orderNumber,
        managerName,
        startDate,
        dueDate,
        textileType,
        textileQty,
        passport,
        orderType
    } = useAppSelector((store) => store.firstStep);
    const store = useAppSelector(store => store);
    const { activeStep, currentStep } = useAppSelector((store) => store.stepper);
    const { userToken, user } = useAppSelector(store => store.auth);
    const dispatch = useAppDispatch();
    dispatch(firstStepActions.addManagerName(`${user?.firstName} ${user?.lastName}`))
    const [formValidity, setFormValidity] = useState<boolean>(false);
    const ref = useRef(null);
    const { data: modelPassports } = useGetPassportsQuery(userToken);
    const { data: modelTypes } = useGetModelTypesQuery(userToken);

    



    useEffect(() => {
        const form: HTMLFormElement = ref?.current!;
        setFormValidity(form?.checkValidity());
    }, [store.firstStep]); 

    const textInputsChangeHandler = (e: any) => {

        
        e.target.name === "orderNumber" &&
            dispatch(firstStepActions.addOrderNumber(e.target.value));
        e.target.name === "textileQty" &&
            dispatch(firstStepActions.addTextileQty(e.target.value));
        e.target.name === "managerName" &&
            dispatch(firstStepActions.addManagerName(e.target.value));
        e.target.name === "textileType" &&
            dispatch(firstStepActions.addTextileType(e.target.value));

            if (e.target.name === "modelPassport") {
                
                dispatch(firstStepActions.addPassport(e.target.value));
                const validPassport = modelPassports?.data.find(item => item.attributes.name === e.target.value);
                dispatch(firstStepActions.setValidPassport(validPassport!));
                dispatch(secondStepActions.setInitialSizes(validPassport?.attributes.sizes.data));
            }
            
    };

    const addStartDate = (newValue: any) => {
        dispatch(firstStepActions.addStartDate(JSON.stringify(newValue)));
        dispatch(
            firstStepActions.addDueDate(
                JSON.stringify(dayjs(newValue).locale("de").add(30, "day"))
            )
        );
    };

    const addDueDate = (newValue: any) => {
        dispatch(firstStepActions.addDueDate(JSON.stringify(newValue)));
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        dispatch(secondStepActions.setSewingOptions(textileType));
        if (orderType === 'new') {
            const newCurrentStep =
                activeStep === currentStep ? currentStep + 1 : currentStep;
            dispatch(stepperActions.changeCurrentStep(newCurrentStep));
            
        } else {
            dispatch(stepperActions.changeCurrentStep(2));
        }
    };

    return (
        <>
        {modelPassports && modelTypes && <section className={styles.content}>
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
                <TextField
                    id="orderNumber"
                    name="orderNumber"
                    label="Номер заказа"
                    variant="outlined"
                    value={orderNumber}
                    onChange={textInputsChangeHandler}
                    required={true}
                    inputProps={{ pattern: "[0-9]{5,5}" }}
                    placeholder='Введите пятизначный номер заказа'
                />
                <TextField
                    id="managerName"
                    name="managerName"
                    label="Менеджер"
                    variant="outlined"
                    value={managerName}
                    onChange={textInputsChangeHandler}
                    required={true}
                    inputProps={{ minLength: "5" }}
                    placeholder='Введите ФИО менеджера заказа'
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DatePicker
                        name="startDate"
                        label="Дата начала"
                        value={dayjs(JSON.parse(startDate))}
                        onChange={(newValue) => addStartDate(newValue)}
                        views={["year", "month", "day"]}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DatePicker
                        name="dueDate"
                        label="Дата готовности"
                        value={dayjs(JSON.parse(dueDate))}
                        onChange={(newValue) => addDueDate(newValue)}
                        views={["year", "month", "day"]}
                    />
                </LocalizationProvider>
                <FormControl>
                    <TextField
                        select
                        id="textileType"
                        name="textileType"
                        label="Вид изделий"
                        variant="outlined"
                        value={textileType}
                        required={true}
                        onChange={textInputsChangeHandler} 
                        placeholder='Выберите тип изделий'       
                    >
                        {modelTypes.data.map((item, index) => (
                            <MenuItem value={item.attributes.type} key={index}>{item.attributes.type}</MenuItem>
                        ))}                        
                    </TextField>
                </FormControl>
                <FormControl>
                    <TextField
                        select
                        id="modelPassport"
                        name="modelPassport"
                        label="Паспорт модели"
                        variant="outlined"
                        value={passport}
                        onChange={textInputsChangeHandler}
                        required={true}
                        inputProps={{ minLength: "1" }}
                        placeholder='Введите паспорт модели'
                    >
                        {modelPassports.data.map((item, index) => {
                                if (textileType && item.attributes.model_type.data.attributes.type === textileType) {
                                    return (
                                        <MenuItem value={item.attributes.name} key={index}>{item.attributes.name}</MenuItem>
                                    )    
                                }         
                            
                        })}                        
                    </TextField>
                </FormControl>
                <TextField
                    id="textileQty"
                    name="textileQty"
                    label="Количество"
                    variant="outlined"
                    value={textileQty}
                    onChange={textInputsChangeHandler}
                    required={true}
                    inputProps={{ pattern: "[0-9]{1,9999}", minLength: "1" }}
                    placeholder='Введите количество изделий (только цифры)'
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={!formValidity}
                    sx={{
                        width: "200px",
                        alignSelf: "center",
                        marginTop: "30px",
                    }}
                >
                    Далее
                </Button>
            </Box>
        </section>}
        </>
    );
};

export default FirstStep;
