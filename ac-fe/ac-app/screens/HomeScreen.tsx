import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, MaterialBottomTabScreenProps, Tooltip } from 'react-native-paper';
import WeekView from './WeekView';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../components/navigation/Stack';
import { TabParamList } from '../components/navigation/Tab';

type HomeScreenProps = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<StackParamList>
>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTodayPress = () => {
    setSelectedDate(new Date());
  };

  const handleCreateTaskPress = () => {
    navigation.navigate('CreateTask');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.todayText}>Today</Text>
        <View style={styles.buttonContainer}>
          <Tooltip title="Go to Today">
            <IconButton
              icon="calendar-today"
              size={24}
              onPress={handleTodayPress}
            />
          </Tooltip>
          <Tooltip title="Create Task">
            <IconButton
              icon="plus"
              size={24}
              onPress={handleCreateTaskPress}
            />
          </Tooltip>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <WeekView />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  todayText: {
    textAlign: 'center',
    fontSize: 24,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});



export default HomeScreen;