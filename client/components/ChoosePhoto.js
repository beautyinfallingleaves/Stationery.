import * as React from 'react';
import {connect} from 'react-redux'
import {setImageData} from '../store/imageData'
import { StyleSheet, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

class ChoosePhoto extends React.Component {
  componentDidMount() {
    this.getPermissionAsync()
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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });

    if (!result.cancelled) {
      const GPSLatitude = result.exif.GPSLatitude
      const GPSLongitude = result.exif.GPSLongitude

      const latitude = result.exif.GPSLatitudeRef === 'N' ?
        GPSLatitude : -GPSLatitude
      const longitude = result.exif.GPSLatitudeRef === 'E' ?
        GPSLongitude : -GPSLongitude

      this.props.setImage({
        imageUri: result.uri,
        latitude,
        longitude,
      })
    }
  }

  render() {
    const { imageUri } = this.props.imageData

    return (
        <View style={styles.container}>
          {!imageUri ? (
            <View style={styles.content}>
              <Text style={{fontSize: 64, fontFamily: 'American Typewriter'}}>Stationery.</Text>
              <TouchableOpacity onPress={this._pickImage}>
                <Ionicons name="md-images" size={75} />
              </TouchableOpacity>
            </View>
          ) : (
            <Image
              source={{ uri: imageUri }}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </View>
    );
  }
}

const mapState = state => {
  return {
    imageData: state.imageData,
  }
}

const mapDispatch = dispatch => {
  return {
    setImage: (imageData) => dispatch(setImageData(imageData))
  }
}

export default connect(mapState, mapDispatch)(ChoosePhoto)

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
