import * as React from 'react'
import { useToken } from '../../context/TokenContext.js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import firebase from '../../firebase/firebase.js'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Emoji from 'react-native-emoji'
import { useFonts } from 'expo-font'
import Slider from '@react-native-community/slider'
import { Button, DataTable } from 'react-native-paper'
import { Audio } from 'expo-av'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MoodChart from './MoodChart'
import CalendarPicker from 'react-native-calendar-picker'

// import Light from '../assets/RobotoSlab_Light.ttf';

export default function Moods ({
  setUserId,
  userId,
  userName
}) {
  const [token, setToken] = useToken()
  const [moods, setMoods] = useState([])
  const [weekMood, setWeekMood] = useState([])
  const [userDance, setUserDance] = useState([])
  const [userEnergy, setUserEnergy] = useState([])
  const [userValence, setUserValence] = useState([])
  const [showChart, setShowChart] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [convertedDate, setConvertedDate] = useState('')
  const [userDate, setUserDate] = useState([])
  const [endDate, setEndDate] = useState(null)

  const navigation = useNavigation()

  const logout = () => {
    setToken(null)
    setTimeout(() => navigation.navigate('Login', {token: null}), 20)
  }

  const getMoods = () => {
    const ref = firebase.firestore().collection('Moods')

    try {
      ref.where('user', '==', userId).onSnapshot(querySnapshot => {
        const items = []
        querySnapshot.forEach(doc => {
          items.push(doc.data())
          // console.log(items);
        })
        for (let mood of items) {
          mood.date = new Date(mood.date) + '00:00:00'
          let splitDates = mood.date.split(' ')
          let joinedDate = `${splitDates[2]} ${splitDates[1]} ${splitDates[3]}`
          mood.date = joinedDate
          // mood.date = mood.date.toISOString();
        }
        // console.log(items);

        items.sort((a, b) => (a.date > b.date ? 1 : -1))
        // console.log(items);

        setMoods(items)
        // console.log(moods);

        // setLoading(false);
      })

      if (Moods.empty) {
        console.log('no matches')
        // setLoading(false);
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const onDateChange = (date, type) => {
    // let selectedDate = date.toISOString();
    // console.log(selectedDate);
    // setUserDate(selectedDate);

    let dateArr = date.toString().split(' ')
    let engDate = []
    engDate.push(Number(dateArr[2]), dateArr[1], dateArr[3])
    setConvertedDate(engDate.join(' '))
    let sevenDay = Number(engDate[0]) + 6
    setEndDate(`${sevenDay} ${dateArr[1]} ${dateArr[3]}`)
    setShowCalendar(false)
  }

  const split7Day = e => {
    let pos = moods.findIndex(e => e.date === convertedDate)
    console.log(pos)
    let index = pos + 7
    setWeekMood(moods.splice(pos, index))
    console.log(weekMood)

    // console.log(weekMood);
  }

  const createChart = () => {
    let dance = []
    let energy = []
    let valence = []
    for (let mood of weekMood) {
      dance.push(mood.dance * 10)
      energy.push(mood.energy * 10)
      valence.push(mood.valence * 10)
    }
    setUserDance(dance.splice(0, 7))
    setUserEnergy(energy.splice(0, 7))
    setUserValence(valence.splice(0, 7))
    console.log(userValence)

  }

  useEffect(() => {
    getMoods()
  }, [convertedDate])

  useEffect(() => {
    createChart()
  }, [weekMood])

  return (
    <LinearGradient colors={['#7e71f5', '#9f6ad6']} style={styles.body}>
      <Image
        style={styles.moodtrackLogoSmall}
        source={require('../../assets/images/MoodTrack_logo.png')}
      />
      {/* <View style={{ position: 'absolute', top: 35, right: 5 }}>
        <TouchableOpacity onPress={() => logout()}>
          <Button color='white' uppercase={false} style={{ color: 'white' }}>
            Logout
          </Button>
        </TouchableOpacity>
      </View> */}
      <View style={styles.container}>
        <View style={styles.centreContent}>
          <Text style={styles.moodText}>
            7-Day MoodTracking{'\n'}
            {convertedDate.length > 0 ? (
              <Text style={styles.secondaryText}>
                from {convertedDate} to {endDate}
              </Text>
            ) : null}
          </Text>
          <Button
            style={{ marginTop: -20, marginBottom: 40 }}
            onPress={() => {
              setShowCalendar(true)
              setShowChart(false)
            }}
          >
            Choose Start Date
          </Button>
          {showCalendar ? (
            <View style={styles.calendarView}>
            <CalendarPicker
              width={300}
              selectedDayColor='#8C52FF'
              selectedDayTextColor='white'
              textStyle={{ fontFamily: 'RobotoSlabReg' }}
              onDateChange={(date, type) => onDateChange(date, type)}
            />
            </View>
          ) : null}
          {userName ? <Text style={styles.moodText}></Text> : null}
          <View style={{ marginTop: -100 }}>
            {showChart ? (
              <MoodChart
                weekMood={weekMood}
                userDance={userDance}
                userEnergy={userEnergy}
                userValence={userValence}
                convertedDate={convertedDate}
                endDate={endDate}
              />
            ) : null}
          </View>
          <Button
            icon='brain'
            style={{ marginTop: 45, marginBottom: 10 }}
            size={20}
            labelStyle={{ fontFamily: 'RobotoSlabReg', fontSize: 12 }}
            uppercase={false}
            color='#8C52FF'
            mode='contained'
            onPress={e => {
              split7Day(e)
              setShowChart(true)
            }}
          >
            Generate Mood Chart
          </Button>
        </View>
      </View>
    </LinearGradient>
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
    marginTop: 90,
    // marginBottom: 100,
    height: 500,
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
  centreContent: {
    margin: 40,
    flex: 1,
    alignItems: 'center'
  },
  moodText: {
    padding: 15,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'RobotoSlabLight'
  },
  secondaryText: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'RobotoSlabReg'
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
  confirmationText: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'RobotoSlabReg',
    textAlign: 'center'
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
  },
  calendarView: {
    paddingBottom: 40
  }
})
