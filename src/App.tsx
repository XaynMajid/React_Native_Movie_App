import React from 'react';
import { StyleSheet, View,StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CharacterScreen from './screens/CharacterScreen';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Search from './screens/Search';

const Stack = createNativeStackNavigator()
const App = () => {
  
  return (
    <NavigationContainer  >
      <StatusBar  backgroundColor={"#202C3C"} />
     <Stack.Navigator initialRouteName='home'>
      <Stack.Screen name='home' component={HomeScreen} options={{headerShown:false}} />
      <Stack.Screen name='Movies' component={MovieScreen} options={{headerShown:false}} />
      <Stack.Screen name='Character' component={CharacterScreen} options={{headerShown:false}} />
      <Stack.Screen name="Search" component={Search} options={{headerShown:false}} />
     </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({})

export default App;
