import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
// import AppLoading from 'expo';
import { useFonts, RobotoSlab_300Light, RobotoSlab_400Regular } from '../node_modules/@expo-google-fonts/roboto-slab';

export default function LandingPage() {

  let [fontsLoaded] = useFonts({
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
  });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{flex:1}}>
        <View style={styles.body}>
          <View style={styles.container}>
            <Image style={styles.moodtrackLogo} source={require('../images/MoodTrack_logo.png')} />
            <Text style={styles.titleText}>Take time to reflect and discover tracks to fit any mood</Text>
            <Image style={styles.brainIcon} source={require('../images/musicbrain.png')} />
            <Text style={styles.secondaryText}>Login with:</Text>
            <Image style={styles.spotifyLogo} source={require('../images/Spotify_Logo.png')} />

            <StatusBar style="auto" />
          </View>
        </View>
      </ScrollView>
    </View>


  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'linear-gradient(rgba(126,113,245,1), rgba(159,106,214,1))',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    margin: 40,
    flex: 1,
    backgroundColor: '#FFFCEF',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    boxShadow: '1px 1px 0px #C7D0D8, 2px 2px 0px #C7D0D8, 3px 3px 0px #C7D0D8, 4px 4px 0px #C7D0D8, 5px 5px 0px #C7D0D8, 6px 6px 0px #C7D0D8, 7px 7px 0px #C7D0D8',
  },
  titleText: {
    padding: 20,
    textAlign: 'center',
    fontSize: 18,
    // fontFamily: 'RobotoSlab_300Light'
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
    marginTop: 20
  },
  spotifyLogo: {
    height: 40,
    width: 130,
    marginTop: 10
  }
});
