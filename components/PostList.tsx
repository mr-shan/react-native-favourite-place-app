import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { IPost } from '../types/post';
import PostListItem from './PostListItem';
import COLORS from '../styles/colors';

interface IProps {
  posts: IPost[];
}

const PostList = (props: IProps) => {
  const headerHeight = useHeaderHeight();

  const postPressHandler = (postId: string) => {
    console.log(postId);
  };

  if (props.posts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPostText}>
          No post found. Start by adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={props.posts}
      keyExtractor={(item: IPost) => item.id}
      renderItem={(info: ListRenderItemInfo<IPost>) => (
        <PostListItem post={info.item} onPress={postPressHandler} />
      )}
      contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 32 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark500,
  },
  noPostText: {
    fontSize: 16,
    color: COLORS.light300,
  },
});

export default PostList;
