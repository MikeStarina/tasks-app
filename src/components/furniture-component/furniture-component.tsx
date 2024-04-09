import React from "react";
import styles from "./furniture-component.module.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { actions as furnitureActions } from "../../store/furniture-step/furniture-step.slice";
import { usePreviewUploadMutation } from "../../api/api";
import { API_BASE_URL } from "../../utils/constants";

type TFurnitureCompProps = {
    type: string;
    id: string;
};

const FurnitureComponent: React.FC<TFurnitureCompProps> = ({ type, id }) => {

    const dispatch = useAppDispatch();
    const [ uploadPreview, { data: previewUploadData }] = usePreviewUploadMutation();
    //console.log(previewUploadData);
    const { furniture } = useAppSelector(store => store.furniture);
    const { userToken } = useAppSelector(store => store.auth);
    //const { sizeLabel } = furniture;

    
    

    if (previewUploadData) {
            console.log(previewUploadData);
            dispatch(furnitureActions.setLabelPreview({value: previewUploadData[0].url, id}))
            //reset();
    }

    const currentLabelArr = id === 'sizeLabel' ? furniture.sizeLabel
    : id === 'containLabel' ? furniture.containLabel : [];
    const assemblingType = id === 'sizeLabel' ? furniture.sizeLabelAssembling
    : id === 'containLabel' ? furniture.containLabelAssembling : '';
    
    const isBasicLabel = currentLabelArr && currentLabelArr.find(item => item.type.includes('basic'));
    console.log(furniture);
    console.log(currentLabelArr);
    const fileUpload = async (e: any) => {
        try {
            const file = await e.target.files[0];
            const data = new FormData();
            //const fileURL = URL.createObjectURL(file);
            data.append("files", file);
            data.append("filetype", e.target.name);
            uploadPreview({ userToken, file: data });
           
        } catch (err) {
            console.log(err);
        }
    };

    const changeHandler = (e: any) => {

        e.target.id === 'isCord' && dispatch(furnitureActions.setIsCord());
        e.target.name === 'cordColor' && dispatch(furnitureActions.setFurniture({name: e.target.name, value: e.target.value}))
        e.target.id === 'sizeLabel' && dispatch(furnitureActions.setLabels({id: e.target.id, name: e.target.name }))
        e.target.name === 'sizeLabelAssemblingType' && dispatch(furnitureActions.setLabelsAssembling({id: e.target.name, value: e.target.value }))
        e.target.id === 'containLabel' && dispatch(furnitureActions.setLabels({id: e.target.id, name: e.target.name }))
        e.target.name === 'containLabelAssemblingType' && dispatch(furnitureActions.setLabelsAssembling({id: e.target.name, value: e.target.value }))
       
    }

    return (
        <>
        {currentLabelArr &&
        <div className={styles.furniture}>
            <h4 className={styles.furniture_title}>{type}</h4>
            <div className={styles.furniture_table}>
                <div className={styles.furniture_previewColumn}>
                    <h5>Превью:</h5>
                    <div className={styles.img_wrapper}>
                        {currentLabelArr[1].status && (
                                <img
                                    src={`${API_BASE_URL}${currentLabelArr[1].preview}`}
                                    className={styles.preview}
                                ></img>
                        )}
                    </div>
                    <Button
                        disabled={isBasicLabel ? isBasicLabel.status : false}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        sx={{ alignSelf: "center" }}
                    >
                        Загрузить
                        <VisuallyHiddenInput
                            type="file"
                            onChange={fileUpload}
                            name={`${id}preview`}
                            required={isBasicLabel ? !isBasicLabel.status : true}
                        />
                    </Button>
                </div>

                <div className={styles.furniture_paramsColumn}>
                    <FormControl>
                        <FormLabel>Тип {type}а:</FormLabel>
                        <RadioGroup
                            aria-labelledby="sizeBadgeLabel"
                            name="sizeBadge-buttons-group"
                        >
                            {currentLabelArr.map((item, index) => (
                                <FormControlLabel
                                    key={index}
                                    id={id}
                                    value={item.name}
                                    control={<Radio id={id} />}
                                    name={item.type}
                                    label={item.name}
                                    onChange={changeHandler}
                                    checked={item.status}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    

                    <TextField
                        name={`${id}AssemblingType`}
                        label="Тип притачивания/комментарий"
                        required
                        multiline
                        fullWidth
                        rows={6}
                        onChange={changeHandler}
                        value={assemblingType}
                    />

                </div>
            </div>
        </div>}</>
    );
};

export default FurnitureComponent;

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});
