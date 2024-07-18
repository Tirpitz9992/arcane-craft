import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import { StackParamList } from '../components/navigation/Stack';
import { TodoCardProps } from '../components/TodoCard';
import { createTask } from '../utils/api';

const CreateTask = ({ navigation }: ScreenProps) => {
  const [task, setTask] = useState<TodoCardProps>({
    title: '',
    date: '',
    time: '',
    remind: false,
    tag: '',
  });

  const handleInputChange = (name: keyof TodoCardProps, value: string | boolean) => {
    setTask({ ...task, [name]: value });
  };

  const handleSaveTask = async () => {
    try {
      await createTask(task); 
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Title"
        value={task.title}
        onChangeText={(text) => handleInputChange('title', text)}
        style={styles.input}
      />
      <TextInput
        label="Date"
        value={task.date}
        onChangeText={(text) => handleInputChange('date', text)}
        style={styles.input}
      />
      <TextInput
        label="Time"
        value={task.time}
        onChangeText={(text) => handleInputChange('time', text)}
        style={styles.input}
      />
      <View style={styles.switchContainer}>
        <Text>Remind</Text>
        <Switch
          value={task.remind}
          onValueChange={(value) => handleInputChange('remind', value)}
        />
      </View>
      <TextInput
        label="Tag"
        value={task.tag}
        onChangeText={(text) => handleInputChange('tag', text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSaveTask} style={styles.button}>
        Save Task
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});

type ScreenProps = NativeStackScreenProps<StackParamList, 'CreateTask'>;

export default CreateTask;