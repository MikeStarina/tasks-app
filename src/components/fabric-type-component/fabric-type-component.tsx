import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as secondStepActions } from "../../store/second-step/second-step.slice";
import TextField from "@mui/material/TextField";
import { useGetSuppliersQuery } from "../../api/api";



const FabricTypeComponent: React.FC = () => {
    const { supplier, primaryFabricType, secondaryFabricType } = useAppSelector(
        (store) => store.secondStep
    );
    const { userToken } = useAppSelector(store => store.auth);
    const { data: suppliersData } = useGetSuppliersQuery(userToken);

    const dispatch = useAppDispatch();

    const onChangeHandler = (e: any) => {

        e.target.name === "supplier" &&
            dispatch(secondStepActions.setSupplier(e.target.value));
        e.target.name === "primaryFabric" &&
            dispatch(secondStepActions.setMainFabric(e.target.value));
        e.target.name === "secondaryFabric" &&
            dispatch(secondStepActions.setSecondaryFabric(e.target.value));
    };

    return (
        <>
            {suppliersData && <TextField
                select
                name="supplier"
                label='Поставщик ткани'
                placeholder='Выберите поставщика ткани'
                onChange={onChangeHandler}
                value={supplier}
            >
                {suppliersData.data.map((item => (
                    <MenuItem value={item.attributes.name} key={item.id}>{item.attributes.name}</MenuItem>
                )))}
            </TextField>
            }
            <TextField
                id="primaryFabric"
                name="primaryFabric"
                label="Основное полотно"
                variant="outlined"
                value={primaryFabricType}
                onChange={onChangeHandler}
                required={true}
                placeholder='Введите название и параметры полотна'
            />
            <FormControl>
                <InputLabel id="secondaryFabricLabel">Отделочное полотно</InputLabel>
                <Select
                    labelId="secondaryFabricLabel"
                    id="secondaryFabric"
                    name="secondaryFabric"
                    label="Отделочное полотно"
                    variant="outlined"
                    onChange={onChangeHandler}
                    value={secondaryFabricType}
                    required
                >
                    <MenuItem value="Рибана">Рибана</MenuItem>
                    <MenuItem value="Кашкорс">Кашкорс</MenuItem>
                    <MenuItem value="Кашкорс">Основное полотно</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};

export default FabricTypeComponent;
