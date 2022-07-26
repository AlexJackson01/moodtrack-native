import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { fromLeft } from 'react-navigation-transitions';
import LandingPage from './components/LandingPage';
import FindTracks from './components/FindTracks';
import LatestSongs from './components/LatestSongs';

const Stack = createStackNavigator();


export default function App({ navigation }) {

  const [token, setToken] = useState("");
  const [trackList, setTrackList] = useState([]);
  const [songRecommendation, setSongRecommendation] = useState([]);
  const [latestSongs, setLatestSongs] = useState([]);


  // options={{headerShown: false}}

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName='Login'>

            <Stack.Screen name='Login' options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}>
            {(props) => <LandingPage {...props} token={token} setToken={setToken} setTrackList={setTrackList} />}
            </Stack.Screen> 

            <Stack.Screen name='Tracks' options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}>
            {(props) => <FindTracks {...props} token={token} setToken={setToken} latestSongs={latestSongs} setLatestSongs={setLatestSongs} songRecommendation={songRecommendation} setSongRecommendation={setSongRecommendation} />}
          </Stack.Screen>
          
          <Stack.Screen name='Latest' options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}>
            {(props) => <LatestSongs {...props} token={token} setToken={setToken} latestSongs={latestSongs} />}
          </Stack.Screen>
        </Stack.Navigator> 
      </PaperProvider>  
    </NavigationContainer>
  );
}
