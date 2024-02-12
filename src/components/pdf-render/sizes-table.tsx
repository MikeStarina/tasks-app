import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet, Font, Image, Svg } from '@react-pdf/renderer';
import { useAppSelector } from '../../store/hooks';
import Roboto from '../../fonts/Roboto-Regular.ttf';
import pnhdLogo from '/pnhdLogo.png';
import PdfHeader from './pdf-header';
import PdfFooter from './pdf-footer';





type TProps = {
    sizes: Array<
    {
        size: string;
        qty: string;
    }
>,
    textileQty: string,
    fabricColor: string
}



const SizesTable: React.FC<TProps> = ({sizes, textileQty, fabricColor}) => {

    

    const styles = StyleSheet.create({       

       
            
        columnOne: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
        
      });
       

      return (
        


                <View style={[styles.columnOne, {border: 'none'}]}>
                    <View style={{width: '100%', border: '1px solid black', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', alignSelf: 'center'}}>
                        <View style={{height: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                          <View style={{width: '100px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Text>ЦВЕТ / РАЗМЕР</Text>
                          </View>
                          {sizes!.map(({size}, index) => (
      
                            <View key={index} style={{minWidth: '40px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black'}}>
                                <Text>{size}</Text>
                            </View>
                          ))}
                          <View style={{minWidth: '40px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black'}}>
                                <Text>Итого:</Text>
                          </View>
                        </View>    


                        <View style={{height: '40px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', borderTop: '1px solid black'}}>
                          <View style={{width: '100px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Text>{fabricColor}</Text>
                          </View>
                          {sizes!.map(({qty}, index) => (
      
                            <View key={index} style={{minWidth: '40px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black'}}>
                                <Text>{qty}</Text>
                            </View>
                          ))}
                          <View style={{minWidth: '40px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black'}}>
                                <Text>{textileQty}</Text>
                          </View>
                        </View>  


                      
                    </View>
                </View>
    

    
        
    )
}


export default SizesTable