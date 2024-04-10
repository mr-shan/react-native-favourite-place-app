import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import COLORS from '../styles/colors';
import ImagePickerForm from './ImagePicker';

const NewPostForm = () => {
  const [name, setName] = useState({
    value: '',
    isValid: false,
  });
  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize='words'
              autoComplete='off'
              autoCorrect={false}
              value={name.value}
              onChangeText={(text: string) =>
                setName({ isValid: true, value: text.trim() })
              }
            />
          </View>
          <ImagePickerForm />
        </KeyboardAvoidingView>
      </View>
    </ActionSheetProvider>
  );
};

export default NewPostForm;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 10,
    gap: 10,
    marginBottom: 10,
  },
  label: {
    color: COLORS.light300,
    fontSize: 16,
    paddingLeft: 4,
  },
  textInput: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: COLORS.dark500,
    color: COLORS.light500,
  },
});
