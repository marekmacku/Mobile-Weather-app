import { StatusBar } from 'expo-status-bar';
import { View,Text,SafeAreaView,StyleSheet,ActivityIndicator,ScrollView, RefreshControl } from "react-native";
import { Button, TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import * as Location from 'expo-location'

const ApiKey = '7dd36db7d72999c08b57eef7b4d14013';
let actualWeatherURL = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${ApiKey}`;


export const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(null);

  const loadForecast = async () =>{
    setRefreshing(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    try {
      const response = await fetch(`${actualWeatherURL}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
      const data = await response.json();

      if(!response.ok){
        Alert.alert('Error', 'Something went wrong');
      } else{
        setForecast(data);
      }
    } catch (error) {
      console.log(error);
    }

    setRefreshing(false);
  }

  useEffect(() => {
    loadForecast();
  }, []);

  if (!forecast) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const currentTemperature = Math.round(forecast.current.temp);
  return currentTemperature;
}

export default Weather;
/*const Weather = () => {
  /*  const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(null); 
    const loadForecast = async () =>{
        setRefreshing(true);

        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        
      }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const response = await fetch(`${actualWeatherURL}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
        const data = await response.json();
  
        if(!response.ok){
          Alert.alert('Error', 'Something went wrong'); 
        }
        else{
          setForecast(data);
        }
        setRefreshing(false);
          }
  
          useEffect(() => {
            loadForecast();
        },[]);
       
        if(!forecast) {
            return (
              <SafeAreaView>
                <ActivityIndicator size = 'large'/>
    
              </SafeAreaView>
            );
          }
          const current = forecast.current.Weather[0];


    return(
        <SafeAreaView>
         <ScrollView
         refreshControl = {
         <RefreshControl 
         refreshing = {refreshing}
         onRefresh = {() => loadForecast()}/>
         
         }
       >
           <Text>
             {Math.round(forecast.current.temp)}°C
           </Text>
           </ScrollView>
       </SafeAreaView>
    )

    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
  
    const loadForecast = async () => {
        setRefreshing(true);
  
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          
        }
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        const response = await fetch(`${actualWeatherURL}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
        const data = await response.json();
  
        if(!response.ok){
          Alert.alert('Error', 'Something went wrong'); 
        }
        else{
          setForecast(data);
        }
        setRefreshing(false);
    }
  
    useEffect(() => {
        loadForecast();
    },[]);
       
    if(!forecast) {
        return (
          <SafeAreaView>
            <ActivityIndicator size = 'large'/>
          </SafeAreaView>
        );
    }
    const current = forecast.current.weather[0];
  
    return (
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadForecast()}
            />
          }
        >
          <Text>{Math.round(forecast.current.temp)}°C</Text>
          <Text>{current.description}</Text>
        </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Weather;*/

  //2nd try

   /* const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address:");
    console.log(geocodedLocation);
  };

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder='Address' value={address} onChangeText={setAddress} />
      <Button title="Geocode Address" onPress={geocode} />
      <Button title="Reverse Geocode Current Location" onPress={reverseGeocode} disabled={!location} />
      <StatusBar style="auto" />
    </View>
  );

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [geocodedLocation, setGeocodedLocation] = useState(null);

  useEffect(() => {
      const getPermissions = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              console.log("Please grant location permissions");
              return;
          }

          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
          console.log("Location:");
          console.log(currentLocation);
      };
      getPermissions();
  }, []);

  const geocode = async () => {
      if (!location) {
          console.log("Location not found.");
          return;
      }

      if (!address) {
          console.log("Please enter an address.");
          return;
      }

      const geocoded = await Location.geocodeAsync(address);
      console.log("Geocoded Address:");
      console.log(geocoded);
      setGeocodedLocation(geocoded);
  };

  const reverseGeocode = async () => {
      if (!location) {
          console.log("Location not found.");
          return;
      }

      const reverseGeocoded = await Location.reverseGeocodeAsync({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
      });

      console.log("Reverse Geocoded:");
      console.log(reverseGeocoded);
  };

  return (
      <View style={styles.container}>
          <TextInput placeholder='Address' value={address} onChangeText={setAddress} />
          <Button title="Geocode Address" onPress={geocode} />
          <Button title="Reverse Geocode Current Location" onPress={reverseGeocode} />
          <StatusBar style="auto" />
      </View>
  ); */