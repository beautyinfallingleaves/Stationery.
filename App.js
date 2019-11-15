import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Postcard} from './client/components'
import * as MagicMove from 'react-native-magic-move'

export default function App() {
  return (
    <MagicMove.Provider>
      <View style={styles.container}>
        <Postcard latitude={41.34} longitude={-87.58} />
      </View>
    </MagicMove.Provider>
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
