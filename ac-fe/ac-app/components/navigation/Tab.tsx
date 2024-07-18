// ac-app/components/navigation/MainTabNavigator.tsx
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../screens/HomeScreen';
import BlogScreen from '../../screens/BlogScreen';
import MeScreen from '../../screens/MeScreen';

const Tab = createMaterialBottomTabNavigator();

export type TabParamList = {
    Home: undefined
    Blog: undefined
    Me: undefined
}

const MainTabNavigator = () => {
  const { colors } = useTheme();

  return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.primary}
        inactiveColor={colors.secondary}
        barStyle={{ backgroundColor: colors.background }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen as React.ComponentType<any>}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Blog"
          component={BlogScreen}
          options={{
            tabBarLabel: 'Blog',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={MeScreen}
          options={{
            tabBarLabel: 'Me',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default MainTabNavigator;