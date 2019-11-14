import * as React from 'react';
import { StyleSheet, Button, Image, View, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps'

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    latitude: null,
    longitude: null,
  };

  render() {
    let { image, latitude, longitude } = this.state;

    return (
      <React.Fragment>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        {latitude && longitude &&
          <View style={styles.container}>
              <MapView
                style={styles.mapStyle}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.0,
                  longitudeDelta: 0.0,
                }}
              >
                <Marker
                  coordinate={{latitude,
                  longitude}}
                  // title={"title"}
                  // description={"description"}
                />
              </MapView>
          </View>
        }
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });

    console.log(result)

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        latitude: result.exif.GPSLatitudeRef === 'N' ? result.exif.GPSLatitude : -result.exif.GPSLatitude,
        longitude: result.exif.GPSLatitudeRef === 'E' ? result.exif.GPSLongitude : -result.exif.GPSLongitude,
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2,
  },
});
