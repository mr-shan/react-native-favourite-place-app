import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp } from '@react-navigation/native';

import COLORS from '../styles/colors';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { IPost } from '../types/post';
import { getPlaceById } from '../store/db';
import GLOBAL_STYLES from '../styles/styles';

interface IRouteParams {
  imageUri: string;
}

interface IProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const PostDetails = (props: IProps) => {
  const headerHeight = useHeaderHeight();
  const [postData, setPostData] = useState<IPost | null>(null);
  const [error, setIsError] = useState('');

  const openMapView = () => {
    if (!postData) return;

    props.navigation.navigate('MapViewLocationSelector', {
      coordinates: {
        lat: postData?.coordinates.latitude,
        long: postData?.coordinates.longitude,
      },
      readOnly: true,
    });
  };

  useEffect(() => {
    const postId = props.route?.params?.id || '';
    setPostData(null);
    if (!postId) {
      setIsError('Invalid ID received.');
      return;
    }
    getPlaceById(postId)
      .then((result: any) => {
        if (!result.rows.length)
          throw Error('The place you are looking for does not exists.');
        setPostData({
          id: result.rows[0].id,
          name: result.rows[0].name,
          coordinates: {
            latitude: result.rows[0].latitude,
            longitude: result.rows[0].longitude,
          },
          image: result.rows[0].image,
          location: result.rows[0].location,
          locationSnapShot: result.rows[0].locationSnapshot,
        });
        props.navigation.setOptions({ title: result.rows[0].name });
      })
      .catch((error: any) => {
        setIsError(error?.message || error || 'Failed to get place details.');
      });
  }, [props.route.params]);

  if (!postData) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Fetching place details, please wait!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ height: headerHeight }}></View>
      <Image source={{ uri: postData?.image }} style={styles.image} />
      <View style={styles.header}>
        <Text style={styles.title}>{postData?.name}</Text>
        <Text style={styles.address}>{postData?.location}</Text>
      </View>

      <View style={styles.locationWrapper}>
        <Image
          source={{ uri: postData?.locationSnapShot }}
          style={styles.mapImage}
        />
        <Pressable style={styles.seeLocationBtn} onPress={openMapView} >
          <Text style={{ color: COLORS.secondary500 }}>
            View location on map
          </Text>
        </Pressable>
      </View>
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
    textAlign: 'center',
    color: COLORS.light300,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  header: {
    backgroundColor: COLORS.dark500,
    paddingVertical: 8,
    gap: 4,
    ...GLOBAL_STYLES.iosShadow,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    color: COLORS.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  address: {
    color: COLORS.secondary500,
    textAlign: 'center',
  },
  locationWrapper: {
    alignItems: 'center',
    gap: 20,
    marginTop: 30,
  },
  mapImage: {
    height: 100,
    width: 200,
    borderRadius: 10,
  },
  seeLocationBtn: {
    borderColor: COLORS.secondary500,
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});

export default PostDetails;
