import { StyleSheet, Button, Text, View, TextInput, Dimensions, Image } from 'react-native'
import React from 'react'
import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/Common/ButtonContinue';
import ButtonBack from '../Components/Common/ButtonBack'
import * as Progress from 'react-native-progress';

const RegisterDescription = ({ navigation }) => {
    const { descripcion, handleChangeDesc, charsLeft } = useRegisterContext();
    const [progressBarD, setprogressBarD] = useState(0);
    useEffect(() => {
        setprogressBarD(0.33);
    }, [])

    const continuar = () => {
        if (descripcion.length >= 0) {
            navigation.navigate('RegisterSecond')
        }
    }
    const volver = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#ffffff"
            />
            <Progress.Bar
                position="absolute"
                progress={progressBarD}
                width={windowWidth}
                borderRadius={0}
                borderWidth={0}
                top={31}
                color='rgb(94, 157, 181)'
            />
            <View style={{ position: 'absolute', top: 60, left: 30 }} >
                <ButtonBack onPress={volver} />
            </View>
            <View style={{ top: 80 }}>
                <Text style={styles.textTitle}>Descripción</Text>
                <TextInput
                    style={[styles.inputDesc, descripcion.length <= 0 && styles.inputYellow]}
                    placeholder={'"Mido un metro ochenta y uno..."'}
                    onChangeText={handleChangeDesc}
                    value={descripcion}
                    multiline={true}
                    numberOfLines={8}
                />
            </View>
            {
                descripcion.length <= 0 &&
                <Text style={styles.error}>El campo no puede estar vacío</Text>
            }
            {/* <Button title='Go Back' onPress={() => navigation.goBack()} /> */}
            <ButtonContinue onPress={nextPage} />
            {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
            <Image style={styles.backgroundImg} source={require('../Assets/register/registerFirstBackground.png')} />
        </View>
    )
}

export default RegisterDescription

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        justifyContent: 'center',
        // fontFamily: 'Capriola_400Regular' ?? 'Comic Sans Ms',
    },
    backgroundImg: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
        height: 260,
        top: 50,
    },
    textTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#1f1f1f",
        marginBottom: 5,
        // fontFamily: 'Capriola_400Regular'
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
    },
    error: {
        color: '#eb4034',
        width: 264,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    inputRed: {
        borderBottomColor: '#eb4034',
    },
})