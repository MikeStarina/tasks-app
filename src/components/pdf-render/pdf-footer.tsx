import React from 'react';
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import Roboto from '../../fonts/Roboto-Regular.ttf';
import qrCode from '/qrCode.png';




const PdfFooter: React.FC = () => {

    //const { orderNumber } = useAppSelector(store => store.firstStep)

    Font.register({ family: 'Roboto', src: Roboto });

    const styles = StyleSheet.create({       

        twoColumns: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            padding: '10 0 0 0',
            position: 'absolute',
            bottom: 20,
            left: 20

        },
        columnOne: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
        columnTwo: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        },
        logo: {
          width: '50px',
        }
      });

    return (
            <View style={styles.twoColumns}>
                <View style={styles.columnOne}>
                    <Image src={qrCode} style={styles.logo}/>
                </View>              
                <View style={styles.columnTwo}>
                    <Text style={{fontSize: 8, maxWidth: '500px', marginTop: '10'}}>
                        Допускается погрешность в +- 2 цветовых тона, расхождение в расположении до
                        10 мм, размытие до 0,1 мм, перекос относительно оси, изменение итогового
                        цвета в местах соприкосновения различных цветов.
                        Ошибки, найденные в готовом изделии после УТВЕРЖДЕНИЯ ТЗ, не
                        являются основанием для претензии и переделки заказа!
                    </Text>       
                </View> 
            </View>
    )
};


export default PdfFooter;