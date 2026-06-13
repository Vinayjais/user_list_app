/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View ,LogBox} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewDetails from './app/ViewDetails';
import UserList from'./app/UserList';
import { Provider } from 'react-redux';
import {store} from './store/store';
const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs()
function App() {
  const isDarkMode = useColorScheme() === 'dark';
   
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserList" component={UserList} options={{ title: 'User List' }} />
          <Stack.Screen name="ViewDetails" component={ViewDetails} options={{ title: 'User Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </Provider>
  );
}

export default App;
