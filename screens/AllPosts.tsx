import { ScrollView, StyleSheet, Text, View } from 'react-native';

import COLORS from '../styles/colors';
import PostList from '../components/PostList';
import { IPost } from '../types/post';

const AllPosts = () => {
  const posts: IPost[] = [
    {
      id: 'p1',
      name: 'First Post',
      location: 'Kharadi, Pune',
      coordinates: { latitude: '', longitude: '' },
      image:
        'https://cdn.evopresse.ca/content/user_files/sites/2/2023/04/21001719/COuellet_Everest-1.jpg',
    },
    {
      id: 'p2',
      name: 'First Post',
      location: 'Kharadi, Pune',
      coordinates: { latitude: '', longitude: '' },
      image:
        'https://cdn.evopresse.ca/content/user_files/sites/2/2023/04/21001719/COuellet_Everest-1.jpg',
    },
    {
      id: 'p3',
      name: 'First Post',
      location: 'Kharadi, Pune',
      coordinates: { latitude: '', longitude: '' },
      image:
        'https://cdn.evopresse.ca/content/user_files/sites/2/2023/04/21001719/COuellet_Everest-1.jpg',
    },
  ];
  return (
    <View style={styles.container}>
      <View>
        <PostList posts={posts} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark500,
  },
  text: {
    fontSize: 18,
    color: COLORS.secondary500,
  },
});

export default AllPosts;
