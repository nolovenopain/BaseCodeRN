import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { navigationRef } from '../Navigators/RootNavigation';
import Home from '../Screens/Home';
import Loading from '../Utils/loading/index';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    headerMode={null}
                >
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>

            <Loading/>
        </>
    ) 
}

export default AppNavigator;