import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {LineChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useEffect, useState} from 'react';
import * as Location from 'expo-location';
import Slider from 'react-native-slider';
import { LinearGradient } from 'expo-linear-gradient';

import {StyleSheet,Alert,ImageBackground,Button,Text, View, Image,TextInput, TouchableOpacity, Pressable,ScrollView,SafeAreaView,ActivityIndicator } from 'react-native';

const bcgImage = "../Images/BackImagePinkBlueMash.jpeg";
const locationImage = "../Images/location.png";
const searchImage2 = "../Images/searchImage2.png"
const logo_png = "../Images/Logo_ActuallyPng.png";
const updated_logo = "../Images/UpdatedLogo.png";
const updated_logo2 = "../Images/UpdatedLogo2.png";
const cloudImage = "../Images/Cloud.png"; //cloudy
const cloudyClouds = "../Images/CloudyClouds.png"; //mostly clouded
const clearWeather = "../Images/SunnyCloud.png"; //clear 
const rainCloud = "../Images/RainCloud.png"; //rain
const snowCloud = "../Images/SnowCloud.png"; //snow
const stormCloud = "../Images/StormCloud.png"; //storm

const ApiKey = '7dd36db7d72999c08b57eef7b4d14013';

const screenWidth = Dimensions.get("window").width;




const chartConfig = {
  backgroundGradientFrom: "#113036",
  backgroundGradientFromOpacity: 0.5,
  backgroundGradientTo: "#030B0D",
  backgroundGradientToOpacity: 10,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.8,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForLabels: {
    fontSize: 12,
  },
};





const HomeScreen = (props) => {
  const { navigation, onPress, title = 'save' } = props;
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [sliderValue, setSliderValue] = useState(24);
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [feelsLikeTemperature, setFeelsLikeTemperature] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cloudiness, setCloudiness] = useState(0);
  const [rainVolume, setRainVolume] = useState(0);
  const [snowVolume, setSnowVolume] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState('');
  
  const handlePress = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const cityLat = location.coords.latitude;
      const cityLong = location.coords.longitude;
      getWeatherData(cityLat, cityLong);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleSubmit = () => {
    getWeatherByCityName(text);
  };
  
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };


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
      const timeData = [];
      const tempData = [];
      let currentHour = null;
      for (let i = 0; i < 9; i++) {
        if (currentHour === null || time[i] !== currentHour) {
          currentHour = time[i];
          timeData.push(currentHour);
          tempData.push(currentTemp[i]);
        }
      }
      setTempData(tempData.slice(0, screenWidth/ 40)); // Limit the number of data points
      setTimeData(timeData.slice(0, screenWidth /40)); // Limit the number of data points
      console.log(tempData); // log current temperature to console
      console.log(timeData); // log time to console
      console.log(data);
      const cityName = data.city.name;
      setCityName(cityName);
      console.log(cityName); // log city name to console
      setTemperature(Math.round(data.list[0].main.temp));

      const feelsLikeTemperature = Math.round(data.list[0].main.feels_like);
      const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
      const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
      const windSpeed = data.list[0].wind.speed;

      setFeelsLikeTemperature(feelsLikeTemperature);
      setSunrise(sunrise);
      setSunset(sunset);
      setWindSpeed(windSpeed);

      const cloudiness = data.list[0].clouds.all;
      const rainVolume = data.list[0].rain ? data.list[0].rain['3h'] : 0;
      const snowVolume = data.list[0].snow ? data.list[0].snow['3h'] : 0;

      setCloudiness(cloudiness);
      setRainVolume(rainVolume);
      setSnowVolume(snowVolume);

      const weatherCondition = data.list[0].weather[0].main;
      
      setWeatherCondition(weatherCondition);
      console.log(weatherCondition);


    } catch (error) {
      console.error(error);
    }
  };


  const getWeatherByCityName = async (someCity) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${someCity}&appid=${ApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const location = data.coord;
    const latitude = location.lat;
    const longitude = location.lon;

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    getWeatherData(latitude, longitude);
  } catch (error) {
    console.error(Alert.alert(
      'The location doesn\'t exist',
  'Please try again.',
  [{ text: 'OK' }],
  { cancelable: false }
    )
    );
  }
};


