import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import COLORS from '../styles/colors';
import NewPostForm from '../components/NewPostForm';

const AddNewPost = () => {
  const headerHeight = useHeaderHeight();

  return (
    <ScrollView style={[styles.container, { paddingTop: headerHeight }]}>
      <NewPostForm />
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
  },
});

export default AddNewPost;
