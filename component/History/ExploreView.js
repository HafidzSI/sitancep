import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import axios from 'axios'
import FIREBASE from '../../config/firebase'

const ExploreView = (props) => {
    const mountedRed = useRef(true)
    const [history, setHistory] = useState(null)
    const [historyKey, setHistoryKey] = useState([])

    useEffect( ()=> {
        // FIREBASE.database()
        // .ref()
        // try{
        //     const response = await axios.get('http://192.168.100.7:1337/lapors')
        //     setHistory(response.data)                
        // }catch(error){
        //     console.log(error)
        // }

        // return () => {
        //     mountedRef.current = false
        // }

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
        
    })
    
    return (
        <View>
            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                <View style={{ flex: 2 }}>
                    <Image style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} source={props.imageUrl} />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text>{props.nama_pelapor}</Text>
                </View>
            </View>                                    
        </View>
    )
}

export default ExploreView

const styles = StyleSheet.create({})
