import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
// import Light from '../assets/RobotoSlab_Light.ttf';

export default function LandingPage() {

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

const CLIENT_ID = '32724f1f215c486993fb9e886fdce8e1';
const REDIRECT_URI = 'http://localhost:19002';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

  return (
    <LinearGradient colors={['#7e71f5', '#9f6ad6']} style={styles.body}>
    <View style={{ flex: 1 }}>
        <View style={styles.body}>
          <View style={styles.container}>
            <Image style={styles.moodtrackLogo} source={require('../images/MoodTrack_logo.png')} />
            <Text style={styles.titleText}>Take time to reflect and discover tracks to fit any mood</Text>
            <Image style={styles.brainIcon} source={require('../images/musicbrain.png')} />
            <Text style={styles.secondaryText}>Login with:</Text>
            <TouchableOpacity onPress={() => Linking.openURL('http://google.com')}>
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
