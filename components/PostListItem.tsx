import { StyleSheet, View, Text, Image, Pressable, Platform } from 'react-native';

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
      <Pressable
        onPress={onPressHandler}
        android_ripple={{ color: COLORS.dark300 }}
        style={({ pressed }) => (pressed ? { opacity: 0.8 } : {})}
      >
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
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: GLOBAL_STYLES.borderRadius.xs,
  },
  header: {
    gap: 1,
    padding: 10,
    backgroundColor: COLORS.dark300,
    elevation: 10,
    ...GLOBAL_STYLES.iosShadow,
    borderBottomColor: COLORS.dark700,
    borderTopColor: COLORS.dark700,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  title: {
    fontSize: GLOBAL_STYLES.fontSizeMd,
    fontWeight: 'bold',
    color: COLORS.primary500,
    textAlign: 'center',
    letterSpacing: 1.2
  },
  description: {
    fontSize: GLOBAL_STYLES.fontSizeSm,
    color: COLORS.light300,
    textAlign: 'center',
  },
});
