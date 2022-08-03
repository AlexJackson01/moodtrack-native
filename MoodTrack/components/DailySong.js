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
import {useNavigation} from '@react-navigation/native';

// import Light from '../assets/RobotoSlab_Light.ttf';

export default function DailySong({ token, setToken, latestSongs, songRecommendation, songPreview }) {

    const [user, setUser] = useState("");
    const [playing, setPlaying] = useState(false);


    const navigation = useNavigation();

    const logout = () => {
        setToken("");
        navigation.navigate('Login');    

    }

    const playPreview = async () => {
        setPlaying(true);        

        try {
            const playbackObject = await Audio.Sound.createAsync(
                { uri: songPreview },
                { shouldPlay: true }
              );
              playbackObject.playAsync();   
        } catch (error) {
            console.log(error)
        }

    }

    const createPlaylist = () => {

    }
   


  return (
    <LinearGradient colors={['#7e71f5', '#9f6ad6']} style={styles.body}>
        <Image style={styles.moodtrackLogoSmall} source={require('../images/MoodTrack_logo.png')} />
            <View style={{position: 'absolute', top: 35, right: 5}}>
                <TouchableOpacity onPress={() => logout()}>
                    <Button color="white" uppercase={false} style={{color: 'white'}}>Logout</Button>
                </TouchableOpacity>
                </View>
            <View style={styles.container}>
                    <View style={styles.centreContent}>
                    <Text style={styles.moodText}>MoodTrack of the day</Text>
                    <Image style={{height: 150, width: 150}} source={{uri: songRecommendation.image}} />
                    <Text style={styles.trackText}>{songRecommendation.track_name} by {songRecommendation.artists}</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                    {songPreview !== null && (
                        <TouchableOpacity onPress={() => playPreview()}>
                            <Button icon="play" style={{marginLeft: 17}} labelStyle={{fontSize: 40}} color="#8C52FF" />
                        </TouchableOpacity>
                    )}
                    </View>
                    <Text style={styles.secondaryText}>Listen in full on</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(songRecommendation.external)}>
                        <Image style={styles.spotifyLogo} source={require('../images/Spotify_Logo.png')} />
                    </TouchableOpacity>
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
    fontFamily: 'RobotoSlabReg',
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
