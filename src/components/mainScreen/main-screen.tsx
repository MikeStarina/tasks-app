import React from "react";
import FirstStep from "../first-step/first-step";
import SecondStep from "../second-step/second-step";
import { useAppSelector } from "../../store/hooks";
import ThirdStep from "../third-step/third-step";
import FourthStep from "../fourth-step/fourth-step";
import FurnitureStep from "../furniture-step/furniture-step";




const MainScreen: React.FC = () => {

    const { activeStep } = useAppSelector(store => store.stepper);


    return (
        <>
            {activeStep === 1 && <FirstStep />}
            {activeStep === 2 && <SecondStep />}
            {activeStep === 3 && <FurnitureStep />}
            {activeStep === 4 && <ThirdStep />}
            {activeStep === 5 && <FourthStep />}
        </>
    )
}

export default MainScreen;