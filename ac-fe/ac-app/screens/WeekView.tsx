// WeekView.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import TodoCard, { TodoCardProps } from '../components/TodoCard';
import { useTheme } from 'react-native-paper';
import { fetchTasksForDate } from '../utils/api'; 

interface DayViewProps {
  date: string;
}

const DayView: React.FC<DayViewProps> = ({ date }) => {
  const [tasks, setTasks] = useState<TodoCardProps[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasksForDate(date);
      //console.log('Fetching tasks for date:', date);
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
  const theme = useTheme();
  const layout = useWindowDimensions();
  const today = new Date();
  const currentDay = today.getDay();
  const [index, setIndex] = useState<number>(currentDay);
  
  const generateRoutes = () => {
    const routes = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i - currentDay);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateNum = date.getDate();
      routes.push({ key: i.toString(), title: `${day} ${dateNum}` });
    }
    return routes;
  };

  const [routes] = useState(generateRoutes());

  const renderScene = ({ route }: { route: { key: string } }) => {
    const date = new Date();
    date.setDate(today.getDate() + parseInt(route.key) - currentDay);
    return <DayView date={date.toISOString().split('T')[0]} />;
  };

  const renderLabel = ({ route, focused }: { route: { key: string; title: string }; focused: boolean }) => {
    const [day, date] = route.title.split(' ');
    return (
      <View style={[styles.labelContainer, focused && { backgroundColor: theme.colors.primary }]}>
        <Text style={[styles.dayLabel, focused && { color: theme.colors.onPrimary }]}>{day}</Text>
        <Text style={[styles.dateLabel, focused && { color: theme.colors.onPrimary }]}>{date}</Text>
      </View>
    );
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
          renderLabel={renderLabel}
          indicatorStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: theme.colors.background }}
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
  labelContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  dayLabel: {
    color: '#000',
    fontSize: 12,
  },
  dateLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeekView;