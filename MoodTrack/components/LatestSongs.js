import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import firebase from '../firebase/firebase.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { useFonts } from 'expo-font';
import Slider from '@react-native-community/slider';
import { Button, DataTable } from 'react-native-paper';
import { Audio } from 'expo-av';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


// import Light from '../assets/RobotoSlab_Light.ttf';

export default function LatestSongs({ token, setToken, setUserId, userId, userName }) {

    const [playlistId, setPlaylistId] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [latestSongs, setLatestSongs] = useState([]);


    const navigation = useNavigation();

    const logout = () => {
        setToken("");
        navigation.navigate('Login');    

    }

    const createPlaylist = async () => {
    
        const data = {
          name: "MoodTracks",
          public: false
        }
      
    
      const config = {
        headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
         }
     };

     const res = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, JSON.stringify(data), config);
    //  console.log(res.data);
     const playlistId = res.data.id;
     setPlaylistId(res.data.id)
    //  console.log(playlistId);


     let songs = [];
     for (let track of latestSongs) {
      songs.push(track.uri);
     }

    //  setSongIds(songs);
     console.log(songs);


    const data2 = {
      uris: songs
    }

    const res2 = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, data2, config);
    console.log(res2.data);
    setConfirmation("Playlist created - listen on Spotify!")
  
    }

    const getLatestSongs = () => {
      const ref = firebase.firestore().collection("LatestSongs");

      try {
        ref.where("user", "==", userId).onSnapshot((querySnapshot) => { 
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            })
            for (let track of items) {
              track.date = new Date(track.date).toISOString();
            }
            console.log(items);
            // orderBy("date", "desc") NOT WORKING
            items.sort((a, b) => a.date > b.date ? -1 : 1);
            console.log(items);
            // loops through and set strings to dates
            if (items.length <= 100) {
              setLatestSongs(items); 
            } else {
              let diff = items.length - 100;
              setLatestSongs(items.slice(0, diff));
            }
            console.log(latestSongs);
          
        })

        if (LatestSongs.empty) {
                console.log("no matches");
                // setLoading(false);
            }
     } catch (error) {
            console.log(error.message)
    }
    }

    useEffect(() => {
      getLatestSongs();
    }, [])
    
    


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
                    {userName ? <Text style={styles.moodText}>Latest MoodTracks for {userName}</Text> : null}
                    {/* <ScrollView> */}
                        {latestSongs ? (latestSongs.slice(0, 3).map((track) => (
                          <View key={track.id} style={{display: 'flex', flexDirection: 'row', margin: 10}}>
                            <Image style={{height: 50, width: 50, marginRight: 5}} source={{uri: track.image}} />
                            <Text style={styles.secondaryText}>{track.track_name}{"\n"}{track.artists}</Text>
                            </View>
                    ))) : <Text style={styles.secondaryText}>No songs recommended yet!</Text>}
                    {/* </ScrollView> */}
                    <Button icon="headphones" style={{marginTop: 25, marginBottom: 10}} size={20} labelStyle={{fontFamily: 'RobotoSlabReg', fontSize: 12}} uppercase={false} color="#8C52FF" mode="contained" onPress={(e) => createPlaylist(e)} >
                        Create Spotify Playlist
                    </Button>
                    <Text style={styles.confirmationText}>{confirmation}</Text>
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
  confirmationText: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'RobotoSlabReg',
    textAlign: 'center',
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
