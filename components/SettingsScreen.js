import React from 'react';
import { 
          StyleSheet,
          Text, 
          View,
        } from 'react-native';
import Slider from '@react-native-community/slider';

function SettingsScreen() {


    return (
      <View style={styles.containerView}>
        <View style={styles.childView}>
          <Text>Temperature units</Text>
        </View>
        <View style={styles.childView}>
          <Text>Font Size</Text>
        </View>
        <View style={styles.childView}>
           <Text>Sounds Effects</Text>
        </View>
        <View style={styles.childView}>
          <Text>Brightness</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="red"
            step={0.1}
          />
          </View>  
        <View style={{ margin: 5, borderWidth: 2, width: '90%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Weather Time</Text>
          <Text style={{ fontSize: 10, }}>Version: 1.0</Text>
          <Text style={{ fontSize: 10, }}>Bult date: 27 February 2022</Text>
          <Text style={{ fontSize: 10, }}>Developer: John Pereira</Text>
          <Text style={{ fontSize: 10, }}>Student Number: 5555</Text>
        </View>  
        
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    containerView: {
        flex: 3, 
        alignItems: 'center', 
        justifyContent: 'center' 
      },
      childView: {
        margin: 5, 
        borderWidth: 2, 
        width: '90%', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
  });
  
  export default SettingsScreen;