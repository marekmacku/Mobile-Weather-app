import HomeScreen from "./Screens/HomeScreen";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Password from "./Screens/Password";
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
        options = {{headerShown: false
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
      name="Login"
      component={Login}
      options = {{headerShown: false
        }}
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
