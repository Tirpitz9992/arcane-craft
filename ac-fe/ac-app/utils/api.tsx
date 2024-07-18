import { TodoCardProps } from '../components/TodoCard';
import { Platform } from 'react-native';
import axios from 'axios';

const API_URL0 = 'http://localhost:8080'; 
const API_URL1 = 'http://192.168.88.198:8080';


const API_URL = Platform.select({
  ios: API_URL1,
  android: API_URL1,
  default: API_URL0,
});

export const fetchTasksForDate = async (date: string): Promise<TodoCardProps[]> => {
  try {
    console.log('Fetching tasks for date:', date);
    const response = await fetch(`${API_URL}/tasks?date=${date}`);
    console.log('Response:', response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
};

export const createTask = async (task: TodoCardProps) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};