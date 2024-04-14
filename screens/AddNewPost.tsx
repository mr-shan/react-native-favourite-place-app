import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import COLORS from '../styles/colors';
import NewPostForm from '../components/NewPostForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { IPost } from '../types/post';
import { addPlace } from '../store/db';

interface IRouteParams {
  imageUri: string
}

interface IProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>
}

const AddNewPost = (props: IProps) => {
  const headerHeight = useHeaderHeight();
  const [mapImageUri, setMapImageUri] = useState('');

  const addNewPlaceHandler = (payload: IPost) => {
    addPlace(payload).then(() => {
      props.navigation.navigate('AllPosts');
    })
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
