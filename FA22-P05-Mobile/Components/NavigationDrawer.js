import * as React from "react";

import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from "../Screens/HomeScreen";
import { LoginScreen } from "../Screens/LoginScreen";

const Drawer = createDrawerNavigator();
export function NavigationDrawer() {
    return (
     
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={LoginScreen} />
        </Drawer.Navigator>
      
    );
  }

    