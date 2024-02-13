import React, { useEffect, useState } from 'react';
import styles from './print-sizes-component.module.css';
import TextField from '@mui/material/TextField';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { actions as thirdStepActions } from '../../store/third-step/third-step.slice';
import { IPrint } from '../../utils/types';


type TProps = {
    currentPrint: IPrint,
    index: number,
}


const PrintSizesComponent: React.FC<TProps> = ({ currentPrint, index }) => {

    const [ realQty, setRealQty ] = useState<number>(0);
    const { sizes } = currentPrint;
    const { fabricColor } = useAppSelector(store => store.secondStep);
    const { textileQty } = useAppSelector(store => store.firstStep);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const sum = sizes?.reduce((acc, { qty }) => qty === '0' || qty === '' ? acc : acc + parseInt(qty), 0)        
        setRealQty(sum!); 
    }, [sizes])

    


    const onChangeHandler = (e: any) => {
        dispatch(thirdStepActions.setPrintSizes({value: e.target.value, size: e.target.name, index}))
    }


    return (
        <div className={styles.table}>
            <div className={styles.table_row}>
                <div className={styles.main_header_block}> ЦВЕТ / РАЗМЕР</div>
                {currentPrint.sizes.map(({ size }, index) => {

                    return (
                        <div key={index} className={styles.size_block}>
                            {size}
                        </div>    
                    )
                })}
                <div className={styles.size_block}>Итого:</div>
            </div>
            
            <div className={styles.table_row}>
                <div className={styles.main_header_block}>
                    {fabricColor}
                </div>
                {currentPrint.sizes.map(({ size, qty }, index) => {

                    return (
                        <div className={styles.size_block} key={index}>
                            <TextField variant='standard' id={size} name={size} value={qty} onChange={onChangeHandler} required/>
                        </div>
                    )
                })}
                <div className={styles.size_block}>{realQty}/{textileQty}</div>
            </div>
        </div>
    )
}

export default PrintSizesComponent;