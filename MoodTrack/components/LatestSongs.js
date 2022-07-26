import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { useFonts } from 'expo-font';
import Slider from '@react-native-community/slider';
import { Button } from 'react-native-paper';
import { Audio } from 'expo-av';

// import Light from '../assets/RobotoSlab_Light.ttf';

export default function LatestSongs({ navigation, token, setToken, latestSongs }) {

    const [user, setUser] = useState("");

    const logout = () => {
        setToken("");
        navigation.navigate('Login');
    }

    const getUser = async () => {

        const res = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(res.data.display_name);
    }

    useEffect(() => {
        getUser();
    }, [])
    


  return (
    <LinearGradient colors={['#7e71f5', '#9f6ad6']} style={styles.body}>
        <Image style={styles.moodtrackLogoSmall} source={require('../images/MoodTrack_logo.png')} />
            <View style={{position: 'absolute', top: 5, right: 5}}>
                <TouchableOpacity onPress={() => logout()}>
                    <Button color="white" uppercase={false} style={{color: 'white'}}>Logout</Button>
                </TouchableOpacity>
                </View>
            <View style={styles.container}>
            <View style={{position: 'absolute', top: 5, right: 5}}>
                <TouchableOpacity onPress={() => logout()}>
                    <Button color="white" uppercase={false} style={{color: 'white'}}>Logout</Button>
                </TouchableOpacity>
                </View>
                <View style={styles.centreContent}>
                    {user ? <Text style={styles.moodText}>Latest MoodTracks for {user}</Text> : null}
                        {latestSongs.length >= 1 ? (latestSongs.map((song, i) => (
                            <Text style={styles.moodText}>Hello, [{song.artists}]</Text>
                    ))) : <Text style={styles.secondaryText}>No songs recommended yet!</Text>}
                    </View>
                </View>
                </LinearGradient>   
              


  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // backgroundColor: 'linear-gradient(45deg, rgba(179,245,113,1), rgba(159,106,214,1))',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    margin: 40,
    flex: 1,
    backgroundColor: '#FFFCEF',
    marginTop: 90,
    // marginBottom: 100,
    height: 500,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 10,
    elevation: 8,
    // boxShadow: '1px 1px 0px #C7D0D8, 2px 2px 0px #C7D0D8, 3px 3px 0px #C7D0D8, 4px 4px 0px #C7D0D8, 5px 5px 0px #C7D0D8, 6px 6px 0px #C7D0D8, 7px 7px 0px #C7D0D8',
  },
  centreContent: {
    margin: 40,
    flex: 1,
    alignItems: 'center',
  },
  moodText: {
    padding: 15,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'RobotoSlabLight'
  },
  trackText: {
    // padding: 15,
    // marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'RobotoSlabReg'
  },
  moodtrackLogoSmall: {
    height: 120,
    width: 120,
    marginTop: 20,
    marginBottom: -60,
    padding: 50
  },
  brainIcon: {
    height: 50,
    width: 50
  },
  secondaryText: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'RobotoSlabReg'
  },
  spotifyLogo: {
    height: 40,
    width: 130,
    marginTop: 10,
    marginBottom: 20
  },
  logout: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'RobotoSlabReg',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 20,
    border: 'none',
    marginBottom: -300
  }
});
