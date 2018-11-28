/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';

export default class App extends Component {
  state = {
    granted: false
  }
  componentWillMount() {
    const grant = () => {
      this.setState({granted: true})
    }
    async function requestCameraPermission() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              'title': 'Cool Photo App Camera Permission',
              'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            grant();
          } else {
            console.warn("Camera permission denied")
          }
  
        } catch (err) {
          console.warn(err)
        }
      }
    }

    requestCameraPermission();
  }
  render() {
    return (
      <View>
        {
          this.state.granted ?
          <CameraKitCameraScreen
              actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
              onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
              scanBarcode={true}
              laserColor={"blue"}
              frameColor={"yellow"}

              onReadQRCode={((event) => Alert.alert("Qr code found"))} //optional
              hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
              showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
              offsetForScannerFrame = {10}   //(default 30) optional, offset from left and right side of the screen
              heightForScannerFrame = {300}  //(default 200) optional, change height of the scanner frame
              colorForScannerFrame = {'red'} //(default white) optional, change colot of the scanner frame
          />
          :
          <Text>error de permisos</Text>
        }

      </View>
    );
  }
}
