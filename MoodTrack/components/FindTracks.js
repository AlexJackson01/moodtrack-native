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

export default function FindTracks({ navigation, token, setToken, setLatestSongs, latestSongs }) {

    const [showTrack, setShowTrack] = useState(false);
    const [dance, setDance] = useState(0.0);
    const [energy, setEnergy] = useState(0.0);
    const [valence, setValence] = useState(0.0);
    const [trackList, setTrackList] = useState([null]);
    const [songRecommendation, setSongRecommendation] = useState([]);
    const [songPreview, setSongPreview] = useState(null);
    const [playing, setPlaying] = useState(false);



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
    let songList = [];

    const findTracks = async () => {
        // window.location.reload();

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
              // console.log(data);
      
            
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
        // generate random tracks


        // console.log(tracks);
    
        // call audio features for random tracks
        for (let track of tracks) {
          const res2 = await axios.get(`https://api.spotify.com/v1/audio-features/${track.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          features.push(res2.data);
        }

        // console.log(features);
      
        let combined = tracks.map((item, i) => Object.assign({}, item, features[i])); // the results from search 1 and 2 are joined together
        // console.log(combined);

        setTrackList(combined);

    }

    const findRecommendation = (e) => {
        e.preventDefault();
    
        const filtered = trackList.filter(function(track) {
            return (track.danceability >= dance - 0.3 && track.danceability <= dance + 0.3)
            && (track.energy >= energy - 0.3 && track.energy <= energy + 0.3)
            && (track.valence >= valence - 0.3 && track.valence <= valence + 0.3)
        })
        
        // console.log(filtered);
         
        setSongRecommendation(filtered);

        // console.log(songRecommendation)

        setSongPreview(filtered[0].preview);

        songList.push(songRecommendation[0]);

        setLatestSongs([...latestSongs, songList]);

        // console.log(latestSongs[0].track_name);

           // setLatestSongs([...latestSongs, songRecommendation])

        // console.log(latestSongs);
  
        setShowTrack(true);

        console.log(latestSongs);

        // playSong();

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
    
       
    

    useEffect(() => {
            findTracks();
        // setLoading(true);
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
            <View style={{position: 'absolute', top: 5, right: 5}}>
                <TouchableOpacity onPress={() => logout()}>
                    <Button color="white" uppercase={false} style={{color: 'white'}}>Logout</Button>
                </TouchableOpacity>
                </View>
              <View style={styles.container}>
                {!showTrack && trackList.length >= 1 && (
                    <View style={styles.centreContent}>
                        {/* <Text>{token}</Text> */}
                    <Text style={styles.moodText}>How are you feeling today?</Text>
                    {/* {trackList.length > 0 && <Text>{trackList[0].track_name}</Text>} */}
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

                {/* {!showTrack && trackList !== null && <Text style={styles.moodText}>Loading today's tracks...</Text>} */}


                {showTrack && songRecommendation.length >= 1 && (
                    <View style={styles.centreContent}>
                    <Text style={styles.moodText}>MoodTrack of the day</Text>
                    <Image style={{height: 150, width: 150}} source={{uri: songRecommendation[0].image}} />
                    <Text style={styles.trackText}>{songRecommendation[0].track_name} by {songRecommendation[0].artists}</Text>
                    
                    <Button icon="music" style={{marginTop: 50}} labelStyle={{fontFamily: 'RobotoSlabReg', fontSize: 12}} uppercase={false} color="#8C52FF" mode="contained" onPress={() => navigation.navigate('Latest')} >
                        Latest
                    </Button>
                    {/* <Text style={styles.trackText}>{songRecommendation[0].preview} by {songRecommendation[0].artists}</Text> */}
                    {songPreview !== null && (
                        <TouchableOpacity onPress={() => playPreview()}>
                            <Button icon="play-pause" style={{marginLeft: 10}} labelStyle={{fontSize: 40}} color="#8C52FF" />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.secondaryText}>Listen in full on</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(songRecommendation[0].external)}>
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
