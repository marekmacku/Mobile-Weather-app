import React, { createContext, useState, useEffect, Text } from 'react';
import { Alert, ActivityIndicator, View } from 'react-native';
import * as Location from 'expo-location';

const ApiKey = '7dd36db7d72999c08b57eef7b4d14013';
let actualWeatherURL = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${ApiKey}`;

const Weather = () => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    fetch(actualWeatherURL)
      .then(response => response.json())
      .then(data => {
        const currentTemp = data.current.temp;
        setTemperature(currentTemp);
        console.log(currentTemp); // log current temperature to console
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <CurrentTemperature temperature={temperature} />
    </View>
  );
};

export default Weather;
