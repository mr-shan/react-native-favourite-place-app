import { StyleSheet, Text, View } from 'react-native';

const AddNewPost = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add New Post</Text>
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

export default AddNewPost;
