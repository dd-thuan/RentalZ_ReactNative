// import LoginScreen from "./login";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from "./Detail";
import Create from "./Create";
import Home from "./Home";

const Stack = createNativeStackNavigator();

const NavigationApp = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Create" component={Create} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
    
}

export default NavigationApp