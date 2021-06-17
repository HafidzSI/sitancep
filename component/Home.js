import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from '../component/Carousel/Carousel'
import { dummyData } from '../data/Data'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeMenu: 'Home',

      menuList: [
        {
          menuName: 'Lapor Cepat',
          route: 'lapor_cepat',
          category: 'Tambal Jalan', 
          subText: 'Laporkan jalan rusak langsung ditempat',
          backgroundColor: '#ffd336',
          icon: 'map-pin',
          progress: '80%'
        },
        {
          menuName: 'Lapor', 
          route: 'lapor',
          category: 'Tambal Jalan', 
          subText: 'Laporkan jalan rusak yang pernah ditemui',
          backgroundColor: '#60a5f0',
          icon: 'bullhorn',
          progress: '80%'
        },
        {
          menuName: 'History', 
          route: 'history',
          category: 'Tambal Jalan', 
          subText: 'Riwayat pelaporan jalan rusak',
          backgroundColor: '#9172f7',
          icon: 'history',
          progress: '80%'
        },
        {
          menuName: 'History Lain', 
          route: 'history2',
          category: 'Tambal Jalan', 
          subText: 'Data laporan jalan rusak',
          backgroundColor: '#008000',
          icon: 'history',
          progress: '80%'
        }
      ]
    };
  }

  render() {
    return (
      <View style={{ flex:1, backgroundColor: '#414865' }}>
        <StatusBar backgroundColor="#414865" barStyle="light-content"></StatusBar>
        <View style={{ margin: 20 }}>
          <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold' }}>
            Sitancep
          </Text>
        </View>

        <View style={{ flex: 1, backgroundColor: '#fcfffd'}}>
            <Carousel data = {dummyData} />

            <FlatGrid
            style={{ flex: 1 }}
            itemDimension={250}
            data={this.state.menuList}
            renderItem={({item}) => (
              <TouchableOpacity onPress={ () => { this.props.navigation.navigate(item.route) } } style={{ backgroundColor: item.backgroundColor, borderTopRightRadius: 25, borderBottomLeftRadius: 25, borderTopLeftRadius: 5, borderBottomRightRadius: 5, elevation: 3, padding: 20, }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50, paddingHorizontal: 10, width: 130, paddingVertical: 5, marginBottom: 20 }}>
                  <Text style={{ color: '#ffffff', textAlign: 'center' }}>{item.category}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, }}>
                    <Text style={{ color: '#ffffff', fontSize: 22 }}>{item.menuName}</Text>
                    <Text style={{ color: 'white' }}>{item.subText}</Text>
                  </View>

                  <View>
                    <Icon name={item.icon} size={50} color="#73bfff" />
                  </View>              
                </View>

              </TouchableOpacity>
            )}
            />
        </View>
      </View>
    )
  }
}

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

export default Home;
