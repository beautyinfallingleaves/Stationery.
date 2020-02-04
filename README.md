# Stationery.

A simple app for tying memories to maps, in the form of a postcard you can write on and send.

## Installation

1. This project was built using [Expo](https://expo.io/). The most basic approach to running this app involves installing, configuring, and running Expo on your local machine. Here is Expo's [getting started guide](https://expo.io/learn).

Once you have Expo installed, you will need to:

2. Clone the project to your local machine.
3. Install modules and dependencies:
```bash
expo install  // Using expo install lets Expo ensure compatible versions of dependencies are installed
```
4. Start Expo from the command line:
```bash
expo start
```
5. From this point, you have some options. You can get the Expo app to use Stationery directly on your phone; or, launch an iOS or Andriod emulator and run it there.


## Usage

1. Take or choose a photo to create a postcard. (Disclaimer: Choose Photo's crop feature is currently wonky on iOS; Expo's camera roll selection forces you to use a square crop window. I will be attempting an alternative implementation in the future.)
2. Flip the postcard over to see a map of where it was taken (requires permission for your location and/or the photo to have embedded exif geocoordinates).
3. Hide the map if you don't want it included by pressing the Map icon.
4. Use the Pen icon to start drawing on your postcard (you can also draw on the photo on the front of the card).
5. When in drawing mode, you can undo previous strokes (Undo icon), or, discard your drawing entirely (stack of layers with a slash through it).
6. If you'd like to start over, press the Trash icon.
7. When you're ready to send your postcard, press the Paper Airplane, enter an email address, and once again hit the Paper Airplane to send it.
