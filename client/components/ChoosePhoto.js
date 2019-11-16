import * as React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ChoosePhoto extends React.Component {
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
        <View style={styles.container}>
          {!image ? (
            <View style={styles.content}>
              <Text style={{fontSize: 64, fontFamily: 'American Typewriter'}}>Stationery.</Text>
              <TouchableOpacity onPress={this._pickImage}>
                <Ionicons name="md-images" size={75} />
              </TouchableOpacity>
            </View>
          ) : (
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          )}
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
