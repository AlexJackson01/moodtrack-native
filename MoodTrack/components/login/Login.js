import { useEffect, useState } from 'react'
import { useToken } from '../../context/TokenContext'
import * as WebBrowser from 'expo-web-browser'

import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler
} from 'react-native'
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter'
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri
} from 'expo-auth-session'

import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'

WebBrowser.maybeCompleteAuthSession()

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token'
}

export default function Login () {
  const navigation = useNavigation()

  const [token, setToken] = useToken()

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '32724f1f215c486993fb9e886fdce8e1',
      scopes: [
        'user-read-playback-state',
        'user-modify-playback-state',
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-library-read',
        'user-library-modify',
        'playlist-modify-private',
        'playlist-modify-public'
      ],
      // In order to follow the "Authorization Code Flow"
      // to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: 'http://localhost:19006/'
    },
    discovery
  )

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params
      setToken(access_token)
      console.log(token)
      setTimeout(() => navigation.navigate('Find', { token: access_token }), 20)
    }
  }, [response])

  const [loaded] = useFonts({
    RobotoSlabLight: require('../../assets/fonts/RobotoSlab-Light.ttf'),
    RobotoSlabReg: require('../../assets/fonts/RobotoSlab-Regular.ttf')
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.body}>
      <Image
        style={styles.moodtrackLogo}
        source={require('../../assets/images/MoodTrack_logo.png')}
      />
      <Text style={styles.titleText}>
        Take time to reflect and discover tracks to fit any mood
      </Text>
      <Image
        style={styles.brainIcon}
        source={require('../../assets/images/musicbrain.png')}
      />
      <Text style={styles.secondaryText}>Login with:</Text>
      <TouchableOpacity
        onPress={() => {
          promptAsync()
        }}
      >
        <Image
          style={styles.spotifyLogo}
          source={require('../../assets/images/Spotify_Logo.png')}
        />
      </TouchableOpacity>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // backgroundColor: 'linear-gradient(45deg, rgba(179,245,113,1), rgba(159,106,214,1))',
    alignItems: 'center',
    justifyContent: 'center'
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
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 8
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
})
