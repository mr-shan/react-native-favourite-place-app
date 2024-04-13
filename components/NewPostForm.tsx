import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import COLORS from '../styles/colors';
import ImagePickerForm from './ImagePicker';
import LocationPicker from './LocationPicker';

import { IPost } from '../types/post';

interface IProps {
  mapImageUri: string;
  onAddNewPlace: (payload: IPost) => void;
}

const NewPostForm = (props: IProps) => {

  const [name, setName] = useState({
    value: '',
    isValid: false,
  });
  const [addressString, setAddressString] = useState({
    value: '',
    isValid: false,
  });

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const pickImageHandler = (image: ImagePicker.ImagePickerAsset | null) => {
    setImage(image);
  };
  const pickLocationHandler = (newLocation: Location.LocationObject | null) => {
    setLocation(newLocation);
  };

  const submitHandler = () => {
    if (image && location && name.value && props.mapImageUri) {
      props.onAddNewPlace({
        id: Date.now().toString(),
        name: name.value,
        image: image.uri,
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        location: addressString.value,
        locationSnapShot: props.mapImageUri,
      });
    } else {
      Alert.alert(
        'Invalid place data',
        'Please select all the things before submit'
      );
    }
  };

  return (
    <ActionSheetProvider>
      <ScrollView style={styles.container}>
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
                setName({ isValid: true, value: text })
              }
            />
          </View>
          <View style={[styles.inputContainer, { marginTop: 0}]}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              value={addressString.value}
              onChangeText={(text: string) =>
                setAddressString({ isValid: true, value: text })
              }
            />
          </View>
          <ImagePickerForm image={image} onPickImage={pickImageHandler} />
          <LocationPicker
            mapImageUri={props.mapImageUri}
            onPickLocation={pickLocationHandler}
            location={location}
          />
          <View>
            <Pressable onPress={submitHandler} style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Add Place</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  submitBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.dark300,
    marginVertical: 20
  },
  submitBtnText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.light300
  }
});
