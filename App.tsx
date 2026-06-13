/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View, LogBox } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './utils/NavigationService';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDetails from './app/screens/userList/UserDetails';
import UserList from './app/screens/userList/UserList';
import Home from './app/screens/Home';
import DynamicTodo from './app/screens/todo/DynamicTodo';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs()
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />+
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
              <Stack.Screen name="UserList" component={UserList} options={{ title: 'User List' }} />
              <Stack.Screen name="ViewDetails" component={UserDetails} options={{ title: 'User Details' }} />
              <Stack.Screen name="DynamicTodo" component={DynamicTodo} options={{ title: 'Dynamic Todo' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
