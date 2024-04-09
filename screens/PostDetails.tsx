import { StyleSheet, Text, View } from 'react-native';

const PostDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default PostDetails;
