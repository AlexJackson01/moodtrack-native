import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './components/Login';
import FindTracks from './components/FindTracks';
import LatestSongs from './components/LatestSongs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();




export default function App({ navigation }) {

  const [token, setToken] = useState("");
  const [trackList, setTrackList] = useState([]);
  const [songRecommendation, setSongRecommendation] = useState([]);
  const [latestSongs, setLatestSongs] = useState([]);


  function NavTabs() {
    return (
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Find') {
            iconName = focused
              ? 'search'
              : 'search-outline';
          } else if (route.name === 'Latest') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';   
          } else if (route.name === 'About') {
            iconName = focused ? 'mail-sharp' : 'mail-outline';   
          } else if (route.name === 'Moods') {
            iconName = focused ? 'bar-chart-sharp' : 'bar-chart-outline';   
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8C52FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
        <Tab.Screen name='Find' options={{headerShown: false}} children={()=><FindTracks token={token} setToken={setToken} latestSongs={latestSongs} setLatestSongs={setLatestSongs} songRecommendation={songRecommendation} setSongRecommendation={setSongRecommendation}/>} />
        <Tab.Screen name='Latest' options={{headerShown: false}} children={()=><LatestSongs token={token} setToken={setToken} latestSongs={latestSongs}/>} />
        <Tab.Screen name='Moods' options={{headerShown: false}} children={()=><LatestSongs token={token} setToken={setToken} latestSongs={latestSongs}/>} />
        <Tab.Screen name='About' options={{headerShown: false}} children={()=><LatestSongs token={token} setToken={setToken} latestSongs={latestSongs}/>} />
      </Tab.Navigator>
    );

}


  // options={{headerShown: false}}

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName='Login'>

            <Stack.Screen name='Login' options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}>
            {(props) => <Login {...props} token={token} setToken={setToken} setTrackList={setTrackList} />}
            </Stack.Screen>

            <Stack.Screen name='Tracks' headerTitleStyle={{fontFamily: 'RobotoSlabReg'}} options={{title: 'MoodTrack of the Day', cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}>
            {(props) => <LatestSongs {...props} token={token} setToken={setToken} setTrackList={setTrackList} />}
            </Stack.Screen>

            <Stack.Screen name='Find' options={{headerShown: false}} component={NavTabs}/>

            {/* <Stack.Screen name='NavTabs' options={{headerShown: false}} component={NavTabs}/> */}

            {/* <Stack.Screen name='Tracks' options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}>
            {(props) => <FindTracks {...props} token={token} setToken={setToken} latestSongs={latestSongs} setLatestSongs={setLatestSongs} songRecommendation={songRecommendation} setSongRecommendation={setSongRecommendation} />}
          </Stack.Screen>
          
          <Stack.Screen name='Latest' options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}>
            {(props) => <LatestSongs {...props} token={token} setToken={setToken} latestSongs={latestSongs} />}
          </Stack.Screen> */}
        </Stack.Navigator> 

        {/* <Tab.Navigator>
          <Tab.Screen name="Tracks" component={FindTracks} />
          <Tab.Screen name="Latest" component={LatestSongs} />
        </Tab.Navigator> */}
      </PaperProvider>  
    </NavigationContainer>
  );
}
