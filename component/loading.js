import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'

const loading = () => {
    return (
        <View>
            <LottieView source={require('../assets/loop.json')} autoPlay loop />
        </View>
    )
}

export default loading

const styles = StyleSheet.create({})
