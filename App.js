import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Postcard} from './client/components'


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      <Postcard />
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
