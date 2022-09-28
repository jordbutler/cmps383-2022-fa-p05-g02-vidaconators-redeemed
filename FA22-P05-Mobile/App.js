import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from "react-native-paper";
import { MobileAppBar } from './Components/MobileAppBar';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
     <MobileAppBar/>
      <Text>TOCO</Text>
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
