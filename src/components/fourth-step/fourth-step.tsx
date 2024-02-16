import React from "react";
import styles from './fourth-step.module.css';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { actions as fourthStepActions } from "../../store/fourth-step/fourth-step.slice";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';







const FourthStep: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isVTO, isIndividualPack, isStretch, VTOComments, delivery, deliveryData } = useAppSelector(store => store.fourthStep)
    const currentDeliveryType = delivery.filter(item => item.status === true)[0];
    const navigate = useNavigate();
    const onChangeHandler = (e: any) => {
        const value = e.target.name === 'VTOComments' || 'DeliveryComments' ? e.target.value : e.target.checked;
        dispatch(fourthStepActions.setPackParams({name: e.target.name, value}));
    }

    const radioOnChangeHandler = (e: any) => {
        dispatch(fourthStepActions.setDelivery({name: e.target.name}))
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        navigate('/render')
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
                    <h3>ВТО и Упаковка</h3>
                    <div className={styles.wrapper}>
                        <div className={styles.column}>
                            <FormGroup>
                                    <FormControlLabel control={<Checkbox name='ВТО' />} label='ВТО' value='ВТО' onChange={onChangeHandler} checked={isVTO}/>
                                    <FormControlLabel control={<Checkbox name='Индивидуальная упаковка' />} label='Индивидуальная упаковка' value='Индивидуальная упаковка' onChange={onChangeHandler} checked={isIndividualPack}/>
                                    <FormControlLabel control={<Checkbox name='Стрейч' />} label='Стрейч (для межгорода)' value='Стрейч' onChange={onChangeHandler} checked={isStretch}/>
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
                    <Button 
                        variant="contained"
                        type='submit' 
                        sx={{
                            width: '200px',
                            alignSelf: 'center',
                            marginTop: '30px'
                        }}
                        
                    >Сформировать</Button>
                </Box>
        </section>
    )
}

export default FourthStep;