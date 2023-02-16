import { createTheme, genPageTheme, lightTheme, darkTheme, shapes } from '@backstage/theme';

export const stneLightTheme = createTheme({
  palette: {
      ...lightTheme.palette,
      primary: { main: '#28A472' },
      secondary: { main: '#3ACF94' },
      error: { main: '#CE6278'},
      warning: { main: '#F1D13F' },
      info: { main: '#4770B8' },
      success: { main: '#40C6A9' },
      background: {
        default: '#EBECEA',
        paper: '#EBECEA',
      },
      banner: {
        info: '#4770B8',
        error: '#CE6278',
        text: '#343b58',
        link: '#3ACF94',
      },
      errorBackground: '#CE6278',
      warningBackground: '#F1D13F',
      infoBackground: '#343b58',
      navigation: {
        background: '#272727',
        indicator: '#2EBF85',
        color: '#EBECEA',
        selectedColor: '#ffffff',
      },
    },
    defaultPageTheme: 'home',
    /* below drives the header colors */
    pageTheme: {
      home: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      documentation: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      tool: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      service: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      website: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      library: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      other: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      app: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      apis: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
    },
});

export const stneDarkTheme = createTheme({
  palette: {
      ...darkTheme.palette,
      primary: { main: '#28A472' },
      secondary: { main: '#3ACF94' },
      error: { main: '#CE6278'},
      warning: { main: '#F1D13F' },
      info: { main: '#4770B8' },
      success: { main: '#40C6A9' },
      background: {
        default: '#333',
        paper: '#333',
      },
      banner: {
        info: '#4770B8',
        error: '#CE6278',
        text: '#343b58',
        link: '#3ACF94',
      },
      errorBackground: '#CE6278',
      warningBackground: '#F1D13F',
      infoBackground: '#343b58',
      navigation: {
        background: '#272727',
        indicator: '#2EBF85',
        color: '#EBECEA',
        selectedColor: '#ffffff',
      },
    },
    defaultPageTheme: 'home',
    /* below drives the header colors */
    pageTheme: {
      home: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.round }),
      documentation: genPageTheme({
        colors: ['#14AA4B', '#2EBF85'],
        shape: shapes.round,
      }),
      tool: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.round }),
      service: genPageTheme({
        colors: ['#14AA4B', '#2EBF85'],
        shape: shapes.wave,
      }),
      website: genPageTheme({
        colors: ['#14AA4B', '#2EBF85'],
        shape: shapes.wave,
      }),
      library: genPageTheme({
        colors: ['#14AA4B', '#2EBF85'],
        shape: shapes.wave,
      }),
      other: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      app: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
      apis: genPageTheme({ colors: ['#14AA4B', '#2EBF85'], shape: shapes.wave }),
    },
});