import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

import GLOBAL_STYLES from './../styles/styles';

import { IPost } from '../types/post';
import COLORS from '../styles/colors';

interface IProps {
  post: IPost;
  onPress: (id: string) => void;
}

const PostListItem = (props: IProps) => {
  const onPressHandler = () => {
    props.onPress(props.post.id);
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressHandler}>
        <Image style={styles.image} source={{ uri: props.post.image }} />
        <View style={styles.header}>
          <Text style={styles.title}>{props.post.name}</Text>
          <Text style={styles.description}>{props.post.location}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default PostListItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: GLOBAL_STYLES.borderRadius.sm,
    elevation: GLOBAL_STYLES.elevation,
    ...GLOBAL_STYLES.iosShadow,
    padding: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.light500,
    margin: 4,
    marginBottom: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: GLOBAL_STYLES.borderRadius.xs,
  },
  header: {
    paddingTop: 10,
    gap: 1
  },
  title: {
    fontSize: GLOBAL_STYLES.fontSizeMd,
    fontWeight: 'bold',
    color: COLORS.dark500,
  },
  description: {
    fontSize: GLOBAL_STYLES.fontSizeSm,
    color: COLORS.dark500,
  },
});
