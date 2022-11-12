import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./Screens/HomeScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListingScreen } from "./Screens/ListingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headershown: false }}
        />
        <Stack.Screen
          name="ListingScreen"
          component={ListingScreen}
          options={{ headershown: false }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
