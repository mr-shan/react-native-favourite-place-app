import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import AllPosts from './screens/AllPosts';
import AddNewPost from './screens/AddNewPost';
import PostDetails from './screens/PostDetails';
import MapViewLocationSelector from './screens/MapViewLocationSelector';

import COLORS from './styles/colors';
import IconButton from './components/common/IconButton';

import ContextProvider from './store/context';
import { initDb } from './store/db';

const RootStack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    initDb().then((value: boolean) => {
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <ContextProvider>
      <StatusBar style='light' />
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.dark500 },
            headerTintColor: COLORS.light500,
          }}
        >
          <RootStack.Screen
            component={AllPosts}
            name='AllPosts'
            options={(props) => {
              const onPressHandler = () => {
                props.navigation.navigate('AddNewPost');
              };
              return {
                title: 'All Posts',
                headerTransparent: true,
                headerStyle: {
                  backgroundColor:
                    Platform.OS === 'ios' ? 'transparent' : COLORS.dark500,
                },
                headerBlurEffect: 'dark',
                headerRight: (props) => (
                  <IconButton
                    name='add'
                    size={24}
                    color={props.tintColor}
                    onPress={onPressHandler}
                  />
                ),
              };
            }}
          />
          <RootStack.Screen
            component={PostDetails}
            name='PostDetails'
            options={{
              headerTransparent: true,
              headerStyle: {
                backgroundColor:
                  Platform.OS === 'ios' ? 'transparent' : COLORS.dark500,
              },
              headerBlurEffect: 'dark',
              headerBackTitleVisible: false,
            }}
          />
          <RootStack.Screen
            component={AddNewPost}
            name='AddNewPost'
            options={{
              title: 'New Post',
              headerTransparent: true,
              headerStyle: {
                backgroundColor:
                  Platform.OS === 'ios' ? 'transparent' : COLORS.dark500,
              },
              headerBlurEffect: 'dark',
              headerBackTitleVisible: false,
            }}
          />
          <RootStack.Screen
            component={MapViewLocationSelector}
            name='MapViewLocationSelector'
            options={{
              title: 'Select Location',
              headerTransparent: true,
              headerStyle: {
                backgroundColor:
                  Platform.OS === 'ios' ? 'transparent' : COLORS.dark500,
              },
              headerBlurEffect: 'dark',
              headerBackTitleVisible: false,
              presentation: 'modal',
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
