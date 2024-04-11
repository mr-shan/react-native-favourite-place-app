import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import AllPosts from './screens/AllPosts';
import AddNewPost from './screens/AddNewPost';
import PostDetails from './screens/PostDetails';
import MapViewLocationSelector from './screens/MapViewLocationSelector';

import COLORS from './styles/colors';
import IconButton from './components/common/IconButton';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <>
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
          <RootStack.Screen component={PostDetails} name='PostDetails' />
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
    </>
  );
}
