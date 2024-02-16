import React, { useEffect, useState } from 'react';
import styles from './sizes-component.module.css';
import TextField from '@mui/material/TextField';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { actions as secondStepActions } from '../../store/second-step/second-step.slice';





const SizesComponent: React.FC = () => {

    const [ realQty, setRealQty ] = useState<number>(0);

    const { sizes, fabricColor, isQtyEqual } = useAppSelector(store => store.secondStep);
    const { textileQty } = useAppSelector(store => store.firstStep);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const totalQty = parseInt(textileQty);
        const sum = sizes?.reduce((acc, { qty }) => qty === '0' || qty === '' ? acc : acc + parseInt(qty), 0)        
        setRealQty(sum!); 
        dispatch(secondStepActions.setQtyEquality(sum === totalQty))
    }, [sizes])


    const onChangeHandler = (e: any) => {

        if (e.target.name === 'fabricColor') dispatch(secondStepActions.setFabricColor(e.target.value));
        else dispatch(secondStepActions.setSizes({ size: e.target.name, qty: e.target.value}));
    }


    return (
        <div className={styles.table}>
            <div className={styles.table_row}>
                <div className={styles.main_header_block}> ЦВЕТ / РАЗМЕР</div>
                {sizes?.map(({ size }, index) => {

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
                    <TextField variant='standard' name='fabricColor' value={fabricColor} onChange={onChangeHandler} required/>
                </div>
                {sizes?.map(({ size, qty }, index) => {

                    return (
                        <div className={styles.size_block} key={index}>
                            <TextField variant='standard' id={size} name={size} value={qty} onChange={onChangeHandler} required inputProps={{ pattern: "[0-9]{1,9999}" }}/>
                        </div>
                    )
                })}
                <div className={isQtyEqual ? styles.size_block : styles.size_block_invalid}>{realQty}/{textileQty}</div>
            </div>
        </div>
    )
}

export default SizesComponent;