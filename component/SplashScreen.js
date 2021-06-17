import React,{ Component } from 'react'
import { StyleSheet, Text, View, Animated, Image } from 'react-native'
import { StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class SplashScreen extends Component {

    state = {
        LogoAnime : new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
    }

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        const {LogoAnime, LogoText} = this.state;

        // Animated.parallel([
        //     Animated.spring(LogoAnime, {
        //         toValue: 1,
        //         tension: 10,
        //         friction: 2,
        //         duration: 3000
        //     }).start(),

        //     Animated.timing(LogoText, {
        //         toValue: 1,
        //         duration: 3000,
        //     }),
        // ]).start(() => {
        //     this.setState({
        //         loadingSpinner: true,
        //     })
        // });
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('home'));
        },3000);
    }

    render(){
        return (
            <View style={styles.container}>
                <Image source={require('../assets/gambar/construct-2.png')} style={{ width: 80, height: 70 }} />
                <Text style={styles.splashText}>SITANCEP</Text>
            </View>
        )
    }
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#414865',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10
    }
})
