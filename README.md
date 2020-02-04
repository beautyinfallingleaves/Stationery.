# Stationery.

A simple app for tying memories to maps, in the form of a postcard you can write on and send.

## Installation

This project was built using [Expo](https://expo.io/). The most basic approach to running it involves installing, configuring, and running Expo on your local machine. Here is Expo's [getting started guide](https://expo.io/learn).

Once you have Expo installed, you will need to:

1. Clone the project to your local machine.
2. Install modules and dependencies:
```bash
expo install  // Using expo install ensures Expo installs compatible versions of dependencies
```
3. Add a file named index.js to the /constants directory, which supplies a Firebase configuration object for photo URI storage. Please contact the author for a copy of this file (not included in this repository due to an exposed API key).
4. Start Expo from the command line:
```bash
expo start
```
5. From this point, you have some options: you can get the Expo app to use Stationery directly on your phone; or, launch an iOS or Andriod emulator and run it there.

## Notes on Deployment

This project includes both an Expo client app and a Node/Express server for dealing with email send requests (via a SendGrid integration).

By default, the client app points to the author's deployment on Heroku. You can point it to your own server deployment, but you will need to update the serverUrl in /constants/config.js to point to your server's address.

Further, if hosting your own server and using Expo to run the client app, you'll need to ensure that the server address is externally accessible ([ngrok](https://ngrok.com/) is a simple, free option for doing this).

## Usage

1. Take or choose a photo to create a postcard. (Disclaimer: Choose Photo's crop feature is currently wonky on iOS; Expo's camera roll selection forces you to use a square crop window. I will be attempting an alternative implementation in the future.)
2. Flip the postcard over to see a map of where it was taken (requires permission for your location and/or the photo to have embedded exif geocoordinates).
3. Hide the map if you don't want it included by pressing the Map icon.
4. Use the Pen icon to start drawing on your postcard (you can also draw on the photo on the front of the card).
5. When in drawing mode, you can undo previous strokes (Undo icon), or, discard your drawing entirely (Stack of Layers with Slash icon).
6. If you'd like to start over, press the Trash icon.
7. When you're ready to send your postcard, press the Paper Airplane, enter an email address, and once again hit the Paper Airplane to send it.

## Author

Chris Kang (GitHub: [beautyinfallingleaves](https://github.com/beautyinfallingleaves))
