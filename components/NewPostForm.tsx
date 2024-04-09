import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import COLORS from '../styles/colors';
import IconButton from './common/IconButton';

const NewPostForm = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImageHandler = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
        aspect: [4, 3],
      });

      if (image.canceled) {
        setImage(null);
      } else {
        setImage(image.assets[0]);
      }
    } catch (error) {
      console.error(error);
      console.log('Failed to get image');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize='words'
            autoComplete='off'
            autoCorrect={false}
          />
        </View>
        <View style={styles.imagePickerContainer}>
          {!image && (
            <View style={{ flex: 1 }}>
              <Pressable
                android_ripple={{ color: COLORS.dark300 }}
                style={styles.imagePickerButton}
                onPress={pickImageHandler}
              >
                <Text style={{ color: COLORS.light500 }}>Pick an image</Text>
              </Pressable>
            </View>
          )}
          {image && (
            <View>
              <IconButton
                name='close-sharp'
                onPress={() => setImage(null)}
                color={COLORS.light300}
                size={20}
                style={styles.removeImageBtn}
              />
              <Image style={styles.image} source={{ uri: image.uri }} />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
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
  imagePickerContainer: {
    borderRadius: 10,
    height: 300,
    overflow: 'hidden',
  },
  imagePickerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark500,
  },
  image: {
    height: 300,
    width: '100%',
  },
  removeImageBtn: {
    position: 'absolute',
    right: 6,
    top: 6,
    backgroundColor: COLORS.dark300,
    zIndex: 10,
    borderRadius: 16,
    padding: 5,
    opacity: 0.7
  }
});