const renderWeatherConditionImage = () => {
  switch (weatherCondition) {
    case 'Thunderstorm':
      return <Image source={require('../Images/StormCloud.png')} style={styles.weatherImageLogo } />;
    case 'Rain':
      return <Image source={require('../Images/RainCloud.png')} style={styles.weatherImageLogo } />;
    case 'Snow':
      return <Image source={require('../Images/SnowCloud.png')} style={styles.weatherImageLogo } />;
    case 'Clear':
      return <Image source={require('../Images/SunnyCloud.png')} style={styles.weatherImageLogo } />;
    case 'Clouds':
      return <Image source={require('../Images/CloudyClouds.png')} style={styles.weatherImageLogo } />;
    case 'Sunny':
      return <Image source={require('../Images/Sun.png')} style={styles.weatherImageLogo } />;

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
      <LinearGradient
      colors={['#113036', '#071B1F', '#030B0D']}
      start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.linearGradient}
        >

      
        <SafeAreaView style={styles.Container}>
          <ScrollView>
            

            {/*Header*/}
            <View style={styles.Header}>
              <Image style={styles.mainLogo} source={require(updated_logo2)}></Image>
            <Text style={styles.HeaderText}>{cityName}</Text>


            <Pressable onPress={handleButtonClick} >
                  <Image style ={styles.logoImages} source={require(searchImage2) } />
                </Pressable>
                
            <Pressable onPress={handlePress} >
                  <Image style ={styles.logoImages} source={require(locationImage) } />
                </Pressable>
                
            </View>
            {/*Search by city name*/}
            <View style = {styles.searchByCity}>
            {isVisible &&   <TextInput 
                    
                    style={styles.textInputStyle}
                    onChangeText={handleTextChange}
                    onSubmitEditing={handleSubmit}
                    value={text}
                  /> }
        </View>
            {/*Location*/}
            <View style={styles.Location}>

              {/*Temperature*/}
              <View style={styles.Temperature}>
              {temperature !== null ? (
        <Text style= {styles.temperatureText}>
            {Math.round(temperature)}°
        </Text>
        
      ) : (
        <ActivityIndicator size="large"color="#003846"  style={styles.indicator} />
      )}
      <View style = {styles.weatherImages}>
      {renderWeatherConditionImage()}
        
      </View>
              </View>
            </View>
      
          <View style={styles.infoDataContainer}>
              <View style= {styles.cards}>
              <Text style={styles.cardHeaderText} numberOfLines={1}>Wind speed</Text>
<Text style={styles.cardText} numberOfLines={1}>{windSpeed} km/h</Text>
              </View>

              <View style= {styles.cards}>
              <Text style = {styles.cardHeaderText}>Feels like</Text>
              <Text style= {styles.cardText}>
                    {feelsLikeTemperature}°</Text>
              </View>

              <View style= {styles.cards}>
              <Text style = {styles.cardHeaderText}>Sunrise</Text>
                <Text style = {styles.cardText}>{sunrise}</Text>
                <Text style = {styles.cardHeaderText}>Sunset</Text>
                <Text style = {styles.cardText}>{sunset}</Text>
              </View>

              <View style= {styles.cards}>
              <Text style = {styles.cardHeaderText}>Cloudliness</Text>
              <Text style= {styles.cardText} numberOfLines={1}>
                    {cloudiness}</Text>
              </View>

              <View style= {styles.cards}>
              <Text style = {styles.cardHeaderText}>Rain</Text>
              <Text style= {styles.cardText}>
                    {rainVolume} mm</Text>
              </View>

              <View style= {styles.cards}>
              <Text  style = {styles.cardHeaderText}>Snow</Text>
              <Text  style= {styles.cardText}>
                    {snowVolume} mm</Text>
              </View>

          </View>
            <View style={styles.LineChart}>
              {tempData.length > 0 && (
        <>
          <Text style={styles.GraphText}>Weather for next 24 h</Text>
          <LineChart
        data={{
          labels: timeData.slice(0, sliderValue),
          datasets: [{ data: tempData.slice(0, sliderValue) }]
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

<Slider
    style={{ width: '90%', alignSelf: 'center' }}
    minimumValue={1}
    maximumValue={24}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
    step={1}
    value={sliderValue}
    onValueChange={(value) => setSliderValue(value)}
/>

            </View>
          </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    </View>
  );
};

export default HomeScreen;
  
  const styles = ScaledSheet.create({
    BcgImageContainer: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Container: {
      alignItems : "center"
    },
    Header :{
      marginTop : '15@s',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,

     
    },
    HeaderText : {
      fontWeight : "bold",
      fontSize : '20@s',
      color : '#FFFF',
      textAlign: 'center',
      flex: 1,
      marginLeft : '35@s'
    },
    image: {
      marginBottom : '40@s',
    },
    bcgImage : {
      flex : 1,
    },
    Location : {
      
      alignItems : "center",
      marginBottom : "50@s"

    },
    LocationText : {
      fontWeight : "bold",
      fontSize : 25,
      color : '#000809'
    },
    Temperature : {
      justifyContent : "center",
      position: 'relative',
      alignItems : "center",
      marginTop : '50@s',
      marginBottom : '90@s',
      borderWidth: '5@s',
      borderColor : '#000809',
      shadowColor: "#003846",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.75,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius : 360,
      width : '200@s',
      height : '200@s',
    },
    temperatureText :{
      fontWeight : "bold",
      fontSize : '50@s',
      color : '#FFF',
      textShadowColor: 'rgba(0, 76, 86, 0.15)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      position: 'absolute',
      top: '28%',
      left: '31%',
      zIndex: 1,
    },
    LineChart : {
      alignItems : "center",
      justifyContent : "center"
    },
    TfAmIdoin : {
      alignContent : "center"
    },
    GraphText :{
      fontWeight : "bold",
      fontSize : '15@s',
      color : '#FFF'
    },
    logoImages : {
      width : '50@s',
      height : '50@s'
    },
    mainLogo : {
      width : '60@s',
      height : '50@s'
    },
    linearGradient: {
      flex: 1,
    },
    textInputStyle : {
      borderBottomColor: 'white', 
      borderBottomWidth: '1@s', 
      backgroundColor: 'transparent',
      color: '#FFF',
      marginTop : '20@s',
      width : '200@s',
      alignSelf : 'center'
    },
    searchByCity : {
      flex : 1,     
    },
infoDataContainer : {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: 10,
},

cards : {
  borderWidth: 3,
  borderColor: '#00353c',
  shadowColor: "#004c56",
  marginBottom: 16,
  height : '100@s',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.75,
  shadowRadius: 3.84,
  elevation: 5,
  borderRadius: 5,
  width: '31%',
  paddingVertical: '10@s',
  paddingHorizontal: '15@s',
  alignItems: 'center',
  justifyContent: 'center',
},

cardText :{
  fontSize: '15@s',
  fontWeight : 'bold',
  color : 'white',
  textAlign: 'center',
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10,
},

cardHeaderText : {
  color : 'white',
  fontSize : '12@s',
  marginBottom: '5@s',
  textAlign: 'center',
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10,
},
weatherImages : {
  width: '100%',
  height: '100%',
  zIndex: 0,
  position : 'relative',
  top : '29%'

},
weatherImageLogo : {
  width : '150@s',
  height : '87@s',
  alignSelf : 'center',
},
indicator : {
  position : 'relative',
  top : '50%'
}

  });
