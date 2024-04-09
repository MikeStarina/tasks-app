import React from "react";
import styles from "./additional-furniture.module.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { actions as furnitureActions } from "../../store/furniture-step/furniture-step.slice";
import { usePreviewUploadMutation } from "../../api/api";
import { API_BASE_URL } from "../../utils/constants";

type TFurnitureCompProps = {
    type: string;
    id: string;
    index: number;
};

const AdditionalFurniture: React.FC<TFurnitureCompProps> = ({ type, id, index }) => {
    
    const dispatch = useAppDispatch();
    const [ uploadPreview, { data: previewUploadData, reset }] = usePreviewUploadMutation();
    //console.log(previewUploadData);
    const { additionalFurniture } = useAppSelector(store => store.furniture);
    const { userToken } = useAppSelector(store => store.auth);
    //const { sizeLabel } = furniture;

   

    if (previewUploadData) {
            dispatch(furnitureActions.updateAdditionalFurnitureArray({index, value: previewUploadData[0].url, type: 'preview'}))
            reset();
    }

   const currentFurniture = additionalFurniture && additionalFurniture[index];


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
        e.target.id === 'additionalFurniture' && dispatch(furnitureActions.updateAdditionalFurnitureArray({index, value: e.target.value, type: 'furnitureName' }))
        e.target.name === 'additionalFurnitureAssemblingType' && dispatch(furnitureActions.updateAdditionalFurnitureArray({index, value: e.target.value, type: 'furnitureAssembling'  }))
    }

    const deleteClickHandler = () => {
        dispatch(furnitureActions.deleteAdditionalFurniture({ index }))
    }

    return (
        <>
        {currentFurniture && <div className={styles.furniture}>
            <h4 className={styles.furniture_title}>{type}</h4>
            <div className={styles.furniture_table}>
                <div className={styles.furniture_previewColumn}>
                    <h5>Превью:</h5>
                    <div className={styles.img_wrapper}>
                        {currentFurniture.preview && (
                                <img
                                    src={`${API_BASE_URL}${currentFurniture.preview}`}
                                    className={styles.preview}
                                ></img>
                        )}
                    </div>
                    <Button
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
                            required={true}
                        />
                    </Button>
                </div>

                <div className={styles.furniture_paramsColumn}>
                   
                        <TextField
                            label='Название'
                            fullWidth
                            id={id}
                            onChange={changeHandler}
                            value={currentFurniture.name}
                        />
                             


                    <TextField
                        name={`${id}AssemblingType`}
                        label="Тип притачивания/комментарий"
                        required
                        multiline
                        fullWidth
                        rows={6}
                        onChange={changeHandler}
                        value={currentFurniture.assembling}
                    />
                    <Button
                        type='button'
                        sx={{ alignSelf: 'flex-end'}}
                        variant="contained"
                        onClick={deleteClickHandler}
                    >
                        Удалить
                    </Button>
                </div>
            </div>
        </div>}
        </>
    );
};

export default AdditionalFurniture;

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
