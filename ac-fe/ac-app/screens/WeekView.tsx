import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import TodoCard, {TodoCardProps} from '../components/TodoCard';

const fetchTasksForDate = async (date: string): Promise<TodoCardProps[]> => {

  return [
    {
      title: 'Task 1',
      date: date,
      time: '10:00 - 11:00',
      remind: true,
      tag: 'Work',
    },
    {
      title: 'Task 2',
      date: date,
      time: '14:00 - 15:00',
      remind: false,
      tag: 'Personal',
    },
  ];
};

interface DayViewProps {
    date: string;
}

const DayView: React.FC<DayViewProps> = ({ date }) => {
  const [tasks, setTasks] = useState<TodoCardProps[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasksForDate(date);
      setTasks(tasks);
    };
    loadTasks();
  }, [date]);

  return (
    <View style={styles.scene}>
      {tasks.map((task, index) => (
        <TodoCard key={index} {...task} />
      ))}
    </View>
  );
};

const WeekView: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(new Date().getDay());
  const [routes] = useState<{ key: string; title: string }[]>([
    { key: '0', title: 'Su' },
    { key: '1', title: 'Mo' },
    { key: '2', title: 'Tu' },
    { key: '3', title: 'We' },
    { key: '4', title: 'Th' },
    { key: '5', title: 'Fr' },
    { key: '6', title: 'Sa' },
  ]);

  const renderScene = ({ route }: { route: { key: string } }) => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(route.key) - new Date().getDay());
    return <DayView date={date.toISOString().split('T')[0]} />;
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  tabBar: {
    backgroundColor: '#6200ee',
  },
  indicator: {
    backgroundColor: '#fff',
  },
  label: {
    color: '#fff',
  },
});

export default WeekView;