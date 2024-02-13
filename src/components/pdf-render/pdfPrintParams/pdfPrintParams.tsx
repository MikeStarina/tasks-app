import React from "react"
import { Text } from '@react-pdf/renderer';

const PdfPrintParams: React.FC<any> = ({item}) => {
    const { params, method } = item;
    

    return (
        <>
        {method === 'Шелкография' &&
            <>
                <Text>Антимиграция: {params.isAntimigration && '[v]'}</Text>
                <Text>Полноцвет: {params.isCMYK && '[v]'}</Text>
                <Text>Стейч: {params.isStretch && '[v]'}</Text>
                <Text>Цвета PANTONE: {item.params.pantoneColors}</Text>
                <Text>Спецэффекты: {item.params.specialEffects}</Text>
            </>
        }
        {method === 'Вышивка' &&
            <>
                <Text>Цвет ниток: {params.threadsColors}</Text>
            </>
        }
        </>
    )
}

export default PdfPrintParams;