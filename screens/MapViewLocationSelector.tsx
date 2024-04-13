import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useState, useLayoutEffect, useRef, LegacyRef, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, {
  MapPressEvent,
  Region,
  Marker,
  MarkerDragStartEndEvent,
} from 'react-native-maps';
import IconButton from '../components/common/IconButton';

interface IProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>
}

const MapViewLocationSelector = (props: IProps) => {
  const coordinate = props.route.params?.coordinates

  const [zoomLevel, setZoomLevel] = useState(20);
  const [mapRef, setMapRef] = useState<MapView | null>(null);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: coordinate.lat || 0,
    longitude: coordinate.long || 0,
  });

  const selectLocationHandler = (
    event: MapPressEvent | MarkerDragStartEndEvent
  ) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };
  const finishLocation = () => {
    if (selectedLocation.latitude === 0 && selectedLocation.longitude === 0) {
      Alert.alert('Please select a location by taping on the map before you continue');
      return;
    }
    setZoomLevel(16)
    setTimeout(() => {
      mapRef?.fitToCoordinates([selectedLocation], { animated: false })
      setTimeout(() => {
        takeSnapshotAndReturn()
      }, 250)
    }, 250)
  };
  const takeSnapshotAndReturn = () => {
    const snapshot = mapRef?.takeSnapshot({
      width: 300,      // optional, when omitted the view-width is used
      height: 300,     // optional, when omitted the view-height is used
      // region: {..},    // iOS only, optional region to render
      format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file'   // result types: 'file', 'base64' (default: 'file')
    });
    snapshot?.then((uri: string) => {
      props.navigation.navigate('AddNewPost', { imageUri: uri })
    })
  }

  const regionOptions = {
    latitude: selectedLocation.latitude || 18.51957,
    longitude: selectedLocation.longitude || 73.85535,
    longitudeDelta: coordinate ? 0.005 : 0.1,
    latitudeDelta: coordinate ? 0.005 : 0.1,
  } as Region;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: (props) => (
        <IconButton
          name='checkmark'
          onPress={finishLocation}
          color={props.tintColor}
          size={24}
        />
      ),
    } as NativeStackNavigationOptions);
  }, [mapRef, props.navigation, selectedLocation, zoomLevel]);

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => setMapRef(ref)}
        style={styles.map}
        initialRegion={regionOptions}
        zoomControlEnabled={true}
        onPress={selectLocationHandler}
        maxZoomLevel={zoomLevel}

      >
        <Marker
          draggable
          coordinate={selectedLocation}
          onDragEnd={selectLocationHandler}
        />
      </MapView>
    </View>
  );
};

export default MapViewLocationSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
