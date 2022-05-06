import React from 'react'
import {Text,View, FlatList} from 'react-native';

export default (props) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>props.verDetalles(item.Id ,item.Nombre , item.FechaNac.substring(0,10))}>
          <Text> {item.Id +': ' + item.Nombre + ' ' + item.FechaNac.substring(0,10)}</Text>
        </TouchableOpacity>
        );
    
    return(
        <View>
            <FlatList
                data={props.peliculas}
                renderItem={renderItem}
                keyExtractor={item => item.Id}
                horizontal={false}
            />
        </View>
    )

}