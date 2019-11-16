import React from 'react';
import { NativeRouter, Route } from 'react-router-native'
import {Home, PostcardView, ImagePickerExample} from './client/components'

export default function App() {
  return (
    <NativeRouter>
      <Route exact path='/' component={Home} />
      <Route path='/PostcardView' component={PostcardView} />
      <Route path='/ImagePickerExample' component={ImagePickerExample} />
    </NativeRouter>
  );
}
