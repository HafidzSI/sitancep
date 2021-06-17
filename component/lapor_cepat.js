import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from '@react-native-community/geolocation';
import FIREBASE from '../config/firebase'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import { Overlay  } from 'react-native-elements'

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
}

const lapor_cepat = ({navigation}) => {
    const [currentPosition, setCurrentPosition] = useState(initialState);
    const [nama, setNama] = useState("")
    const [tempatTinggal, setTempatTinggal] = useState("")
    const [noHP, setNoHP] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      auth().signInAnonymously()
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

    },[])

    bs = React.createRef();
    fall = new Animated.Value(1);

    const handlePostLaporan = () => {
      const laporan = FIREBASE.database().ref('Lapor_cepat');
      const dataLaporan = {
        'nama_pelapor': nama,
        'alamat': tempatTinggal,
        'no_hp': noHP,
        'latitude': currentPosition.latitude,
        'longitude': currentPosition.longitude,
        'status': '1',
      }

      setIsLoading(true)

      laporan.push(dataLaporan)
      .then((data) => {
          navigation.navigate("success_page")
      })
      .catch((error) => {
          console.log(error)
      })
    }
    

    renderInner = () => (
      <View style={styles.panel}>
        <Text>Nama</Text>
        <View style={styles.action}>
            <Icon name="user" color="#414865" />
            <TextInput placeholder="Masukkan nama" value={nama} onChangeText={(value) => setNama(value)} style={styles.textInput} />
        </View>
        <Text>Tempat tinggal</Text>
        <View style={styles.action}>
            <Icon name="map-marker-alt" color="#414865" />
            <TextInput placeholder="Masukkan alamat" value={tempatTinggal} onChangeText={(value) => setTempatTinggal(value)} style={styles.textInput} />
        </View>
        <Text>Nomor yang dapat dihubungi</Text>
        <View style={styles.action}>
            <Icon name="phone" color="#414865" />
            <TextInput placeholder="Masukkan no hp" value={noHP} onChangeText={(value) => setNoHP(value)} style={styles.textInput} />
        </View>
        <TouchableOpacity onPress={handlePostLaporan}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.Kirim}>
                    <Text style={styles.textKirim}>Kirim</Text>
            </LinearGradient>
        </TouchableOpacity>
      </View>
    );

    renderHeader = () => (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle}></View>
        </View>
      </View>
    );

    return currentPosition.latitude ? (
        <View style={{ flex:1, backgroundColor: '#414865' }}>
            <View style={{ margin: 20 }}>
                <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold' }}>
                    Laporan cepat
                </Text>
            </View>

            <View style={{ flex: 1, backgroundColor: '#fcfffd', borderTopRightRadius: 40, }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ height: '90%',}}
                initialRegion={currentPosition}>
                <Marker coordinate={{ latitude:currentPosition.latitude, longitude: currentPosition.longitude  }} title={'Lokasi saya'} />
              </MapView>
              <TouchableOpacity onPress={() => this.bs.current.snapTo(0)} style={{ marginTop: 10, paddingHorizontal: 30, }}>
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.Kirim}>
                        <Text style={styles.textKirim}>Lengkapi data</Text>
                    </LinearGradient>
              </TouchableOpacity>
              <BottomSheet
                ref={this.bs}
                snapPoints={[330, 0]}
                initialSnap={1}
                renderContent={this.renderInner}
                renderHeader={this.renderHeader}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
              />
            </View>

            {
                isLoading && 
                <Overlay isVisible={isLoading}>
                    <ActivityIndicator size="large" color="blue" />
                </Overlay>
            }
        </View>
    ) : <ActivityIndicator style={{ flex: 1 }} animating size="large" />
}

export default lapor_cepat

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

    Kirim: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },

    textKirim: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },

    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },

    textInput: {
      flex: 1,
      marginTop: -12,
      paddingLeft: 10,
      color: '#05375a',
    },

    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    
    headerButtonTextActive: {
      color: '#5b5b67'
    },
  
    headerButtonTextNotActive: {
      color: '#828aa1'
    },

    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

    panelHeader: {
      alignItems: 'center',
    },

    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    }
  })

