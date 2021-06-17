import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, FlatList } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import FIREBASE from '../config/firebase'
import { useState } from 'react/cjs/react.development';
import storage from '@react-native-firebase/storage'


const history2 = () => {

    const [history, setHistory] = useState(null)
    const [imageUri, setImageUri] = useState(null)
    const [historyKey, setHistoryKey] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        FIREBASE.database()
            .ref('Lapor')
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
    })

    return (
        <View style={{ flex:1, backgroundColor: '#414865' }}>
            <View style={{ margin: 20 }}>
                <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold' }}>
                    History Laporan
                </Text>
            </View>

            <View style={{ flex: 1, backgroundColor: '#fcfffd', borderTopRightRadius: 40, }}>
                    <Card containerStyle={{ borderTopRightRadius: 40, borderBottomLeftRadius: 40 }}>
                        {
                            historyKey.map((key) => {
                                return (
                                    <ListItem key={key} bottomDivider>
                                        <Avatar size="large" source={{ uri: history[key].gambar }} />
                                        <ListItem.Content>
                                            <ListItem.Title>Lokasi : {history[key].lokasi_jalan_rusak}</ListItem.Title>
                                            <ListItem.Subtitle>Pelapor : {history[key].nama_pelapor}</ListItem.Subtitle>
                                            <ListItem.Subtitle>Status : {history[key].status == 1 ? 'Dilaporkan' : 'Tidak dapat diproses'}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                )
                            })
                        }                        
                    </Card>
            </View>
        </View>
    )
}

export default history2

const styles = StyleSheet.create({
    name: {
        textAlign: 'center'
    }
})
