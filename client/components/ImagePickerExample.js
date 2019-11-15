import * as React from 'react';
import { StyleSheet, Button, Image, View, Dimensions } from 'react-native';
import { ScreenOrientation } from 'expo'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ImagePickerExample extends React.Component {
  constructor() {
    super()
    this.state = {
      image: null,
    };
  }

  componentDidMount() {
    this.getPermissionAsync()
  }

  render() {
    let { image } = this.state;

    return (
      <React.Fragment>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Choose a memory to share with a friend."
            onPress={this._pickImage}
          />
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      </React.Fragment>
    );
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
