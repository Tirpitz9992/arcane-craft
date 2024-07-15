import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import themeTIZ from './components/theme/theme';
import MainStackNavigator from './components/navigation/Stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <PaperProvider theme={themeTIZ}>
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
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
