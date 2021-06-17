import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity, StyleSheet} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './routes/rootStack';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    )
  }
}

export default App;
