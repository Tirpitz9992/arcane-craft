import { DefaultTheme, configureFonts } from 'react-native-paper';

const themeTIZ = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ADD8E6', 
    secondary: '#FFC0CB', 
    surface: '#FFFFFF', 
    background: '#FFE4E1', 
  },
  //fonts: configureFonts(fontConfig),
};

export default themeTIZ;