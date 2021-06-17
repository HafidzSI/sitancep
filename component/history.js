import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ExploreView from './History/ExploreView';
import FIREBASE from '../config/firebase'
import storage from '@react-native-firebase/storage'

const initialState = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
}


const history = () => {
    const [currentPosition, setCurrentPosition] = useState(initialState);
    const [history, setHistory] = useState(null)
    const [historyKey, setHistoryKey] = useState([])

    useEffect(() => {
        Geolocation.getCurrentPosition(position => {            
            const {latitude, longitude} = position.coords;
            setCurrentPosition({
                ...currentPosition,
                latitude,
                longitude,
            })
    
        },
            error => alert(error.message),
        )

        let isMounted = true
        FIREBASE.database()
            .ref('Lapor_cepat')
            .once('value',(querySnapShot) => {
                let data = querySnapShot.val() ? querySnapShot.val() : {}
                let laporItem = {...data}
                if(isMounted)
                {
                    setHistory(laporItem)
                    setHistoryKey(Object.keys(laporItem))
                }
            })

        return () => { isMounted = false }

    },[])

    const mapMarkers = () => {
        return historyKey.map((key) => <Marker 
            key={key} 
            coordinate={{ latitude:history[key].latitude, longitude: history[key].longitude  }} 
            title={'Lokasi saya'} 
        />)
    }

    return currentPosition.latitude ? (
        <View style={{ flex:1, backgroundColor: '#414865' }}>
            <View style={{ margin: 20 }}>
                <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold' }}>
                    History
                </Text>
            </View>

            <View style={{ flex: 1, backgroundColor: '#fcfffd'}}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ height: '70%',}}
                    initialRegion={currentPosition}>
                    {mapMarkers()}
                </MapView>
                <ScrollView scrollEventThrottle={16}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 10, textAlign: 'center' }}>Temukan laporan disekitar mu</Text>
                        <View style={{ height: 130, marginTop: 20, }}>
                            <ScrollView horizontal={true}>
                                {
                                    historyKey.map((key) => {
                                        return (
                                            <View key={key}>
                                                <ExploreView imageUrl={require('../assets/gambar/39127015881-irigasi.jpg')} nama_pelapor={history[key].nama_pelapor} />
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </View>
    ) : <ActivityIndicator style={{ flex: 1 }} animating size="large" />
}

export default history

const styles = StyleSheet.create({
    headerButtonActive: {
      paddingHorizontal: 20, 
      backgroundColor: '#ffffff', 
      marginRight: 10, 
      borderRadius: 50, 
      paddingVertical: 10,
    },
    headerButtonNotActive: {
      paddingHorizontal: 20, 
      backgroundColor: '#414865', 
      marginRight: 10, 
      borderRadius: 50, 
      paddingVertical: 10,
    },
    
    headerButtonTextActive: {
      color: '#5b5b67'
    },
  
    headerButtonTextNotActive: {
      color: '#828aa1'
    },
  })

