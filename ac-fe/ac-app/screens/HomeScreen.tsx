import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeekView from './WeekView';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTodayPress = () => {
    setSelectedDate(new Date());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.todayText}>Today</Text>
        <Button title="Go to Today" onPress={handleTodayPress} />
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
    marginVertical: 20,
  },
});

export default HomeScreen;