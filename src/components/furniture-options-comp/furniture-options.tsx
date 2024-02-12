import React from 'react';
import styles from './furniture-options.module.css';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as secondStepActions } from '../../store/second-step/second-step.slice';




const options = [
    {
        name: 'Худи',
        furniture: [
            {
                tagName: 'cord',
                label: 'Шнур',
                type: 'Input'
            }
        ]
    }
]




type TProps = {
    textileType: String
}


const FurnitureOptions: React.FC<TProps> = (props) => {

    const { textileType } = props;
    const filteredOptions = options.filter(item => item.name === textileType);
    const [ textileItem ] = filteredOptions;

    const dispatch = useAppDispatch();
    const { furniture } = useAppSelector(store => store.secondStep);



    const changeHandler = (e: any) => {
        e.target.name != 'cordColor' && dispatch(secondStepActions.setFurniture({name: e.target.name, value: e.target.checked}))
        e.target.name === 'cordColor' && dispatch(secondStepActions.setFurniture({name: e.target.name, value: e.target.value}))
    }

    return (
        <>  {textileItem &&
            <>
            <h3>Опции фурнитуры</h3>
            <div className={styles.box}>
            {textileItem.furniture.map((item, index) => {

                return (
                    <FormGroup key={index}>
                
                        <FormControlLabel
                            control={
                            <Checkbox name={item.tagName} onChange={changeHandler} checked={furniture.isCord}/>
                            }
                            label={item.label}                       
                        />          
                        {furniture.isCord && <TextField id="cordColor" name='cordColor' label="Цвет шнура" variant="outlined" required={true} size='small' onChange={changeHandler} value={furniture?.cordColor} />}
                    

                    </FormGroup>
                )
            })}
                            
            
            </div>
            </>
            }
            <h3>Бирки</h3>
            <div className={styles.box}>
            <FormGroup>
                 
                        <FormControlLabel
                            control={
                            <Checkbox name='basicSizeLabel' checked={furniture.basicSizeLabel} onChange={changeHandler}/>
                            }
                            label='Размерник PNHD'
                            
                        />          
                        <FormControlLabel
                            control={
                            <Checkbox name='basicContainLabel' checked={furniture.basicContainLabel} onChange={changeHandler}/>
                            }
                            label='Составник PNHD'
                            
                        />          

            </FormGroup>
            </div>
        </>
    )
}

export default FurnitureOptions;