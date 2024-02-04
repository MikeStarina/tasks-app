import React from "react";
import styles from './main-screen.module.css';
import FirstStep from "../first-step/first-step";
import SecondStep from "../second-step/second-step";
import { useAppSelector } from "../../store/hooks";
import dayjs from "dayjs";




const MainScreen: React.FC = () => {

    const { activeStep } = useAppSelector(store => store.stepper);


    return (
        <>
            {activeStep === 1 && <FirstStep />}
            {activeStep === 2 && <SecondStep />}
        </>
    )
}

export default MainScreen;