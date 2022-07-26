import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, AppState } from 'react-native';
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { ResponseType, useAuthRequest, makeRedirectUri } from 'expo-auth-session';
// import { AuthSession } from 'expo';
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
// import Light from '../assets/RobotoSlab_Light.ttf';

const discovery = {
    authorizationEndpoint: 
    "https://accounts.spotify.com/authorize",
    tokenEndpoint: 
    "https://accounts.spotify.com/api/token",
  };


export default function LandingPage({ navigation, setToken, token }) {

      const [request, response, promptAsync] = 
      useAuthRequest(
        {
          responseType: ResponseType.Token,
          clientId: "32724f1f215c486993fb9e886fdce8e1",
          scopes: [ 
            "user-read-playback-state",
            "user-modify-playback-state",
            "streaming",
            "user-read-email",
            "user-read-private",
            "user-library-read",
            "user-library-modify"
          ],
          // In order to follow the "Authorization Code Flow" 
          // to fetch token after authorizationEndpoint
          // this must be set to false
          usePKCE: false,
          redirectUri: "exp://192.168.1.90:19000/",
        },
        discovery
      );


      useEffect(() => {
        if (response?.type === "success") {
          const { access_token } = response.params;
          setToken(access_token);
          navigation.navigate('Tracks');
        }

        const emitter = new EventEmitter();

        const subscription = emitter.addListener('eventname', () => {});
        
        subscription.remove(); 
        

      }, [response]);


    const [loaded] = useFonts({
        RobotoSlabLight: require('../assets/fonts/RobotoSlab-Light.ttf'),
        RobotoSlabReg: require('../assets/fonts/RobotoSlab-Regular.ttf')
    });

    if (!loaded) {
        return null;
    }



//   useEffect(() => {

//     getToken();
  
//   }, [])

// const getToken = () => {
// let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
// let token = urlParams.get("access_token");
// window.localStorage.setItem("token", token);
// setToken(token);
// }

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

  return (
    <LinearGradient colors={['#7e71f5', '#9f6ad6']} style={styles.body}>
    <View style={{ flex: 1 }}>
        <View style={styles.body}>
          <View style={styles.container}>
            <Image style={styles.moodtrackLogo} source={require('../images/MoodTrack_logo.png')} />
            <Text style={styles.titleText}>Take time to reflect and discover tracks to fit any mood</Text>
            <Image style={styles.brainIcon} source={require('../images/musicbrain.png')} />
            <Text style={styles.secondaryText}>Login with:</Text>
            <TouchableOpacity onPress={() => {promptAsync();}}>
                <Image style={styles.spotifyLogo} source={require('../images/Spotify_Logo.png')} />
            </TouchableOpacity>
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
  titleText: {
    padding: 15,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'RobotoSlabLight'
  },
  moodtrackLogo: {
    height: 180,
    width: 180,
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
