import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import firebase from '../firebase/firebase.js';
import { db } from '../firebase/firebase.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { useFonts } from 'expo-font';
import Slider from '@react-native-community/slider';
import { Button } from 'react-native-paper';
import { Audio } from 'expo-av';
import {useNavigation} from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';
import moment from 'moment';


export default function FindTracks({ token, setToken, setUserId, userId, setUserName, setSongPreview, setSongRecommendation, songRecommendation }) {

    const [showTrack, setShowTrack] = useState(false);
    const [dance, setDance] = useState(0.0);
    const [energy, setEnergy] = useState(0.0);
    const [valence, setValence] = useState(0.0);
    const [trackList, setTrackList] = useState([null]);
    // const [songRecommendation, setSongRecommendation] = useState([]);
    // const [songPreview, setSongPreview] = useState(null);

    const navigation = useNavigation();


    const logout = () => {
        setToken("");
        navigation.navigate('Login');    
      }

    const getRandomSearch = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        let randomSearch = '%' + randomCharacter + '%';
        return randomSearch;
    }

    const getRandomOffset = () => {
        const randomOffset = Math.floor(Math.random() * 1000);
        return randomOffset;
    }

    let tracks = [];
    let features = [];

    const findTracks = async () => {

      getUser();

            const res = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                  Authorization: `Bearer ${token}`
                },
                params: {
                  type: "track",
                  q: getRandomSearch(),
                  limit: 50,
                  offset: getRandomOffset()
                }
              })
            
              const data = res.data.tracks.items;      
            
              for (let track of data) {
                tracks.push({
                  id: track.id,
                  track_name: track.name,
                  artists: track.artists[0].name,
                  preview: track.preview_url,
                  uri: track.uri,
                  external: track.external_urls.spotify,
                  image: track.album.images[1].url,
                })
              }
    
        // call audio features for random tracks
        for (let track of tracks) {
          const res2 = await axios.get(`https://api.spotify.com/v1/audio-features/${track.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          features.push(res2.data);
        }
      
        let combined = tracks.map((item, i) => Object.assign({}, item, features[i])); // the results from search 1 and 2 are joined together
        setTrackList(combined);

    }

    const findRecommendation = (e) => {
        e.preventDefault();
    
        const filtered = trackList.filter(function(track) {
            return (track.danceability >= dance - 0.3 && track.danceability <= dance + 0.3)
            && (track.energy >= energy - 0.3 && track.energy <= energy + 0.3)
            && (track.valence >= valence - 0.3 && track.valence <= valence + 0.3)
        })
        
        setSongRecommendation(filtered[0]);
        setSongPreview(filtered[0].preview);
        addLatestSong(filtered);
        addMood(filtered);

        navigation.navigate('Music', { screen: 'Track' });    
    }

    const getDate = () => {
      let formatDate = moment().format("D MMM YYYY");
      return formatDate; 
    }

    const addLatestSong = (filtered) => {

      const ref = firebase.firestore().collection("LatestSongs"); // connects to Firebase database with the collection 'favourites'

      const docData = {
        user: userId,
        id: filtered[0].id,
        track_name: filtered[0].track_name,
        artists: filtered[0].artists,
        preview: filtered[0].preview,
        uri: filtered[0].uri,
        external: filtered[0].external,
        image: filtered[0].image,
        date: getDate()
      }

      ref
      .doc(docData.id)
      .set(docData)
      .catch((error) => {
        alert(error.message);
      })
    }

    const addMood = (filtered) => {

      const ref = firebase.firestore().collection("Moods"); // connects to Firebase database with the collection 'favourites'

      const docData = {
        user: userId,
        id: filtered[0].id,
        dance: dance,
        energy: energy,
        valence: valence,
        date: getDate()
      }

      ref
      .doc(docData.id)
      .set(docData)
      .catch((error) => {
        alert(error.message);
      })
    }

    const getUser = async () => {

      const res = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(res.data);
      setUserId(res.data.id);
      setUserName(res.data.display_name);
      // console.log(user);
  }


    useEffect(() => {
            findTracks();
    }, [])   

    const [loaded] = useFonts({
        RobotoSlabLight: require('../assets/fonts/RobotoSlab-Light.ttf'),
        RobotoSlabReg: require('../assets/fonts/RobotoSlab-Regular.ttf')
    });

    if (!loaded) {
        return null;
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
                {!showTrack && trackList.length >= 1 && (
                    <View style={styles.centreContent}>
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
                        onValueChange={value => setDance(value / 10)}
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
                        onValueChange={value => setEnergy(value / 10)}
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
                        onValueChange={value => setValence(value / 10)}
                    />
                    <Emoji name="grin" style={{fontSize: 30}} />
                    </View>

                    <Button icon="music" style={{marginTop: 50}} labelStyle={{fontFamily: 'RobotoSlabReg', fontSize: 12}} uppercase={false} color="#8C52FF" mode="contained" onPress={(e) => findRecommendation(e)} >
                        Get Today's MoodTrack
                    </Button>
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
