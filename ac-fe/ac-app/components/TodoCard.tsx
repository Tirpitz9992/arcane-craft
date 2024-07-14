import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Title, Paragraph, Switch, Chip } from 'react-native-paper';

export interface TodoCardProps {
  title: string;
  date: string;
  time: string;
  remind: boolean;
  tag: string;
}


const TodoCard: React.FC<TodoCardProps> = ({ title, date, time, remind, tag }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{date}</Paragraph>
        <Paragraph>{time}</Paragraph>
        <View style={styles.row}>
          <Text>Remind: </Text>
          <Switch value={remind} />
        </View>
        <Chip>{tag}</Chip>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#e0f7fa',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default TodoCard;