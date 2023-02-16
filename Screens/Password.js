
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View,ActivityIndicator} from 'react-native';


export default function Password(props) {
    const {navigation} = props;
      return (

        <View style={styles.container}>
            <ActivityIndicator size="large" />

      </View>

      )  
    }
    const styles = StyleSheet.create({
        container: {
            flex:1,
            justifyContent : "center"
    }})

        