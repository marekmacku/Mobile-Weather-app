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
  color: (opacity = 1, temperature) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.8,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForLabels: {
    fontSize: 12,
  },
};

const screenWidth = Dimensions.get("window").width;

const HomeScreen = (props) => {
  const { navigation, onPress, title = 'save' } = props;
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [timeData, setTimeData] = useState([]);

  const getWeatherData = async (latitude, longitude) => {
     let actualWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${ApiKey}`;
    try {
      const response = await fetch(actualWeatherURL);
      const data = await response.json();
      const currentTemp = data.list.map(temp => Math.round(temp.main.temp));
      const time = data.list.map((time) => {
        let date = new Date(time.dt * 1000);
        let hour = date.getHours();
        return hour + ':00';
      });
      setTempData(currentTemp.slice(0, screenWidth / 40)); // Limit the number of data points
      setTimeData(time.slice(0, screenWidth / 40)); // Limit the number of data points
      console.log(currentTemp); // log current temperature to console
      console.log(time); // log time to console
      const cityName = data.city.name;
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
              {tempData.length > 0 && (
        <>
          <Text style={styles.title}>Weather for next 24 h</Text>
          <LineChart
        data={{
          labels: timeData,
          datasets: [{ data: tempData }]
        }}
        width={screenWidth}
        height={260}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
        </>
      )}
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
