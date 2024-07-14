import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const HomeScreen = () => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const currentDay = new Date().getDay();
  const currentDate = new Date().getDate();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.dateItem}>
            <Text style={index === currentDay ? styles.selectedDay : styles.day}>
              {day}
            </Text>
            <Text style={index === currentDay ? styles.selectedDate : styles.date}>
              {currentDate + index - currentDay}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.todayText}>Today</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Title>All day</Title>
          <Paragraph>a</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Complete</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  dateItem: {
    alignItems: 'center',
  },
  day: {
    color: '#000',
  },
  date: {
    color: '#000',
  },
  selectedDay: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  selectedDate: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  todayText: {
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 20,
  },
  card: {
    margin: 10,
    backgroundColor: '#e0f7fa',
  },
});

export default HomeScreen;