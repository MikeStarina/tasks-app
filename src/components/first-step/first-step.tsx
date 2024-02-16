import React, { useEffect, useState, useRef } from "react";
import { validityChecker } from "../../utils/constants";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
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

const FirstStep: React.FC = () => {
    const {
        orderNumber,
        managerName,
        startDate,
        dueDate,
        textileType,
        textileQty,
        passport,
    } = useAppSelector((store) => store.firstStep);
    const store = useAppSelector((store) => store.firstStep);
    const { activeStep, currentStep } = useAppSelector((store) => store.stepper);
    const dispatch = useAppDispatch();
    const [formValidity, setFormValidity] = useState<boolean>(false);
    const [validity, setValidity] = useState<{ [n: string]: boolean }>({});
    const ref = useRef(null);
    useEffect(() => {
        const form: HTMLFormElement = ref?.current!;
        setFormValidity(form?.checkValidity());
    }, [store]);

    const textInputsChangeHandler = (e: any) => {
        validityChecker(e, validity, setValidity);
        e.target.name === "orderNumber" &&
            dispatch(firstStepActions.addOrderNumber(e.target.value));
        e.target.name === "textileQty" &&
            dispatch(firstStepActions.addTextileQty(e.target.value));
        e.target.name === "managerName" &&
            dispatch(firstStepActions.addManagerName(e.target.value));
        e.target.name === "textileType" &&
            dispatch(firstStepActions.addTextileType(e.target.value));
        e.target.name === "modelPassport" &&
            dispatch(firstStepActions.addPassport(e.target.value));
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

        const newCurrentStep =
            activeStep === currentStep ? currentStep + 1 : currentStep;
        dispatch(stepperActions.changeCurrentStep(newCurrentStep));
        dispatch(secondStepActions.setSewingOptions(textileType));
    };

    return (
        <section className={styles.content}>
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
                    error={
                        validity.orderNumber !== undefined ? !validity.orderNumber : false
                    }
                    id="orderNumber"
                    name="orderNumber"
                    label="Номер заказа"
                    variant="outlined"
                    value={orderNumber}
                    onChange={textInputsChangeHandler}
                    required={true}
                    inputProps={{ pattern: "[0-9]{5,5}" }}
                    onFocus={(e) => validityChecker(e, validity, setValidity)}
                />
                <TextField
                    error={
                        validity.managerName !== undefined ? !validity.managerName : false
                    }
                    id="managerName"
                    name="managerName"
                    label="Менеджер"
                    variant="outlined"
                    value={managerName}
                    onChange={textInputsChangeHandler}
                    required={true}
                    inputProps={{ minLength: "3" }}
                    onFocus={(e) => validityChecker(e, validity, setValidity)}
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
                    <InputLabel
                        id="textileLabel"
                        required={true}
                        error={
                            validity.textileType !== undefined ? !validity.textileType : false
                        }
                    >
                        Вид изделий
                    </InputLabel>
                    {/*Сделать валидацию для этой параши ниже*/}
                    <Select
                        error={
                            validity.textileType !== undefined ? !validity.textileType : false
                        }
                        labelId="textileLabel"
                        id="textileType"
                        name="textileType"
                        label="Вид изделий"
                        variant="outlined"
                        value={textileType}
                        required={true}
                        onChange={textInputsChangeHandler}
                    >
                        <MenuItem value="Футболка">Футболка</MenuItem>
                        <MenuItem value="Худи">Худи</MenuItem>
                        <MenuItem value="Свитшот">Свитшот</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    error={
                        validity.modelPassport !== undefined
                            ? !validity.modelPassport
                            : false
                    }
                    id="modelPassport"
                    name="modelPassport"
                    label="Паспорт модели"
                    variant="outlined"
                    value={passport}
                    onChange={textInputsChangeHandler}
                    required={true}
                    inputProps={{ minLength: "1" }}
                    onFocus={(e) => validityChecker(e, validity, setValidity)}
                />
                <TextField
                    error={
                        validity.textileQty !== undefined ? !validity.textileQty : false
                    }
                    id="textileQty"
                    name="textileQty"
                    label="Количество"
                    variant="outlined"
                    value={textileQty}
                    onChange={textInputsChangeHandler}
                    required={true}
                    inputProps={{ pattern: "[0-9]{1,9999}", minLength: "1" }}
                    onFocus={(e) => validityChecker(e, validity, setValidity)}
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
        </section>
    );
};

export default FirstStep;
