import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import COLORS from '../styles/colors';
import PostList from '../components/PostList';
import { AppContext } from '../store/context';
import { getAllPlaces } from '../store/db';
import { IPost } from '../types/post';

const AllPosts = () => {
  const isFocused = useIsFocused();
  const [places, setPlaces] = useState([] as IPost[]);
  const context = useContext(AppContext);

  useEffect(() => {
    getAllPlaces().then((value: any) => {
      const placesVal = value.rows.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          location: item.location,
          image: item.image,
        };
      });
      setPlaces(placesVal);
    });
  }, [isFocused]);

  if (context.favoritePlaces.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: 120, gap: 10 }]}>
        <Text style={styles.noPlacesFoundText}>
          No favorite place added yet!
        </Text>
        <Text style={styles.noPlacesFoundText}>Start adding some 😀</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <PostList posts={places} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark500,
  },
  noPlacesFoundText: {
    fontSize: 16,
    color: COLORS.light300,
    textAlign: 'center',
  },
});

export default AllPosts;
