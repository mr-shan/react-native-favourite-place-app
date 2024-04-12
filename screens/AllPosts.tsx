import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import COLORS from '../styles/colors';
import PostList from '../components/PostList';
import { AppContext } from '../store/context';

const AllPosts = () => {
  const context = useContext(AppContext)
  if (context.favoritePlaces.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: 120, gap: 10 }]}>
        <Text style={styles.noPlacesFoundText}>No favorite place added yet!</Text>
        <Text style={styles.noPlacesFoundText}>Start adding some 😀</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View>
        <PostList posts={context.favoritePlaces} />
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
    textAlign: 'center'
  },
});

export default AllPosts;
