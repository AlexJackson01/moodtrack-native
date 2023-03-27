import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider as PaperProvider } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Login from './components/login/Login'
import FindTracks from './components/FindTracks'
import LatestSongs from './components/LatestSongs'
import DailySong from './components/DailySong'
import Moods from './components/Moods'
import Resources from './components/Resources'
import LoginPage from './screens/LoginPage'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function App ({ navigation }) {
  const [token, setToken] = useState('')
  const [trackList, setTrackList] = useState([])
  const [songRecommendation, setSongRecommendation] = useState([])
  const [songPreview, setSongPreview] = useState(null)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')

  function NavTabs () {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Track') {
              iconName = focused ? 'search' : 'search-outline'
            } else if (route.name === 'Latest') {
              iconName = focused ? 'musical-notes' : 'musical-notes-outline'
            } else if (route.name === 'Resources') {
              iconName = focused ? 'folder-sharp' : 'folder-outline'
            } else if (route.name === 'Moods') {
              iconName = focused ? 'bar-chart-sharp' : 'bar-chart-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#8C52FF',
          tabBarInactiveTintColor: 'gray'
        })}
      >
        <Tab.Screen
          name='Track'
          options={{ headerShown: false }}
          children={() => (
            <DailySong
              token={token}
              setToken={setToken}
              setTrackList={setTrackList}
              songRecommendation={songRecommendation}
              songPreview={songPreview}
            />
          )}
        />
        <Tab.Screen
          name='Latest'
          options={{ headerShown: false }}
          children={() => (
            <LatestSongs
              token={token}
              setToken={setToken}
              setUserId={setUserId}
              userId={userId}
              setUserName={setUserName}
              userName={userName}
            />
          )}
        />
        <Tab.Screen
          name='Moods'
          options={{ headerShown: false }}
          children={() => (
            <Moods
              token={token}
              setToken={setToken}
              userId={userId}
              userName={userName}
            />
          )}
        />
        <Tab.Screen
          name='Resources'
          options={{ headerShown: false }}
          children={() => <Resources token={token} setToken={setToken} />}
        />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Login'
            options={{
              headerShown: false,
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid
            }}
          >
            {props => (
              <LoginPage
                {...props}
                token={token}
                setToken={setToken}
                setTrackList={setTrackList}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name='Find'
            options={{
              headerShown: false,
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid
            }}
          >
            {props => (
              <FindTracks
                {...props}
                token={token}
                setToken={setToken}
                songRecommendation={songRecommendation}
                setSongRecommendation={setSongRecommendation}
                setSongPreview={setSongPreview}
                userId={userId}
                setUserId={setUserId}
                setUserName={setUserName}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name='Music'
            options={{ headerShown: false }}
            component={NavTabs}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
}
