import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { fromLeft } from 'react-navigation-transitions';
import LandingPage from './components/LandingPage';
import FindTracks from './components/FindTracks';

const Stack = createStackNavigator();


export default function App({ navigation }) {

  const [token, setToken] = useState("");
  const [trackList, setTrackList] = useState([]);

  // options={{headerShown: false}}

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}>
            {(props) => <LandingPage {...props} token={token} setToken={setToken} setTrackList={setTrackList} />}
          </Stack.Screen>        
          <Stack.Screen name='Tracks' options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}>
            {(props) => <FindTracks {...props} token={token} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator> 
      </PaperProvider>  
    </NavigationContainer>
  );
}
