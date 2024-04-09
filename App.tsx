import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllPosts from './screens/AllPosts';
import AddNewPost from './screens/AddNewPost';
import PostDetails from './screens/PostDetails';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style="auto" />
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen component={AllPosts} name='AllPosts'/>
        <RootStack.Screen component={PostDetails} name='PostDetails'/>
        <RootStack.Screen component={AddNewPost} name='AddNewPost'/>
      </RootStack.Navigator>
    </NavigationContainer>
    </>
  );
}
