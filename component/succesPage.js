import React,{ Component } from 'react'
import { StyleSheet, Text, View, Animated, Image } from 'react-native'
import { StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native'

class successPage extends Component {

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
                <LottieView source={require('../assets/success.json')} autoPlay />
            </View>
        )
    }
}

export default successPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    }
})
