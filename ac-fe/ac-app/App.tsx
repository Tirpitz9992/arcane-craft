import { StyleSheet, Text, View } from 'react-native';
import MainTabNavigator from './components/navigation/BottomNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import themeTIZ from './components/theme/theme';

export default function App() {
  return (
    <PaperProvider theme={themeTIZ}>
      <MainTabNavigator/>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
