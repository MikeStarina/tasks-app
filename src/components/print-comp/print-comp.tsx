import React, { useState } from 'react'
import styles from './print-comp.module.css';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as thirdStepActions } from '../../store/third-step/third-step.slice';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import PrintSizesComponent from '../print-sizes-component copy/print-sizes-component';




const printMethods = ['Шелкография', 'DTF', 'DTG', 'Термоперенос', 'Вышивка'];



const PrintComp: React.FC<{ index: number}> = ({ index }) => {

    const { prints } = useAppSelector(store => store.thirdStep);
    const dispatch = useAppDispatch();

    const printNumber = index + 1;
    const currentPrint = prints![index];
    //console.log(currentPrint);

    const onChangeHandler = (e: any) => {
        dispatch(thirdStepActions.setPrintMethod({ method: e.target.value, index }));
    }

    const fileUpload = (e: any) => {
       
       
        dispatch(thirdStepActions.setImages({name: e.target.name, fileLink: URL.createObjectURL(e.target.files[0]), index}))
    }

    const basicInfoChangeHandler = (e: any) => {
        dispatch(thirdStepActions.setBasicPrintInfo({name: e.target.name, value: e.target.value, index}))
    }

    return(
        <div className={styles.step}>
        <h3>ПРИНТ #{printNumber}</h3>
        <FormControl sx={{width: '100%'}}>
            <InputLabel id="printMethodLabel" required={true}>Метод печати</InputLabel>
                <Select labelId="printMethodLabel" id="printMethod" name='printMethod'label='Метод печати' variant="outlined" value={currentPrint.method} onChange={onChangeHandler} required={true} sx={{width: '100%'}}>
                    {printMethods.map((item, index) => (
                        <MenuItem value={item} key={index}>{item}</MenuItem>
                    ))}
                </Select>
        </FormControl>
        {currentPrint.method && 
            <div className={styles.params_box}>
                <div className={styles.params_column}>
                    <TextField id='printWidth' name='printWidth' label="Ширина принта" variant="outlined" required={true} value={currentPrint.printWidth} onChange={basicInfoChangeHandler} sx={{width: '100%'}}/>
                    <TextField id='printHeight' name='printHeight' label="Высота принта" variant="outlined" required={true} value={currentPrint.printHeight} onChange={basicInfoChangeHandler} sx={{width: '100%'}}/>
                </div>
                <div className={styles.params_column}>                    
                    <TextField id='printPosition' name='printPosition' label="Расположение" variant="outlined" required={true} value={currentPrint.position} onChange={basicInfoChangeHandler} sx={{width: '100%'}}/>
                    <TextField id='printMargins' name='printMargins' label="Отступы" variant="outlined" required={true} value={currentPrint.printMargins} onChange={basicInfoChangeHandler} sx={{width: '100%'}}/>
                    
                </div>
            </div>
        }
        {currentPrint.method === 'Шелкография' && <SSParams currentPrint={currentPrint} index={index} />}
        {currentPrint.method === 'Вышивка' && <EmbParams currentPrint={currentPrint} index={index} />}
        {currentPrint.method === 'Термотрансфер' && <HTParams currentPrint={currentPrint} index={index} />}
        {currentPrint.method && <div className={styles.params_box}>
                <div className={styles.params_column}>
                    <h4>Превью принта</h4>
                    <div className={styles.img_wrapper}>
                        {currentPrint.printPreview && <img src={currentPrint.printPreview} className={styles.preview}></img>}
                    </div>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        sx={{alignSelf: 'center'}}
                        >
                        Загрузить
                        <VisuallyHiddenInput type="file" onChange={fileUpload} name='printPreview'/>
                    </Button>
                </div>
                <div className={styles.params_column}>
                    <h4>Мокап</h4>
                    <div className={styles.img_wrapper}>
                        {currentPrint.mockup && <img src={currentPrint.mockup} className={styles.preview}></img>}
                    </div>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        sx={{alignSelf: 'center'}}
                        >
                        Загрузить
                        <VisuallyHiddenInput type="file" onChange={fileUpload} name='mockup'/>
                    </Button>
                </div>
            </div>}
            {currentPrint.method && <PrintSizesComponent currentPrint={currentPrint} index={index} />}
            </div>
    )
}

export default PrintComp;


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


const SSParams: React.FC<any> = ({currentPrint, index}) => {

    const dispatch = useAppDispatch();
    
    //console.log(state)
    const onChangeHandler = (e: any) => {
        dispatch(thirdStepActions.setSSParams({value: e.target.checked ? e.target.checked : e.target.value, index, name: e.target.name }))
    }



        return (
            <>            
            <div className={styles.params_box}>
                <div className={styles.params_column}>
                    <TextField id='pantoneColors' name='pantoneColors' label="Цвета PANTONE" variant="outlined" required={true} value={currentPrint.pantoneColors} onChange={onChangeHandler} sx={{width: '100%'}}/>
                    <TextField id='specialEffects' name='specialEffects' label="Спецэффекты" variant="outlined" required={true} value={currentPrint.pantoneColors} onChange={onChangeHandler} sx={{width: '100%'}}/>
                </div>
                <div className={styles.params_column}>
                    <FormGroup>            
                            <FormControlLabel
                                control={
                                <Checkbox name='isCMYK' onChange={onChangeHandler} />
                                }
                                label='Полноцвет'    
                                checked={currentPrint.isCMYK}                      
                            />               
                            <FormControlLabel
                                control={
                                <Checkbox name='isAntimigration' onChange={onChangeHandler} />
                                }
                                label='Антимиграция'    
                                checked={currentPrint.isAntimigration}                      
                            />               
                            <FormControlLabel
                                control={
                                <Checkbox name='isStretch' onChange={onChangeHandler} />
                                }
                                label='Стрейч'    
                                checked={currentPrint.isStretch}                      
                            />               
                    </FormGroup>
                </div>
            </div>
            
            </>

        )
    
}



const EmbParams: React.FC<any> = ({currentPrint, index}) => {
    const dispatch = useAppDispatch();
    const onChangeHandler = (e: any) => {
        dispatch(thirdStepActions.setEmbParams({value: e.target.value, index}))
    }

    return (
        <>
            <div className={styles.params_box}>
                <div className={styles.params_column}>
                    <TextField id='threadsColors' name='threadsColors' label="Цвета ниток" variant="outlined" required={true} value={currentPrint.threadsColors} onChange={onChangeHandler} sx={{width: '100%'}}/>
                </div>
            </div>
        </>
    )
}
const HTParams: React.FC<any> = ({currentPrint, index}) => {
    const dispatch = useAppDispatch();
    const onChangeHandler = (e: any) => {
        dispatch(thirdStepActions.setHTParams({value: e.target.value, index}))
    }

    return (
        <>
            <div className={styles.params_box}>
                <div className={styles.params_column}>
                    <TextField id='specialEffects' name='specialEffects' label="Спецэффекты" variant="outlined" required={true} value={currentPrint.specialEffects} onChange={onChangeHandler} sx={{width: '100%'}}/>
                </div>
            </div>
        </>
    )
}

/**
 * const onChange = (e) => {
    e.preventDefault();

    const data = new FormData();
    const print = photoProcessing(e.target.files[0]);
    if (print === undefined) {
      dispatch(openPopup(['Не тот формат файла']));
    } else {
      data.append('files', print, `${uuidv4()}_${print.name}`);

       printUploadFunc - так-же вызывает ф-цию setCoords
      - которая задает позицию появления привью изображения 
      dispatch(printUploadFunc(data, activeView, item.type, item.color));
    }
    e.currentTarget.reset();
  };
 */