import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import COLORS from '../styles/colors';
import NewPostForm from '../components/NewPostForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Route } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { IPost } from '../types/post';
import { AppContext } from '../store/context';

interface IRouteParams {
  imageUri: string
}

interface IProps {
  navigation: NativeStackNavigationProp<any>;
  route: Route<string, IRouteParams>
}

const AddNewPost = (props: IProps) => {
  const context = useContext(AppContext);
  const headerHeight = useHeaderHeight();
  const [mapImageUri, setMapImageUri] = useState('');

  const addNewPlaceHandler = (payload: IPost) => {
    context.addNewPlace(payload);
    props.navigation.navigate('AllPosts');
  }

  useEffect(() => {
    if (props.route.params?.imageUri) {
      setMapImageUri(props.route.params.imageUri)
    }
  }, [props.navigation, props.route])

  return (
    <ScrollView style={styles.container}>
      <View style={{height: headerHeight}}></View>
      <NewPostForm mapImageUri={mapImageUri} onAddNewPlace={addNewPlaceHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark700,
  },
  text: {
    fontSize: 18,
  },
});

export default AddNewPost;
