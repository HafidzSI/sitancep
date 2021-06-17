import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const CarouselItem = ({item}) => {
    return (
        <View style={styles.cardView}>
            {item.id == 1 &&
                <Image style={styles.image} source={require('../../assets/gambar/carousel/3.jpg')} />
            }
            {item.id == 2 &&
                <Image style={styles.image} source={require('../../assets/gambar/carousel/2.jpg')} />
            }
            {item.id == 3 &&
                <Image style={styles.image} source={require('../../assets/gambar/carousel/1.jpg')} />
            }
            <View style={styles.textView}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView:{
        flex: 1,
        width: width - 20,
        height: height / 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0.5,heigh: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,

    },

    image: {
        width: width - 20,
        height: height / 3,
        borderRadius: 10,
    },

    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: {width: 0.8, height: 0.8},
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: 'bold',
        elevation: 5
    },

    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0.8, height: 0.8},
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItem
