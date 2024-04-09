import React, { useEffect, useState, useRef } from "react";
import styles from './fourth-step.module.css';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { actions as firstStepActions } from "../../store/first-step/first-step.slice";
import { actions as secondStepActions } from "../../store/second-step/second-step.slice";
import { actions as thirdStepActions } from "../../store/third-step/third-step.slice";
import { actions as fourthStepActions } from "../../store/fourth-step/fourth-step.slice";
import { actions as stepperActions } from "../../store/stepper/stepper.slice";
import { actions as furnitureActions } from "../../store/furniture-step/furniture-step.slice";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { useCreateOrderMutation } from "../../api/api";
import Pdfrenderer from "../pdf-render/pdf-render";
import { usePDF } from "@react-pdf/renderer";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useUpdateOrderMutation } from "../../api/api";





const FourthStep: React.FC = () => {


    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isVTO, isIndividualPack, isStretch, VTOComments, delivery, deliveryData } = useAppSelector(store => store.fourthStep)
    const store = useAppSelector(store => store);
    const { userToken, user } = useAppSelector(store => store.auth)
    const { orderNumber, orderType } = useAppSelector(store => store.firstStep)

    const currentDeliveryType = delivery.filter(item => item.status === true)[0];
    const [formValidity, setFormValidity] = useState<boolean>(false);
    const ref = useRef(null);

    const [ createOrder, { isSuccess, reset } ] = useCreateOrderMutation();
    const [ updateOrder, { isSuccess: isUpdateSuccessful, reset: updateHookReset}] = useUpdateOrderMutation();

    const [ isReadyToRender, setIsReadyToRender ] = useState(false);
    
    
    const [ instance, updateInstance ] = usePDF();

    useEffect(() => {
        const form: HTMLFormElement = ref?.current!;
        setFormValidity(form?.checkValidity());
    }, [store.fourthStep]);
    
        
    useEffect(() => {
        if (isSuccess && instance.url && isReadyToRender) {
            dispatch(firstStepActions.resetState());
            dispatch(secondStepActions.resetState());
            dispatch(thirdStepActions.resetState());
            dispatch(fourthStepActions.resetState());
            dispatch(furnitureActions.resetState());

            
            setIsReadyToRender(false);
            window.open(instance.url);
            navigate('/profile')
            reset();
        }
    }, [isSuccess, instance, isReadyToRender])

    useEffect(() => {
        if (isUpdateSuccessful && instance.url && isReadyToRender) {
            dispatch(firstStepActions.resetState());
            dispatch(secondStepActions.resetState());
            dispatch(thirdStepActions.resetState());
            dispatch(fourthStepActions.resetState());
            dispatch(stepperActions.resetState());
            dispatch(furnitureActions.resetState());

            
            setIsReadyToRender(false);
            window.open(instance.url);
            navigate('/profile')
            updateHookReset();
        }
    }, [isUpdateSuccessful, instance, isReadyToRender])


    
    const onChangeHandler = (e: any) => {
        const value = e.target.name === 'VTOComments' || e.target.name === 'DeliveryComments' ? e.target.value : e.target.checked;
        dispatch(fourthStepActions.setPackParams({name: e.target.name, value}));
    }

    const radioOnChangeHandler = (e: any) => {
        dispatch(fourthStepActions.setDelivery({name: e.target.name}))
    }

    const submitHandler = (e: any) => {
        e.preventDefault();

        const orderData = {
            firstStep: store.firstStep,
            secondStep: store.secondStep,
            thirdStep: store.thirdStep,
            fourthStep: store.fourthStep,
            furniture: store.furniture
        }
        const data = {
            data: {
                number: orderNumber,
                user: user?.id,
                order: JSON.stringify(orderData),
            }
        };
        //console.log(location.search.substring(4));
        orderType === 'new' && createOrder({ data, userToken })
        orderType === 'edit' && updateOrder({ data, userToken, id: location.search.substring(4) })
        orderType === 'edit' && dispatch(firstStepActions.setOrderType('new'));
        setIsReadyToRender(true);
        const pdfTask = <Pdfrenderer 
            firstStep={store.firstStep}
            secondStep={store.secondStep}
            thirdStep={store.thirdStep}
            fourthStep={store.fourthStep} 
            furnitureStep={store.furniture}
        />
        
        
        
        
        
        updateInstance(pdfTask);
            


    }

    return(
        <section className={styles.content}>
                <Box component="form" 
                    ref={ref}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                    onSubmit={submitHandler}
                >
                    <h3>ВТО и Упаковка</h3>
                    <div className={styles.wrapper}>
                        <div className={styles.column}>
                            <FormGroup>
                                    <FormControlLabel control={<Checkbox name='ВТО' onChange={onChangeHandler} checked={isVTO} />} label='ВТО' value='ВТО'/>
                                    <FormControlLabel control={<Checkbox name='Индивидуальная упаковка' onChange={onChangeHandler} checked={isIndividualPack} />} label='Индивидуальная упаковка' value='Индивидуальная упаковка' />
                                    <FormControlLabel control={<Checkbox name='Стрейч' onChange={onChangeHandler} checked={isStretch} />} label='Стрейч (для межгорода)' value='Стрейч' />
                            </FormGroup>
                        </div>
                            <TextField
                                sx={{width: 'calc((100%/3)*2)'}}
                                name='VTOComments'
                                id="VTOComments"
                                label="Комментарии к упаковке"
                                multiline
                                rows={6}
                                onChange={onChangeHandler}
                                value={VTOComments}
                            />
                        
                    </div>
                    <h3>Доставка</h3>
                    <div className={styles.wrapper}>
                        <div className={styles.column}>
                            <FormControl sx={{width: 'calc(100%/3'}}>
                                <RadioGroup
                                    aria-labelledby="deliveryLabel"
                                    name="deliveryLabel-buttons-group"
                                >
                                    {delivery.map((item, index) => {

                                        return (
                                            <FormControlLabel key={index} value={item.name} control={<Radio  name={item.type}/>} name={item.type} label={item.name} onChange={radioOnChangeHandler} checked={item.status}/>
                                        )
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {currentDeliveryType.type !== 'self' && <TextField
                            sx={{width: 'calc((100%/3)*2)'}}
                            name='DeliveryComments'
                            id="DeliveryComments"
                            label="Комментарии к доставке"
                            multiline
                            rows={6}
                            onChange={onChangeHandler}
                            value={deliveryData}
                            required
                        />}
                    </div>
                    {orderType === 'new' && <Button 
                        variant="contained"
                        type='submit' 
                        sx={{
                            width: '200px',
                            alignSelf: 'center',
                            marginTop: '30px'
                        }}
                        disabled={!formValidity && !instance.url}
                        
                    >Сформировать</Button>}
                    {orderType === 'edit' && <Button 
                        variant="contained"
                        type='submit' 
                        sx={{
                            width: '200px',
                            alignSelf: 'center',
                            marginTop: '30px'
                        }}
                        disabled={!formValidity && !instance.url}
                        
                    >Обновить</Button>}
                </Box>
        </section>
    )
}

export default FourthStep;