import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import LandingPage from './components/LandingPage';


export default function App() {

  const [token, setToken] = useState("");
  const [trackList, setTrackList] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <LandingPage />
    </View>


  );
}
