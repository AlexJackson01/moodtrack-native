import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { useFonts } from 'expo-font';
import Slider from '@react-native-community/slider';
import { Button } from 'react-native-paper';


// import Light from '../assets/RobotoSlab_Light.ttf';

export default function FindTracks({ navigation, token, setToken }) {

    const [showTrack, setShowTrack] = useState(false);
    const [dance, setDance] = useState("");
    const [energy, setEnergy] = useState("");
    const [valence, setValence] = useState("");


    const [loaded] = useFonts({
        RobotoSlabLight: require('../assets/fonts/RobotoSlab-Light.ttf'),
        RobotoSlabReg: require('../assets/fonts/RobotoSlab-Regular.ttf')
    });

    if (!loaded) {
        return null;
    }

    const logout = () => {
        setToken("");
        // navigation.navigate('Login');
    }



  return (
    <LinearGradient colors={['#7e71f5', '#9f6ad6']} style={styles.body}>
            <Image style={styles.moodtrackLogoSmall} source={require('../images/MoodTrack_logo.png')} />
            <View style={{position: 'absolute', top: 5, right: 5}}>
                <TouchableOpacity onPress={() => logout()}>
                    <Button color="white" uppercase={false} style={{color: 'white'}}>Logout</Button>
                </TouchableOpacity>
                </View>
              <View style={styles.container}>
                {!showTrack && (
                    <View style={styles.centreContent}>
                        {/* <Text>{token}</Text> */}
                    <Text style={styles.moodText}>How are you feeling today?</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Emoji name="video_game" style={{fontSize: 30}} />
                    <Slider
                        style={{width: 220, height: 40, marginBottom: 20}}
                        minimumValue={0}
                        maximumValue={10}
                        step={1}
                        minimumTrackTintColor="#7E71F5"
                        thumbTintColor="#7E71F5"
                        maximumTrackTintColor="#000000"
                        onValueChange={value => setDance(value)}
                    />
                    <Emoji name="dancer" style={{fontSize: 30}} />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Emoji name="bed" style={{fontSize: 30}} />
                    <Slider
                        style={{width: 220, height: 40, marginBottom: 20}}
                        minimumValue={0}
                        maximumValue={10}
                        step={1}
                        minimumTrackTintColor="#7E71F5"
                        thumbTintColor="#7E71F5"
                        maximumTrackTintColor="#000000"
                        onValueChange={value => setEnergy(value)}
                    />
                    <Emoji name="swimmer" style={{fontSize: 30}} />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Emoji name="pensive" style={{fontSize: 30}} />
                    <Slider
                        style={{width: 220, height: 40, marginBottom: 20}}
                        minimumValue={0}
                        maximumValue={10}
                        step={1}
                        minimumTrackTintColor="#7E71F5"
                        thumbTintColor="#7E71F5"
                        maximumTrackTintColor="#000000"
                        onValueChange={value => setValence(value)}
                    />
                    <Emoji name="grin" style={{fontSize: 30}} />
                    </View>

                    <Button icon="music" style={{marginTop: 50}} labelStyle={{fontFamily: 'RobotoSlabReg', fontSize: 12}} uppercase={false} color="#8C52FF" mode="contained" onPress={() => setShowTrack(true)} >
                        Get Today's MoodTrack
                    </Button>
                    </View>
                )}


                {showTrack && (
                    <View style={styles.centreContent}>
                    <Text style={styles.moodText}>MoodTrack of the day</Text>
                    <Image style={{height: 150, width: 150}} source={{uri: 'https://i.scdn.co/image/ab67616d00001e024d1a7a3e5043173883653ffc'}} />
                    <Text style={styles.trackText}>Sweet Caroline by Neil Diamond</Text>
                    <Text style={styles.trackText}>Spotify Player here</Text>
                    <Text style={styles.secondaryText}>Listen on</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Image style={styles.spotifyLogo} source={require('../images/Spotify_Logo.png')} />
                    </TouchableOpacity>
                    </View>
                )}

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
    fontSize: 15,
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
    marginTop: 20,
    fontFamily: 'RobotoSlabReg'
  },
  spotifyLogo: {
    height: 40,
    width: 130,
    marginTop: 10
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
