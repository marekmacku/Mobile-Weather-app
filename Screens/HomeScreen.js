import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {LineChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useEffect, useState} from 'react';
import * as Location from 'expo-location';
import {StyleSheet,ImageBackground,Button,Text, View, Image,TextInput, TouchableOpacity, Pressable,ScrollView,SafeAreaView,ActivityIndicator } from 'react-native';
//import { Weather } from './ApiCalling';
//import {Weather} from './TestScreen';

const bcgImage = "../Images/BackImagePinkBlueMash.jpeg";
const logo_png = "../Images/Logo_ActuallyPng.png";
const clouds = "../Images/cloud.jpeg";
const ApiKey = '7dd36db7d72999c08b57eef7b4d14013';



const chartConfig = {
  backgroundGradientFrom: "#051923",
  backgroundGradientFromOpacity: 0.5,
  backgroundGradientTo: "#051923",
  backgroundGradientToOpacity: 10,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 10,
  useShadowColorFromDataset: false // optional
};

const data = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 5 // optional
    }
  ],
  legend: ["Week"] // optional
};

const screenWidth = Dimensions.get("window").width;

const HomeScreen = (props) => {
  const { navigation, onPress, title = 'save' } = props;
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [tempData, setTempData] = useState([]);

const getWeatherData = async (latitude, longitude) => {
    let actualWeatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${ApiKey}`;
    try {
      const response = await fetch(actualWeatherURL);
      const data = await response.json();
      const currentTemp = data.main.temp;
      setTemperature(currentTemp);
      console.log(currentTemp); // log current temperature to console
      const cityName = data.name;
      setCityName(cityName);
      console.log(cityName); // log city name to console
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        getWeatherData(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 21, 22, 23, 22, 21, 20],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5
  };

  return (
    <View style={styles.BcgImageContainer}>
      <ImageBackground style={styles.bcgImage} source={require(clouds)}>
        <SafeAreaView style={styles.Container}>
          <ScrollView>
            

            {/*Header*/}
            <View style={styles.Header}>
              <Text style={styles.HeaderText}>Weather</Text>
            </View>

            {/*Location*/}
            <View style={styles.Location}>
              <Text style={styles.LocationText}> {cityName}</Text>
              <View style={styles.TfAmIdoin}></View>

              {/*Temperature*/}
              <View style={styles.Temperature}>
              {temperature !== null ? (
        <Text style= {styles.temperatureText}>
          {Math.round(temperature)}
        </Text>
      ) : (
        <ActivityIndicator size="large"color="#0000ff" />
      )}
              </View>
            </View>

            <View style={styles.LineChart}>
              <LineChart
                data={data}
                width={screenWidth - 10}
                height={300}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                style={{
                  borderRadius: 20
                }}
                bezier
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
  
  const styles = ScaledSheet.create({
    BcgImageContainer: {
        flex : 1,
    },
    Container: {
      alignItems : "center"
    },
    Header :{
      marginTop : '15@s',
      alignItems : "center",
     
    },
    HeaderText : {
      
      fontWeight : "bold",
      fontSize : '20@s',
      color : '#FFF'
    },
    image: {
      marginBottom : '40@s',
    },
    bcgImage : {
      flex : 1,
    },
    Location : {
      marginTop : '50@s',
      alignItems : "center"
    },
    LocationText : {
      fontWeight : "bold",
      fontSize : '25',
      color : '#FFF'
    },
    Temperature : {
      justifyContent : "center",
      alignItems : "center",
      marginTop : 50,
      borderWidth: '5@s',
      borderRadius : 360,
      width : 200,
      height : 200,
      marginBottom : '10@s'
    },
    temperatureText :{
      fontWeight : "bold",
      fontSize : 50,
      color : '#FFF'
    },
    LineChart : {
      alignItems : "center",
      justifyContent : "center"
    },
    TfAmIdoin : {
      alignContent : "center"
    }
  });
