import React from 'react';
import { 
          StyleSheet,

        } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            
            if (route.name === 'Home') {
              iconName = 'home';
            }
            if (route.name === 'Settings'){
              iconName = 'settings';
            }
             return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }}/>
      </Tab.Navigator>
    </NavigationContainer>
    
    
    
  );
}
console.reportErrorsAsExceptions = false;


const styles = StyleSheet.create({
  
});
