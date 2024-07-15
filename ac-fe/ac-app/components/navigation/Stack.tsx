import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './Tab';
import WeekView from '../../screens/WeekView'; 

const Stack = createStackNavigator();

export type StackParamList = {
    Tab: undefined
    Date: undefined
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen name="Tab" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Date" component={WeekView} /> 
    </Stack.Navigator>
  );
};

export default MainStackNavigator;