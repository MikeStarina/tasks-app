import React from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as secondStepActions } from "../../store/second-step/second-step.slice";
import TextField from '@mui/material/TextField';



const FabricTypeComponent: React.FC = () => {

    const { supplier, primaryFabricType, secondaryFabricType } = useAppSelector(store => store.secondStep)

    const dispatch = useAppDispatch();

    const onChangeHandler = (e: any) => {
        //console.log(e.target.name);
        //console.log(e.target.value);
        e.target.name === 'supplier' && dispatch(secondStepActions.setSupplier(e.target.value));
        e.target.name === 'primaryFabric' && dispatch(secondStepActions.setMainFabric(e.target.value));
        e.target.name === 'secondaryFabric' && dispatch(secondStepActions.setSecondaryFabric(e.target.value));
    }



    return(
                    <>
                    <FormControl>
                        <InputLabel id="textileSupplierLabel" required>Поставщик ткани</InputLabel>
                        <Select labelId="textileSupplierLabel" id="supplier" name='supplier'label='Поставщик ткани' variant="outlined" onChange={onChangeHandler} value={supplier} required>
                            <MenuItem value='Медас'>Медас</MenuItem>
                            <MenuItem value='Коттон пром'>Коттон пром</MenuItem>
                        </Select>
                    </FormControl>
                    {/* 
                    <FormControl>
                        <InputLabel id="primaryFabricLabel">Основное полотно</InputLabel>
                        <Select labelId="primaryFabricLabel" id="primaryFabric" name='primaryFabric'label='Основное полотно' variant="outlined" onChange={onChangeHandler} value={primaryFabricType} required>
                            <MenuItem value='Кулирка'>Кулирка</MenuItem>
                            <MenuItem value='Футер'>Футер</MenuItem>
                        </Select>
                    </FormControl>
                    */}
                    <TextField id="primaryFabric" name='primaryFabric' label="Основное полотно" variant="outlined" value={primaryFabricType} onChange={onChangeHandler} required={true} />
                    <FormControl>
                        <InputLabel id="secondaryFabricLabel">Отделочное полотно</InputLabel>
                        <Select labelId="secondaryFabricLabel" id="secondaryFabric" name='secondaryFabric'label='Отделочное полотно' variant="outlined" onChange={onChangeHandler} value={secondaryFabricType} required>
                            <MenuItem value='Рибана'>Рибана</MenuItem>
                            <MenuItem value='Кашкорс'>Кашкорс</MenuItem>
                        </Select>
                    </FormControl>
                    </>
    )
}

export default FabricTypeComponent;