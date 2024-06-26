import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';





type TProps = {
    sizes?: Array<
    {
        size: string;
        qty: string;
        printQty?: string;
    }
>,
    textileQty: string,
    fabricColor: string,
    type: 'mainTable' | 'printTable',
}



const SizesTable: React.FC<TProps> = ({sizes, textileQty, fabricColor, type}) => {

    //console.log(sizes);
    const sum = type === 'mainTable' ? sizes?.reduce((acc, { qty }) => qty === '0' || qty === '' ? acc : acc + parseInt(qty), 0)
    : sizes?.reduce((acc, { printQty }) => printQty === '0' || printQty === '' ? acc : acc + parseInt(printQty!), 0)
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
                          {sizes!.map(({qty, printQty}, index) => (
      
                            <View key={index} style={{minWidth: '40px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black'}}>
                                <Text>{type === 'mainTable' ? qty : printQty}</Text>
                            </View>
                          ))}
                          <View style={{minWidth: '40px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black'}}>
                                <Text>{sum}/{textileQty}</Text>
                          </View>
                        </View>  


                      
                    </View>
                </View>
    

    
        
    )
}


export default SizesTable