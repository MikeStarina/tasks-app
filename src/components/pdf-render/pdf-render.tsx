import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet, Font, Image, Svg, BlobProvider } from '@react-pdf/renderer';
import { useAppSelector } from '../../store/hooks';
import Roboto from '../../fonts/Roboto-Regular.ttf';
import pnhdLogo from '/pnhdLogo.png';
import useImage from 'use-image';
import PdfHeader from './pdf-header';
import PdfFooter from './pdf-footer';
import SizesTable from './sizes-table';
import PdfPrintParams from './pdfPrintParams/pdfPrintParams';









const Pdfrenderer = () => {

    const { orderNumber, managerName, startDate, dueDate, textileType, textileQty, stepOneName } = useAppSelector(store => store.firstStep)
    const { fabricColor, primaryFabricType, secondaryFabricType, stepTwoName, supplier, sizes, printOnParts, sewingOptions, furniture, sewingComment } = useAppSelector(store => store.secondStep)
    const { stepThreeName, isOrderWithPrint, prints } = useAppSelector(store => store.thirdStep)

    const neckClosure = sewingOptions[0].neckClosure.filter((item) => item.status)[0];
    const neckSewing = sewingOptions[0].neckSewing.filter((item) => item.status)[0];
    const flatlock = sewingOptions[0].flatlock.filter((item) => item.status);

    //console.log(prints)
    Font.register({ family: 'Roboto', src: Roboto });
    const dateFormatter = (date: string) => {
      const dateArray = date.substring(1,11).split('-').reverse();
      const formattedDate = `${dateArray[0]}.${dateArray[1]}.${dateArray[2]}`
      return formattedDate
    }


    const styles = StyleSheet.create({       

       
        page: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: '0 20',
          fontFamily: 'Roboto',
          fontSize: '10px',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        },
        text: {
            fontFamily: 'Roboto',
        },
        orderNumber: {
          fontSize: 20,
          marginBottom: 10,
        },
        twoColumns: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            padding: '15 0',
        },
        sewing: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            padding: '15 0',
            gap: 20,
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
        },
        previewWrapper: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          padding: '15 0',
          gap: 10
        },
        imgColumn: {
          width: '50%',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid black'
        }
      });

      const MyDocument = () => (
        <Document title={orderNumber}>
          <Page size="A4" style={styles.page}>
              <PdfHeader orderNumber={orderNumber} />
              <View style={styles.twoColumns}>
                <View style={styles.columnOne}>
                    <Text style={styles.orderNumber}>{stepOneName}</Text>
                    <Text>Заказ №{orderNumber}</Text>   
                    <Text>Менеджер: {managerName}</Text>
                    <Text>Изделия: {textileType}, {textileQty}шт., цвет: {fabricColor}</Text>
                    <Text>Дата начала: {dateFormatter(startDate)}</Text>
                    <Text>Дата готовности: {dateFormatter(dueDate)}</Text>
                </View>
              </View>  
        
              <PdfFooter />           

          </Page>




          <Page size="A4" style={styles.page}>
            
            <View style={styles.sewing}>
                <View style={styles.columnOne}>
                    <Text style={styles.orderNumber}>{stepTwoName}</Text>
                    <Text>Основное полотно: {primaryFabricType}</Text>   
                    <Text>Отделочное полотно: {secondaryFabricType}</Text>
                    <Text>Поставщик: {supplier}</Text>
                    <Text>Паспорт модели: {supplier}</Text>
                </View>              
                <SizesTable sizes={sizes} textileQty={textileQty} fabricColor={fabricColor} />          
              </View>
              <View style={styles.twoColumns}>
                <View style={styles.columnOne}>
                <Text>Печать в крое: {printOnParts.isPrintOnParts ? 'да' : 'нет'}</Text> 
                {printOnParts.isPrintOnParts && printOnParts.partsForPrint.map((item, index) => {

                  if (item.isForPrint) {
                    return (
                      <Text key={index}>Деталь: {item.ruName}, метод печати: {item.method}</Text>
                    )
                  }
                }
                    
                )}
                </View>
              </View>
              <View style={styles.twoColumns}>
                <View style={styles.columnOne}>

                  <Text>Закрытие Горловины: {neckClosure.label}</Text>  
                  <Text>Обработка Горловины: {neckSewing.label}</Text>  
                </View>
                <View style={styles.columnTwo}>
                    {flatlock.length > 0 && <Text>Распошив элементов:</Text>}
                    {flatlock.length > 0 && flatlock.map((item, index) => {
                        if (item.status) {
                          return (
                            <Text key={index}>{item.label}</Text>
                          )
                        }
                    })}
                  
                </View>
              </View>
              <View style={styles.twoColumns}>
                <View style={styles.columnOne}>

                  <Text>Фурнитура и бирки:</Text>  
                  {furniture.isCord && <Text>Шнур, цвет шнура: {furniture.cordColor}</Text>}
                  <Text>Бирки: {furniture.basicSizeLabel && 'Размерник PNHD'}, {furniture.basicContainLabel && 'Составник PNHD'}</Text> 
                </View>
              </View>
              <Text>Комментарии к пошиву:</Text>
              <Text>{sewingComment}</Text>
              <PdfFooter />
          </Page>
          {isOrderWithPrint && prints && prints.map((item, index) => {
            
            return(
              <Page size="A4" style={styles.page} key={index}>
                  
                  <View style={styles.sewing}>
                  <Text style={styles.orderNumber}>{stepThreeName}</Text>
                  <Text style={{margin: '0'}}>ПРИНТ #{index + 1}</Text>
                  <View style={styles.twoColumns}>
                    <View style={styles.columnOne}>
                         
                      <Text>Метод печати: {item.method}</Text>
                      <Text>Размеры принта (ШхВ): {item.printWidth}x{item.printHeight}</Text>
                      <Text>Расположение: {item.position}</Text>
                      <Text>Отступы: {item.printMargins}</Text>
                      
                      
                    </View>
                    <View style={styles.columnTwo}>
                        <PdfPrintParams item={item} />
                    </View>
                  </View>
                    <View style={styles.twoColumns}>
                        <View style={styles.columnOne}>
                          <Text>Превью принта:</Text>
                        </View>
                        <View style={styles.columnTwo}>
                          <Text>Мокап:</Text>
                        </View>
                    </View>
                    <View style={styles.previewWrapper}>
                      <View style={styles.imgColumn}>                        
                        <Image src={item.printPreview} style={{objectFit: 'contain'}}/>
                      </View>
                      <View style={styles.imgColumn}>
                        
                        <Image src={item.mockup} style={{objectFit: 'contain'}}/>
                      </View>
                    </View>
                    <SizesTable sizes={item.sizes} textileQty={textileQty} fabricColor={fabricColor} />
                  </View>
                  <PdfFooter />
              </Page>
            )
          })}
        </Document>
      );

    return (
        <PDFViewer style={{ width: '100%', minHeight: '100vh'}}>
            <MyDocument />
        </PDFViewer>
    )
}


export default Pdfrenderer