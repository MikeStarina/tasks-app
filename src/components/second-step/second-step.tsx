import React from "react";
import styles from './second-step.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';




const SecondStep: React.FC = () => {

    return (
        <section className={styles.content}>
            <Box component="form"
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
                >
                    <FormControl>
                        <InputLabel id="textileSupplierLabel">Поставщик ткани</InputLabel>
                        <Select labelId="textileSupplierLabel" id="textileSupplier" name='textileSupplier'label='Поставщик ткани' variant="outlined">
                            <MenuItem value='Медас'>Медас</MenuItem>
                            <MenuItem value='Коттон пром'>Коттон пром</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="primaryFabricLabel">Основное полотно</InputLabel>
                        <Select labelId="primaryFabricLabel" id="primaryFabric" name='primaryFabric'label='Основное полотно' variant="outlined">
                            <MenuItem value='Кулирка'>Кулирка</MenuItem>
                            <MenuItem value='Футер'>Футер</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="secondaryFabricLabel">Отделочное полотно</InputLabel>
                        <Select labelId="secondaryFabricLabel" id="secondaryFabric" name='secondaryFabric'label='Отделочное полотно' variant="outlined">
                            <MenuItem value='Рибана'>Рибана</MenuItem>
                            <MenuItem value='Кашкорс'>Кашкорс</MenuItem>
                        </Select>
                    </FormControl>
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

export default SecondStep;