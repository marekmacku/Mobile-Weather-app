
import { StatusBar } from 'expo-status-bar';
import {StyleSheet,ImageBackground,Button,Text, View, Image,TextInput, TouchableOpacity, Pressable,SafeAreaView } from 'react-native';

const bcgImage = "../Images/BackImagePinkBlueMash.jpeg";
const logo_png = "../Images/Logo_ActuallyPng.png";

export default function Register(props) {
    const {navigation} = props;
      return (

        <View style={styles.container}>
          <ImageBackground style = {styles.bcgImage} source={require(bcgImage)}>
            {/*Text inputs form*/ }
          <Text style = {styles.TextForTxtInput}>
            First Name
          </Text>
         <TextInput
        style={styles.input}
        placeholder="First Name"/>
        <Text style = {styles.TextForTxtInput}>
            Last Name
          </Text>
          <TextInput
        style={styles.input}
        placeholder="Last Name"/>
        <Text style = {styles.TextForTxtInput}>
            Email
          </Text>
        <TextInput
        style={styles.input}
        placeholder="Email"/>
        <Text style = {styles.TextForTxtInput}>
            Password
          </Text>
        <TextInput
        style={styles.input}
        placeholder="Password"/>
      
         {/*Link Texts*/ }
         
         <View style = {styles.TextView}>
         
         <Text style={styles.LinkText}
      onPress={() => navigation.navigate("Login")}>
         Login instead
      </Text>

      </View>

         {/*Buttons*/ }
          <Pressable style = {styles.button} onPress={() => navigation.navigate("HomeScreen")}>
            <Text style = {styles.ButtonText}>
                Register
            </Text>
          </Pressable>
          </ImageBackground>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1
        
      },
      image: {
        height : 120,
        width : 160,
        justifyContent: 'center',
      },
      button : {
        alignItems : 'center',
        justifyContent : 'center',
        paddingVertical : 12,
        paddingHorizontal : 32,
        borderRadius : 20,
        width : 180,
        marginLeft : 10,
        elevation : 3,
        backgroundColor : 'black',
        marginBottom : 20,
        
      },
      Text : {
        fontSize : 16,
        lineHeight : 21,
        fontWeight : 'bold',
        letterSpacing : 0.25,
        color : 'black'
      },
      ButtonText : {
        fontSize : 16,
        lineHeight : 21,
        fontWeight : 'bold',
        letterSpacing : 0.25,
        color : 'white'
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      bcgImage : {
        flex : 1
      },
      TextForTxtInput : {
        paddingTop : 12,
        paddingLeft : 14,
        fontSize : 16
      },
      TextView :{
        justifyContent : 'space-between', 
        alignItems : 'center',
        flexDirection : 'row',
        margin : 13
        
      },
      LinkText : { 
        color : 'blue',
        fontSize : 15
      }
    });