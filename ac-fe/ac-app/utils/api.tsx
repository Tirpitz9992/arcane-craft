import { TodoCardProps } from '../components/TodoCard';

const API_URL = 'http://localhost:8080'; 

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