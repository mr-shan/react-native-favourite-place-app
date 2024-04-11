import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as Location from 'expo-location';

import COLORS from '../styles/colors';

interface IProps {
  mapImageUri: string;
}

const LocationPicker = (props: IProps) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = async () => {
    setIsLoading(true);
    const locationObj = await Location.requestForegroundPermissionsAsync();
    if (locationObj.status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      setIsLoading(false);
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Highest,
      });
      setLocation(location);
      return { lat: location.coords.latitude, long: location.coords.longitude };
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const onPressLocation = async () => {
    const coordinates = await getLocation();
    console.log(coordinates);
    navigation.navigate('MapViewLocationSelector', {
      coordinates: coordinates,
    });
  };

  const label = isLoading
    ? 'Fetching your location, please wait!'
    : 'Click here to pick a location';

  return (
    <View style={styles.locationPicker}>
      {!props.mapImageUri && (
        <View style={{ flex: 1 }}>
          <Pressable
            android_ripple={{ color: COLORS.dark300 }}
            style={styles.locationPickerButton}
            onPress={onPressLocation}
          >
            {isLoading && <ActivityIndicator style={{marginBottom: 10}}/>}
            <Text style={{ color: COLORS.light500 }}>{label}</Text>
          </Pressable>
        </View>
      )}
      {props.mapImageUri && (
        <Image style={styles.image} source={{ uri: props.mapImageUri }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    borderRadius: 10,
    height: 300,
    overflow: 'hidden',
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
  },
  locationPickerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark500,
  },
  image: {
    height: 300,
    width: '100%',
  },
});

export default LocationPicker;
