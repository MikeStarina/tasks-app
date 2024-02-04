import React, { ChangeEventHandler, SyntheticEvent } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './first-step.module.css';
import { useAppSelector } from "../../store/hooks";
import { useAppDispatch } from "../../store/hooks";
import { actions as firstStepActions } from "../../store/first-step/first-step.slice";
import { actions as stepperActions } from "../../store/stepper/stepper.slice";
import 'dayjs/locale/de';
import dayjs from "dayjs";






const FirstStep: React.FC = () => {

    const { orderNumber, managerName, startDate, dueDate, textileType, textileQty } = useAppSelector(store => store.firstStep);
    const { activeStep, currentStep } = useAppSelector(store => store.stepper);
    const dispatch = useAppDispatch();

    const textInputsChangeHandler = (e: any) => {
        e.target.name === 'orderNumber' && dispatch(firstStepActions.addOrderNumber(e.target.value));
        e.target.name === 'textileQty' && dispatch(firstStepActions.addTextileQty(e.target.value));
        e.target.name === 'managerName' && dispatch(firstStepActions.addManagerName(e.target.value));
        e.target.name === 'textileType' && dispatch(firstStepActions.addTextileType(e.target.value));
    };

    const addStartDate = (newValue: any) => {
        dispatch(firstStepActions.addStartDate(JSON.stringify(newValue)));
    };

    const addDueDate = (newValue: any) => {
        dispatch(firstStepActions.addDueDate(JSON.stringify(newValue)));
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        const newCurrentStep = activeStep === currentStep ? currentStep + 1 : currentStep;
        dispatch(stepperActions.changeCurrentStep(newCurrentStep))
    }


    return (
        <section className={styles.content}>
            
                <Box component="form" onSubmit={submitHandler}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
                >
                    <TextField id="order_number" name='orderNumber' label="Номер заказа" variant="outlined" value={orderNumber} onChange={textInputsChangeHandler} required={true} />
                    <FormControl>
                        <InputLabel id="managerNameLabel" required={true}>Менеджер</InputLabel>
                        <Select labelId="managerNameLabel" id="managerName" name='managerName'label='Менеджер' variant="outlined" value={managerName} onChange={textInputsChangeHandler} required={true}>
                            <MenuItem value='ФИО1'>ФИО1</MenuItem>
                            <MenuItem value='ФИО2'>ФИО2</MenuItem>
                            <MenuItem value='ФИО3'>ФИО3</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <DatePicker name='startDate' label='Дата начала' value={dayjs(JSON.parse(startDate))} onChange={(newValue) => addStartDate(newValue)} views={['year', 'month', 'day']} />                        
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <DatePicker name='dueDate' label='Дата готовности' value={dayjs(JSON.parse(dueDate))} onChange={(newValue) => addDueDate(newValue)} views={['year', 'month', 'day']} />                        
                    </LocalizationProvider>
                    <FormControl>
                        <InputLabel id="textileLabel" required={true}>Вид изделий</InputLabel>
                        <Select labelId="textileLabel" id="textileType" name='textileType'label='Вид изделий' variant="outlined" value={textileType} onChange={textInputsChangeHandler} required={true}>
                            <MenuItem value='Футболка'>Футболка</MenuItem>
                            <MenuItem value='Худи'>Худи</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="textileQty" name='textileQty' label="Количество" variant="outlined" value={textileQty} onChange={textInputsChangeHandler} required={true} />
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

export default FirstStep;