import React from 'react';
import styles from './furniture-options.module.css';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as secondStepActions } from '../../store/second-step/second-step.slice';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';




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
    const { sizeLabel, containLabel } = furniture;



    const changeHandler = (e: any) => {
        e.target.name === 'cordColor' && dispatch(secondStepActions.setFurniture({name: e.target.name, value: e.target.value}))
        e.target.id === 'sizeLabel' && dispatch(secondStepActions.setLabels({id: e.target.id, name: e.target.name }))
        e.target.id === 'containLabel' && dispatch(secondStepActions.setLabels({id: e.target.id, name: e.target.name }))
        e.target.name === 'sizeLabelAssemblingType' && dispatch(secondStepActions.setLabelsAssembling({id: e.target.name, value: e.target.value }))
        e.target.name === 'containLabelAssemblingType' && dispatch(secondStepActions.setLabelsAssembling({id: e.target.name, value: e.target.value }))
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
                        {furniture.isCord && <TextField sx={{marginTop: '20px'}} id="cordColor" name='cordColor' label="Цвет шнура" variant="outlined" required={true} size='small' onChange={changeHandler} value={furniture?.cordColor} />}
                    

                    </FormGroup>
                )
            })}
                            
            
            </div>
            </>
            }
                <div className={styles.box}>
                    <div className={styles.column}>
                        <h4>Бирки /Размерник/:</h4>
                        
                                <FormControl>
                                    <FormLabel id="sizeBadgeLabel">Тип размерника:</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="sizeBadgeLabel"
                                        name="sizeBadge-buttons-group"
                                    >                    
                                        {sizeLabel.map((item, index) => (
                                            <FormControlLabel key={index} id='sizeLabel' value={item.name} control={<Radio id='sizeLabel'/>} name={item.type} label={item.name} onChange={changeHandler} checked={item.status}/>        
                                        ))}
                                    </RadioGroup>
                                </FormControl>                
                            
                                <FormControl sx={{width: '100%', marginTop: '20px'}}>
                                            <InputLabel id="assemblingTypeLabel">Вид притачивания:</InputLabel>
                                            <Select labelId="assemblingTypeLabel" id="sizeLabelAssemblingType" name='sizeLabelAssemblingType'label='Вид притачивания' variant="outlined" required sx={{width: '220px', padding: '5px'}} size='small' value={furniture.sizeLabelAssembling} onChange={changeHandler}>
                                                <MenuItem value='Левый боковой шов'>Левый боковой шов</MenuItem>
                                                <MenuItem value='Правый боковой шов'>Правый боковой шов</MenuItem>
                                                <MenuItem value='Центр горловины'>Центр горловины</MenuItem>
                                            </Select>
                                </FormControl>
                    </div>
           
                    <div className={styles.column}>                    
                            <h4>Бирки /Составник/:</h4>
                            <FormControl>
                                <FormLabel id="containBadgeLabel">Тип составника:</FormLabel>
                                <RadioGroup
                                    aria-labelledby="containBadgeLabel"
                                    name="containBadgeLabel-buttons-group"
                                >                    
                                    {containLabel.map((item, index) => (
                                        <FormControlLabel key={index} id='containLabel' value={item.name} control={<Radio id='containLabel'/>} name={item.type} label={item.name} onChange={changeHandler} checked={item.status}/>        
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{width: '100%', marginTop: '20px'}}>
                                        <InputLabel id="assemblingTypeLabel">Вид притачивания:</InputLabel>
                                        <Select labelId="assemblingTypeLabel" id="containLabelAssemblingType" name='containLabelAssemblingType'label='Вид притачивания' variant="outlined" required sx={{width: '220px', padding: '5px'}} size='small' value={furniture.containLabelAssembling} onChange={changeHandler}>
                                            <MenuItem value='Левый боковой шов'>Левый боковой шов</MenuItem>
                                            <MenuItem value='Правый боковой шов'>Правый боковой шов</MenuItem>
                                            <MenuItem value='Центр горловины'>Центр горловины</MenuItem>
                                        </Select>
                            </FormControl>
                    </div> 
                </div>
            
        </>
    )
}

export default FurnitureOptions;