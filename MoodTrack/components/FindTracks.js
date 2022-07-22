import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import Slider from '@react-native-community/slider';
import { Button } from 'react-native-paper';


// import Light from '../assets/RobotoSlab_Light.ttf';

export default function FindTracks() {

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



  return (
    <LinearGradient colors={['#7e71f5', '#9f6ad6']} style={styles.body}>
    <View style={{ flex: 1 }}>
        <View style={styles.body}>
        <Image style={styles.moodtrackLogoSmall} source={require('../images/MoodTrack_logo.png')} />
          <View style={styles.container}>
            <Text style={styles.titleText}>How are you feeling today?</Text>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={10}
                    step={1}
                    minimumTrackTintColor="#7E71F5"
                    thumbTintColor="#7E71F5"
                    maximumTrackTintColor="#000000"
                    onValueChange={value => setDance(value)}
                />
            <Text style={styles.secondaryText}>{valence}</Text>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={10}
                    step={1}
                    minimumTrackTintColor="#7E71F5"
                    thumbTintColor="#7E71F5"
                    maximumTrackTintColor="#000000"
                    onValueChange={value => setEnergy(value)}
                />
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={10}
                    step={1}
                    minimumTrackTintColor="#7E71F5"
                    thumbTintColor="#7E71F5"
                    maximumTrackTintColor="#000000"
                    onValueChange={value => setValence(value)}
                />
                <Button icon="music" style={{marginTop: 50}} labelStyle={{fontSize: 12}} uppercase={false} color="#8C52FF" mode="contained" onPress={() => console.log('Pressed')}>
                    Get Today's MoodTrack
                </Button>
            <StatusBar style="auto" />
          </View>
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
    marginTop: 100,
    marginBottom: 100,
    width: '98%',
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
  titleText: {
    padding: 15,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'RobotoSlabLight'
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
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'RobotoSlabReg'
  },
  spotifyLogo: {
    height: 40,
    width: 130,
    marginTop: 10
  }
});
