import React, { useEffect } from 'react';
import styles from './orders-info.module.css';
import { useGetOrdersQuery } from '../../api/api';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { actions as firstStepActions } from '../../store/first-step/first-step.slice';
import { actions as secondStepActions } from '../../store/second-step/second-step.slice';
import { actions as thirdStepActions } from '../../store/third-step/third-step.slice';
import { actions as fourthStepActions } from '../../store/fourth-step/fourth-step.slice';
import { actions as stepperActions } from '../../store/stepper/stepper.slice';
import { useNavigate } from 'react-router';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdfrenderer from '../pdf-render/pdf-render';
import { useDeleteOrderMutation } from '../../api/api';
import { api } from '../../api/api';




const OrdersInfo: React.FC = () => {
   
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userToken } = useAppSelector(store => store.auth);
    
    const { data } = useGetOrdersQuery(userToken, {refetchOnMountOrArgChange: true});
    const [ deleteOrder, { data: deleteOrderData } ] = useDeleteOrderMutation();
    const { refetch } = api.endpoints.getOrders.useQuerySubscription(deleteOrderData, { refetchOnMountOrArgChange: true })
    //@ts-ignore
    //const filteredData = data.data.filter(item => item.attributes.user === user.id);
    const editButtonClickHandler = (item) => {
        const { id, attributes: itemData } = item;
        const order = JSON.parse(itemData.order)
        //console.log(order.secondStep)
        dispatch(firstStepActions.restoreState(order.firstStep));
        dispatch(firstStepActions.setOrderType('edit'));
        dispatch(secondStepActions.restoreState(order.secondStep));
        dispatch(thirdStepActions.restoreState(order.thirdStep));
        dispatch(fourthStepActions.restoreState(order.fourthStep));
        dispatch(stepperActions.changeCurrentStep(4));
        dispatch(stepperActions.changeActiveStep(1));

        navigate(`/?id=${id}`);
    }

    useEffect(() => {

    }, )

    return (
        <>
        {data && <div className={styles.ordersInfo}>
            {
            //@ts-ignore
            data.data.map((item) => {

                const order = JSON.parse(item.attributes.order);

                return (
                <div className={styles.order_item} key={item.id}>
                    <p className={styles.order_title}>#{item.attributes.number}</p>
                    <button className={styles.order_controlButton} type='button' onClick={() => {editButtonClickHandler(item)}}>Редактировать</button>
                    <PDFDownloadLink 
                        className={styles.order_downloadLink}
                        document={
                            <Pdfrenderer
                                firstStep={order.firstStep}
                                secondStep={order.secondStep}
                                thirdStep={order.thirdStep}
                                fourthStep={order.fourthStep}
                            />
                        }
                        fileName={item.attributes.number}
                    >
                        Скачать
                    </PDFDownloadLink>
                    <button className={styles.order_controlButton} type='button' onClick={() => {refetch(); deleteOrder({id: item.id, token: userToken})}}>Удалить</button>
                </div>   
            )})}
        </div>}
        </>
    )
}
export default OrdersInfo;