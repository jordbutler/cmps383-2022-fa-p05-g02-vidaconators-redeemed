import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {HomeScreen} from './Screens/HomeScreen';
import {LoginScreen} from './Screens/LoginScreen';


const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name= "Toco Games" component={HomeScreen}  options={{headershown:false,  drawerLabel: "Home",}}/>
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}
