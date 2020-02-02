import * as firebase from 'firebase'
import uuid from 'uuid'
import store from '../store'
import { setImageData } from '../store/imageData'

// ***************************************
// Update redux imageData with supplied photo

export const processPhotoData = (photo) => {
  const GPSLatitude = photo.exif.GPSLatitude
    const GPSLongitude = photo.exif.GPSLongitude

    const latitude = photo.exif.GPSLatitudeRef === 'N' ?
      GPSLatitude : -GPSLatitude
    const longitude = photo.exif.GPSLatitudeRef === 'E' ?
      GPSLongitude : -GPSLongitude

    store.dispatch(setImageData({
      imageUri: photo.uri,
      latitude,
      longitude,
    }))
}

// ***************************************
// Upload an image uri to Firebase Storage

export const uploadImageToFirebaseStorage = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

