import React from 'react';
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import Roboto from '../../fonts/Roboto-Regular.ttf';
import pnhdLogo from '/pnhdLogo.png';

const PdfHeader: React.FC<any> = ({ orderNumber }) => {

    //const { orderNumber } = useAppSelector(store => store.firstStep)

    Font.register({ family: 'Roboto', src: Roboto });

    const styles = StyleSheet.create({       

        twoColumns: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            borderBottom: '1px solid black',
            padding: '20 0',
        },
        columnOne: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
        columnTwo: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        },
        logo: {
          width: '200px',
        }
      });

    return (
            <View style={styles.twoColumns}>
                <View style={styles.columnOne}>
                    <Image src={pnhdLogo} style={styles.logo}/>
                </View>              
                <View style={styles.columnTwo}>
                    <Text style={{fontSize: 10}}>ТЕХНИЧЕСКОЕ ЗАДАНИЕ</Text>
                    <Text style={{fontSize: 10}}>К ЗАКАЗУ №{orderNumber}</Text>          
                    <Text style={{fontSize: 10}}>САНКТ-ПЕТЕРБУРГ, УЛ. ЧАПЫГИНА 1</Text>          
                    <Text style={{fontSize: 10}}>PNHD.RU / HELLO@PNHD.RU / +7 (812) 407-27-14</Text>          
                </View> 
            </View>
    )
};


export default PdfHeader;