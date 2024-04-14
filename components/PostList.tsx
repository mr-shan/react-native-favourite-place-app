import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

import { IPost } from '../types/post';
import PostListItem from './PostListItem';

interface IProps {
  posts: IPost[];
}

const PostList = (props: IProps) => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  const postPressHandler = (postId: string) => {
    navigation.navigate('PostDetails', { id: postId });
    console.log(postId);
  };

  return (
    <FlatList
      data={props.posts}
      keyExtractor={(item: IPost) => item.id.toString()}
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
  },
});

export default PostList;
