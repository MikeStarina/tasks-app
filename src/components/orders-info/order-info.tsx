import React, { useEffect } from "react";
import styles from "./orders-info.module.css";
import { useGetOrdersQuery } from "../../api/api";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { actions as firstStepActions } from "../../store/first-step/first-step.slice";
import { actions as secondStepActions } from "../../store/second-step/second-step.slice";
import { actions as thirdStepActions } from "../../store/third-step/third-step.slice";
import { actions as fourthStepActions } from "../../store/fourth-step/fourth-step.slice";
import { actions as stepperActions } from "../../store/stepper/stepper.slice";
import { actions as furnitureActions } from "../../store/furniture-step/furniture-step.slice";
import { useNavigate } from "react-router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdfrenderer from "../pdf-render/pdf-render";
import { useDeleteOrderMutation } from "../../api/api";
import dayjs from "dayjs";
import { Button } from "@mui/material";

const OrdersInfo: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userToken } = useAppSelector((store) => store.auth);

    const { data, refetch } = useGetOrdersQuery(userToken, {
        refetchOnMountOrArgChange: true,
    });
    const [deleteOrder, { isSuccess, reset }] = useDeleteOrderMutation();
    //@ts-ignore
    //const filteredData = data.data.filter(item => item.attributes.user === user.id);
    const editButtonClickHandler = (item) => {
        const { id, attributes: itemData } = item;
        const order = JSON.parse(itemData.order);
        //console.log(order.secondStep)
        dispatch(firstStepActions.restoreState(order.firstStep));
        dispatch(firstStepActions.setOrderType("edit"));
        dispatch(secondStepActions.restoreState(order.secondStep));
        dispatch(thirdStepActions.restoreState(order.thirdStep));
        dispatch(fourthStepActions.restoreState(order.fourthStep));
        dispatch(furnitureActions.restoreState(order.furniture))
        dispatch(stepperActions.changeCurrentStep(4));
        dispatch(stepperActions.changeActiveStep(1));

        navigate(`/?id=${id}`);
    };

    const deleteOrderButtonClickHandler = (item: any) => {
        deleteOrder({ id: item.id, token: userToken });
    };

    useEffect(() => {
        isSuccess && refetch();
        isSuccess && reset();
    }, [isSuccess]);

    return (
        <>
            {data && (
                <div className={styles.ordersInfo}>
                    {
                        //@ts-ignore
                        data.data.map((item) => {
                            const order = JSON.parse(item.attributes.order);
                            //const dateNow = dayjs().format("DD.MM.YYYY");
                            //const createdDate = dayjs(item.attributes.updatedAt).format("DD.MM.YYYY");

                            return (
                                <div className={styles.order_item} key={item.id}>
                                    <p className={styles.order_title}>
                                        #{item.attributes.number}
                                    </p>
                                    <p className={styles.order_title}>
                                        Создан:{" "}
                                        {`${dayjs(item.attributes.createdAt).format(
                                            "DD.MM.YYYY HH:mm"
                                        )}`}
                                    </p>
                                    <p className={styles.order_title}>
                                        Изменен:{" "}
                                        {`${dayjs(item.attributes.updatedAt).format(
                                            "DD.MM.YYYY HH:mm"
                                        )}`}
                                    </p>
                                    <div className={styles.order_buttonWrapper}>
                                        <Button
                                            variant="contained"
                                            type="button"
                                            onClick={() => {
                                                editButtonClickHandler(item);
                                            }}
                                        >
                                            Редактировать
                                        </Button>
                                        <PDFDownloadLink
                                            //className={styles.order_downloadLink}
                                            document={
                                                <Pdfrenderer
                                                    firstStep={order.firstStep}
                                                    secondStep={order.secondStep}
                                                    thirdStep={order.thirdStep}
                                                    fourthStep={order.fourthStep}
                                                    furnitureStep={order.furniture}
                                                />
                                            }
                                            fileName={item.attributes.number}
                                        >
                                            <Button 
                                                variant="contained"
                                                type="button"
                                            >
                                                Скачать
                                            </Button>
                                        </PDFDownloadLink>
                                        <Button
                                            variant="contained"
                                            type="button"
                                            onClick={() => deleteOrderButtonClickHandler(item)}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            )}
            
        </>
    );
};
export default OrdersInfo;
