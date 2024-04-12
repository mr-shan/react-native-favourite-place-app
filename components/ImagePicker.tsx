import { StyleSheet, View, Text, Image, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';

import COLORS from '../styles/colors';
import IconButton from './common/IconButton';

interface IProps {
  image: ImagePicker.ImagePickerAsset | null
  onPickImage: (image: ImagePicker.ImagePickerAsset | null) => void
}

const ImagePickerForm = (props: IProps) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [permissionStatus, requestPermission] =
    ImagePicker.useCameraPermissions();

  const askForPermission = async () => {
    if (permissionStatus?.granted) return true;
    if (permissionStatus?.status === ImagePicker.PermissionStatus.DENIED)
      return false;

    try {
      const hasPermission = await requestPermission();
      return hasPermission.status === ImagePicker.PermissionStatus.GRANTED;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const pickImageHandler = async (operationType: number = 1) => {
    const hasPermission = await askForPermission();
    if (!hasPermission) {
      Alert.alert(
        'Failed to capture image',
        'Permission is denied to access the camera'
      );
      return;
    }

    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
        aspect: [4, 3],
      } as ImagePicker.ImagePickerOptions;

      let image;

      if (operationType === 0) {
        image = await ImagePicker.launchCameraAsync(options);
      } else if (operationType === 1) {
        image = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        return;
      }

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

  const setImage = (image: ImagePicker.ImagePickerAsset | null) => {
    props.onPickImage(image);
  }

  const onPress = () => {
    const options = ['Take a picture', 'Select a photo from gallery', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      pickImageHandler
    );
  };

  return (
    <View style={styles.imagePickerContainer}>
      {!props.image && (
        <View style={{ flex: 1 }}>
          <Pressable
            android_ripple={{ color: COLORS.dark300 }}
            style={styles.imagePickerButton}
            onPress={onPress}
          >
            <Text style={{ color: COLORS.light500 }}>Pick an image</Text>
          </Pressable>
        </View>
      )}
      {props.image && (
        <View>
          <IconButton
            name='close-sharp'
            onPress={() => setImage(null)}
            color={COLORS.light300}
            size={20}
            style={styles.removeImageBtn}
          />
          <Image style={styles.image} source={{ uri: props.image.uri }} />
        </View>
      )}
    </View>
  );
};

export default ImagePickerForm;

const styles = StyleSheet.create({
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
    opacity: 0.7,
  },
});
