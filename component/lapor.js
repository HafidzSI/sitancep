import React, {createRef, useEffect, useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableHighlight, Button, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from "react-native-actions-sheet";
import {launchCamera} from 'react-native-image-picker';
import FIREBASE from '../config/firebase'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import { Overlay  } from 'react-native-elements'

import FormData from 'form-data';
import axios from 'axios'

const lapor = ({navigation}) => {

    const [imageUri, setImageUri] = useState(null);
    const [linkUrl, setLinkUrl] = useState(null)
    const [imageUriUpload, setImageUriUpload] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const [idLapor, setIdLapor] = useState("")
    const [nama, setNama] = useState("")
    const [tempatTinggal, setTempatTinggal] = useState("")
    const [noHP, setNoHP] = useState("")
    const [alamatJalanRusak, setAlamatJalanRusak] = useState("")
    const [petunjukLokasi, setPetunjukLokasi] = useState("")

    useEffect(() => {
        auth().signInAnonymously()
    })

    const handleChoosePhoto = () => {
    
        launchCamera({ mediaType: 'photo', quality: 1, saveToPhotos: true,}, (response) => {
            if(response.didCancel){
                alert('dibatalkan');
            }
            else if (response.error){
                alert('error');
            }
            else if (response.customButton){
                alert("custom button");
            }
            else{
                const source = {uri: response.assets[0].uri};
                setImage(response.assets[0])
                setImageUriUpload(response.assets[0].uri)
                setImageUri(source);
            }
        });
    }

    const handlePostLaporan = () => {
        const laporan = FIREBASE.database().ref('Lapor');
        const reference = storage().ref(image.fileName)

        setIsLoading(true)

        reference.putFile(imageUriUpload)
        .on(
            FIREBASE.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                console.log("snapshot: " + snapshot.state);
                console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            error => {
                console.log("image upload error: " + error.toString());
            },

            () => {
                reference.getDownloadURL()
                .then((downloadUrl) => {
                    const dataLaporan = {
                        'nama_pelapor': nama,
                        'alamat': tempatTinggal,
                        'no_hp': noHP,
                        'lokasi_jalan_rusak': alamatJalanRusak,
                        'petunjuk_lokasi': petunjukLokasi,
                        'status': '1',
                        'gambar': downloadUrl
                    }
            
                    laporan.push(dataLaporan)
                    .then((data) => {
                        setIsLoading(false)
                        navigation.navigate("success_page")
                    })
                    .catch((error) => {
                        console.log(error)
                    })     
                })

            }
        )

    }

    return (
        <View style={{ flex:1, backgroundColor: '#414865', }}>
            <View style={{ margin: 20 }}>
                <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold' }}>
                    Kirim laporan Cepat
                </Text>
            </View>

            <View style={{ flex: 1, backgroundColor: '#fcfffd', borderTopRightRadius: 40, paddingVertical: 10, paddingHorizontal: 30 }}>
                <View style={{ alignItems: 'center', marginTop: 40, }}>
                    <TouchableOpacity onPress={() => { handleChoosePhoto() }}>
                        <Image source={imageUri} style={{ height: 100, width: 100, borderWidth: 2, borderColor: 'black', }} />
                    </TouchableOpacity>
                    {/* <Button style={{ marginTop: 40, }} title="Pilih Gambar" onPress={() => { handleChoosePhoto() }}>Upload Gambar</Button> */}
                </View>
                <Text>Nama</Text>
                <View style={styles.action}>
                    <Icon name="user" color="#414865" />
                    <TextInput placeholder="Masukkan nama" value={nama} onChangeText={(value) => setNama(value)} style={styles.textInput} />
                </View>
                <Text>Tempat tinggal</Text>
                <View style={styles.action}>
                    <Icon name="map-marker-alt" color="#414865" />
                    <TextInput placeholder="Masukkan tempat tinggal" value={tempatTinggal} onChangeText={(value) => setTempatTinggal(value)} style={styles.textInput} />
                </View>
                <Text>Nomor yang dapat dihubungi</Text>
                <View style={styles.action}>
                    <Icon name="phone" color="#414865" />
                    <TextInput placeholder="Masukkan nama" value={noHP} onChangeText={(value) => setNoHP(value)} style={styles.textInput} />
                </View>
                <Text>Alamat lokasi jalan rusak</Text>
                <View style={styles.action}>
                    <Icon name="map-marker-alt" color="#414865" />
                    <TextInput placeholder="Masukkan nama" value={alamatJalanRusak} onChangeText={(value) => setAlamatJalanRusak(value)} style={styles.textInput} />
                </View>
                <Text>Petunjuk lokasi</Text>
                <View style={styles.action}>
                    <Icon name="map-signs" color="#414865" />
                    <TextInput placeholder="Masukkan nama" value={petunjukLokasi} onChangeText={(value) => setPetunjukLokasi(value)} style={styles.textInput} />
                </View>

                <TouchableOpacity onPress={ () => { handlePostLaporan() }}>
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.Kirim}>
                            <Text style={styles.textKirim}>Kirim</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {
                isLoading && 
                <Overlay isVisible={isLoading}>
                    <ActivityIndicator size="large" color="blue" />
                </Overlay>
            }
        </View>
    )
}

export default lapor

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

    textKirim: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    
    linearGradient: {
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    
    Kirim: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },

    button: {
        alignItems: 'center',
        marginTop: 50,
    },

    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
    },

    headerButtonTextActive: {
      color: '#5b5b67'
    },
  
    headerButtonTextNotActive: {
      color: '#828aa1'
    },
  })
