import React from 'react'
import { View, Text, Easing} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Lapor from '../component/lapor';
import LaporCepat from '../component/lapor_cepat';
import History from '../component/history';
import History2 from '../component/history2';
import Home from '../component/Home';
import SplashScreen from '../component/SplashScreen';
import successPage from '../component/succesPage';

const Stack = createStackNavigator();

const config = {
    animation: 'timing',
    config: {
        duration: 100,
        easing: Easing.linear,
    },
};

const rootStack = () => {
    return (
        <Stack.Navigator initialRouteName="splash_screen" screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal', transitionSpec: { open: config, close: config} }}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="lapor_cepat" component={LaporCepat} />
            <Stack.Screen name="lapor" component={Lapor} />
            <Stack.Screen name="history" component={History} />
            <Stack.Screen name="history2" component={History2} />
            <Stack.Screen name="splash_screen" component={SplashScreen} />
            <Stack.Screen name="success_page" component={successPage} />
        </Stack.Navigator>
    )
}

export default rootStack
