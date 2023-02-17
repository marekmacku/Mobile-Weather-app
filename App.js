import HomeScreen from "./Screens/HomeScreen";
import SecondScreen from "./Screens/SecondScreen";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Password from "./Screens/Password";
import TestFile from "./TestFile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  colorScheme === 'dark';
}
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Register"
        component={Register}
        options = {{title : "Register please",headerStyle: {
          backgroundColor: '#f511b1'
        },}}
        />
      <Stack.Screen
      name="Login"
      component={Login}
      
      />
      <Stack.Screen
        name="TestFile"
        component={TestFile}
        options={{title : "Test File",
        headerShown: false
      }}
        />
        <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title : "Home page",
        headerShown: false
      }}
        />
      <Stack.Screen
      name="SecondScreen"
      component={SecondScreen}
      options= {{title : "Wadum bru"}}
      />
      <Stack.Screen
      name="Password"
      component={Password}
      options= {{title : "Wait please",
      headerShown: false
    }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
