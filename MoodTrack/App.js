import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import LandingPage from './components/LandingPage';
import FindTracks from './components/FindTracks';

const Stack = createNativeStackNavigator();

export default function App() {

  const [token, setToken] = useState("");
  const [trackList, setTrackList] = useState([]);

  // options={{headerShown: false}}

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login'>
          {(props) => <LandingPage {...props} token={token} setToken={setToken} setTrackList={setTrackList} />}
        </Stack.Screen>        
        <Stack.Screen name='Tracks'>
          {(props) => <FindTracks {...props} token={token} setToken={setToken} />}
        </Stack.Screen>
      </Stack.Navigator>   
    </NavigationContainer>
  );
}
