import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './Tab';
import WeekView from '../../screens/WeekView'; 
import CreateTask from '../../screens/CreateTask';

const Stack = createStackNavigator();

export type StackParamList = {
    Tab: undefined
    WeekView: undefined
    CreateTask: undefined
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen name="Tab" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="WeekView" component={WeekView} /> 
      <Stack.Screen name="CreateTask" component={CreateTask as React.ComponentType<any>}/>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;