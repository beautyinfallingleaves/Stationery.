import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Postcard, ImagePickerExample, Sketch} from './client/components'


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      <Postcard latitude={41.34} longitude={-87.58} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
