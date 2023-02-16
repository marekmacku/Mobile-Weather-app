import { StatusBar } from 'expo-status-bar';
import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {LineChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {StyleSheet,ImageBackground,Button,Text, View, Image,TextInput, TouchableOpacity, Pressable,ScrollView,SafeAreaView } from 'react-native';

const bcgImage = "../Images/BackImagePinkBlueMash.jpeg";
const logo_png = "../Images/Logo_ActuallyPng.png";
const clouds = "../Images/cloud.jpeg";
const actuallLocation = "Praha";
const temperature = "12";

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

export default function HomeScreen(props) {
    const {navigation,onPress, title = 'save'} = props;
    return (

      <View style = {styles.BcgImageContainer}>
        <ImageBackground style = {styles.bcgImage} source={require(clouds)}>
      
      <SafeAreaView style = {styles.Container}>

      <ScrollView> 
      
         {/*Header*/}
         <View style = {styles.Header}>

          <Text style = {styles.HeaderText}>
            Weather
            </Text>
          </View>
          
          {/*Location*/}
          <View style = {styles.Location}>

          <Text style = {styles.LocationText}>
           {actuallLocation}
          </Text>

          </View>
          {/*Temperature*/}
          <View style = {styles.Temperature}>
                <Text style = {styles.temperatureText}>{temperature}</Text>

          </View>

  {/*LineChart*/}        
          <View style = {styles.LineChart}>
          
  <LineChart
  data={data}
  width={screenWidth -10}
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
  }
  
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
      height : 200
    },
    temperatureText :{
      fontWeight : "bold",
      fontSize : 50,
      color : '#FFF'
    },
    LineChart : {
      alignItems : "center",
      justifyContent : "center"
    }
  });
