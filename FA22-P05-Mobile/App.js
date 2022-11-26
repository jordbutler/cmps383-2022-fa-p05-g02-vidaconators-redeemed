import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./Screens/HomeScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { ListingScreen } from "./Screens/ListingScreen";
import { MobileAppBar } from "./Components/MobileAppBar";
import { CartScreen } from "./Screens/CartScreen";
import { GlobalContextProvider } from "./GlobalContext";
const Stack = createStackNavigator();

export default function App() {
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <MobileAppBar />
        <Stack.Navigator >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListingScreen"
            component={ListingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyCart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}
