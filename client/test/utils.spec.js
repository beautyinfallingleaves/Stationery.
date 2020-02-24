import {
  processPhotoData,
  uploadImageToFirebaseStorage
} from '../utils'
import { expect } from 'chai'
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


xdescribe('utils', function() {
  describe('processPhotoData', function() {
    // accepts a photo uri along with latitude and longitude data
    // sets correct image in Redux state with uri, latitude, and longitude
  })

  describe('uploadImageToFirebaseStorage', function() {
    it('returns a valid firebase storage url when supplied a uri', async function() {
      const mockImage = require('./__mocks__/icon.png')

      // hmmm... this doesn't work because XMLHttpRequest(used in the function under test) is a browser object. Need to find an alternative way of doing this.
      const result = await uploadImageToFirebaseStorage(mockImage)

      expect(result.slice(0, 23)).to.equal('https://firebasestorage')
    })
  })
})
