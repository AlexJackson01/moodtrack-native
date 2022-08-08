import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, AppState, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";



export default function MoodChart({ userDance, userEnergy, userValence, userDate, endDate }) {

    const data = {
        labels: ["", "", "", "", "", "", ""],
        datasets: [
            {
                data: userDance,
                strokeWidth: 4,
                color: (opacity = 1) => `rgba(255,87,100,${opacity})`, // optional
            },
            {
                data: userEnergy,
                strokeWidth: 4,
                color: (opacity = 1) => `rgba(98,232,152, ${opacity})`, // optional
            },
            {
                data: userValence,
                strokeWidth: 4,
                color: (opacity = 1) => `rgba(76,207,252, ${opacity})`, // optional
            },
        ],
        legend: ["Danceability", "Energy", "Valence"] // optional
      };

      const chartConfig = {
        backgroundGradientFrom: "#FFFCEF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFCEF",
        // backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `#000`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
      };


  
  return (
<View>
<LineChart
  data={data}
  width={325}
  height={220}
  chartConfig={chartConfig}
  withShadow={false}
  withOuterLines={false}
  fromZero={true}
/>
</View>


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
