import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button,Text, View } from 'react-native';

export default function SecondScreen({navigation, route}) {
  let language = route.params.language;
  let pozdrav = language === "Czech" ? "Ahoj!" : "Hello";
  return (
    <View style={styles.container}>
      <Text>{pozdrav}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
