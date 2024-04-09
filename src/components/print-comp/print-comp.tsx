import React from "react";
import styles from "./print-comp.module.css";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as thirdStepActions } from "../../store/third-step/third-step.slice";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PrintSizesComponent from "../print-sizes-component copy/print-sizes-component";
import { usePreviewUploadMutation, useMockupUploadMutation } from "../../api/api";
import { API_BASE_URL } from "../../utils/constants";

const printMethods = ["Шелкография", "DTF", "DTG", "Термоперенос", "Вышивка"];

const PrintComp: React.FC<{ index: number }> = ({ index }) => {
    const { prints } = useAppSelector((store) => store.thirdStep);
    const { userToken } = useAppSelector((store) => store.auth);
    const dispatch = useAppDispatch();
    const [ previewUpload, { data: previewFileData } ] = usePreviewUploadMutation();
    if (previewFileData) {
        dispatch(
            thirdStepActions.setImages({
                name: 'printPreview',
                fileLink: `${API_BASE_URL}${previewFileData[0].url}`,
                index,
            })
        );
    }
   
    const [ mockupUpload, { data: mockupFileData } ] = useMockupUploadMutation();
    if (mockupFileData) {
        dispatch(
            thirdStepActions.setImages({
                name: 'mockup',
                fileLink: `${API_BASE_URL}${mockupFileData[0].url}`,
                index,
            })
        );
    }
    const printNumber = index + 1;
    const currentPrint = prints![index];

    const onChangeHandler = (e: any) => {
        dispatch(
            thirdStepActions.setPrintMethod({ method: e.target.value, index })
        );
    };

    const fileUpload = async (e: any) => {
        try {
            const file = await e.target.files[0];
            const data = new FormData()
            //const fileURL = URL.createObjectURL(file);
            data.append('files', file)
            data.append('filetype', e.target.name)
            e.target.name === 'printPreview' && previewUpload({userToken, file: data});
            e.target.name === 'mockup' && mockupUpload({userToken, file: data});
        } catch (err) {
            console.log(err);
        }
    };

    const basicInfoChangeHandler = (e: any) => {
        dispatch(
            thirdStepActions.setBasicPrintInfo({
                name: e.target.name,
                value: e.target.value,
                index,
            })
        );
    };

    const deletePrintHandler = () => {
        dispatch(thirdStepActions.deletePrint({ index }))
    }

    return (
        <div className={styles.step}>
            <h3>ПРИНТ #{printNumber}</h3>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="printMethodLabel" required={true}>
                    Метод печати
                </InputLabel>
                <Select
                    labelId="printMethodLabel"
                    id="printMethod"
                    name="printMethod"
                    label="Метод печати"
                    variant="outlined"
                    value={currentPrint.method}
                    onChange={onChangeHandler}
                    required={true}
                    sx={{ width: "100%" }}
                >
                    {printMethods.map((item, index) => (
                        <MenuItem value={item} key={index}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {currentPrint.method && (
                <div className={styles.params_box}>
                    <div className={styles.params_column}>
                        <TextField
                            id="printWidth"
                            name="printWidth"
                            label="Ширина принта"
                            variant="outlined"
                            required={true}
                            value={currentPrint.printWidth}
                            onChange={basicInfoChangeHandler}
                            sx={{ width: "100%" }}
                            placeholder='Введите ширину в см. (только цифры)'
                        />
                        <TextField
                            id="printHeight"
                            name="printHeight"
                            label="Высота принта"
                            variant="outlined"
                            required={true}
                            value={currentPrint.printHeight}
                            onChange={basicInfoChangeHandler}
                            sx={{ width: "100%" }}
                            placeholder='Введите высоту в см. (только цифры)'
                        />
                    </div>
                    <div className={styles.params_column}>
                        <TextField
                            id="printPosition"
                            name="printPosition"
                            label="Расположение"
                            variant="outlined"
                            required={true}
                            value={currentPrint.position}
                            onChange={basicInfoChangeHandler}
                            sx={{ width: "100%" }}
                            placeholder='Укажите расположение принта'
                        />
                        <TextField
                            id="printMargins"
                            name="printMargins"
                            label="Отступы"
                            variant="outlined"
                            required={true}
                            value={currentPrint.printMargins}
                            onChange={basicInfoChangeHandler}
                            sx={{ width: "100%" }}
                            placeholder='Укажите отступы'
                        />
                    </div>
                </div>
            )}
            {currentPrint.method === "Шелкография" && (
                <SSParams currentPrint={currentPrint} index={index} />
            )}
            {currentPrint.method === "Вышивка" && (
                <EmbParams currentPrint={currentPrint} index={index} />
            )}
            {currentPrint.method === "Термотрансфер" && (
                <HTParams currentPrint={currentPrint} index={index} />
            )}
            {currentPrint.method && (
                <div className={styles.params_box}>
                    <div className={styles.params_column}>
                        <h4>Превью принта</h4>
                        <div className={styles.img_wrapper}>
                            {currentPrint.printPreview && (
                                <img
                                    src={currentPrint.printPreview}
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
                                name="printPreview"
                                //required
                            />
                        </Button>
                    </div>
                    <div className={styles.params_column}>
                        <h4>Мокап</h4>
                        <div className={styles.img_wrapper}>
                            {currentPrint.mockup && (
                                <img src={currentPrint.mockup} className={styles.preview}></img>
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
                                name="mockup"
                               // required
                            />
                        </Button>
                    </div>
                </div>
            )}
            {currentPrint.method && (
                <PrintSizesComponent currentPrint={currentPrint} index={index} />
            )}
            <Button
                sx={{ marginTop: '50px' }}
                type='button'
                variant="contained"
                onClick={deletePrintHandler}
            >
                Удалить
            </Button>
        </div>
    );
};

export default PrintComp;

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

const SSParams: React.FC<any> = ({ currentPrint, index }) => {
    const dispatch = useAppDispatch();

    //console.log(state)
    const onChangeHandler = (e: any) => {
        dispatch(
            thirdStepActions.setSSParams({
                value: e.target.checked ? e.target.checked : e.target.value,
                index,
                name: e.target.name,
            })
        );
    };

    return (
        <>
            <div className={styles.params_box}>
                <div className={styles.params_column}>
                    <TextField
                        id="pantoneColors"
                        name="pantoneColors"
                        label="Цвета PANTONE"
                        variant="outlined"
                        required={true}
                        value={currentPrint.pantoneColors}
                        onChange={onChangeHandler}
                        sx={{ width: "100%" }}
                    />
                    <TextField
                        id="specialEffects"
                        name="specialEffects"
                        label="Спецэффекты"
                        variant="outlined"
                        required={true}
                        value={currentPrint.pantoneColors}
                        onChange={onChangeHandler}
                        sx={{ width: "100%" }}
                    />
                </div>
                <div className={styles.params_column}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox name="isCMYK" onChange={onChangeHandler} />}
                            label="Полноцвет"
                            checked={currentPrint.isCMYK}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox name="isAntimigration" onChange={onChangeHandler} />
                            }
                            label="Антимиграция"
                            checked={currentPrint.isAntimigration}
                        />
                        <FormControlLabel
                            control={<Checkbox name="isStretch" onChange={onChangeHandler} />}
                            label="Стрейч"
                            checked={currentPrint.isStretch}
                        />
                    </FormGroup>
                </div>
            </div>
        </>
    );
};

const EmbParams: React.FC<any> = ({ currentPrint, index }) => {
    const dispatch = useAppDispatch();
    const onChangeHandler = (e: any) => {
        dispatch(thirdStepActions.setEmbParams({ value: e.target.value, index }));
    };

    return (
        <>
            <div className={styles.params_box}>
                <div className={styles.params_column}>
                    <TextField
                        id="threadsColors"
                        name="threadsColors"
                        label="Цвета ниток"
                        variant="outlined"
                        required={true}
                        value={currentPrint.threadsColors}
                        onChange={onChangeHandler}
                        sx={{ width: "100%" }}
                    />
                </div>
            </div>
        </>
    );
};
const HTParams: React.FC<any> = ({ currentPrint, index }) => {
    const dispatch = useAppDispatch();
    const onChangeHandler = (e: any) => {
        dispatch(thirdStepActions.setHTParams({ value: e.target.value, index }));
    };

    return (
        <>
            <div className={styles.params_box}>
                <div className={styles.params_column}>
                    <TextField
                        id="specialEffects"
                        name="specialEffects"
                        label="Спецэффекты"
                        variant="outlined"
                        required={true}
                        value={currentPrint.specialEffects}
                        onChange={onChangeHandler}
                        sx={{ width: "100%" }}
                    />
                </div>
            </div>
        </>
    );
};

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
