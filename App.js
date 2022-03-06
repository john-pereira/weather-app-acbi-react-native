import React, {useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
          StyleSheet,
          Text, View,
          TextInput,
          ImageBackground,
          ActivityIndicator,
          Image,
          TouchableOpacity,
        } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

function HomeScreen() {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const celsius = "°C" || "";

  const api = {
    key: '8042b8e6dbc947fe8eb05849222402',
    baseUrl: 'http://api.weatherapi.com/v1/',
  }
  const fetchDataHandle = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: "GET",
      url: `http://api.weatherapi.com/v1/current.json?key=${api.key}&q=${input}&aqi=yes`,
    })
    .then(res=> {
      console.log(res.data);
      setData(res.data);
    })
    .catch(e => console.dir(e))
    .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.container}>
         {/*  <ImageBackground
            source={require('./assets/bg11.jpg')}
            resizeMode="cover"
            style={styles.image}> */}
            <View>
            <TextInput 
              placeholder='Enter city name...'
              onChangeText={text => setInput(text)}  
              value={input}
              placeholderTextColor={'black'}
              style={styles.textInput}
              onSubmitEditing={fetchDataHandle}
            />
            </View>
            {loading && (
              <View>
                <ActivityIndicator size={'large'} color="#000" />
              </View>
            )}

            {data && (
              <View style={styles.infoView}>
                <Text style={styles.cityText}>
                  {`${data?.location?.name || ""} - ${data?.location?.region || "Weather Time APP"} - ${data?.location?.country || ""}`}
                </Text>
                <Text style={styles.dateText}>{`${data?.location?.localtime ?? ""}`}</Text>
                <Text style={styles.tempText}>{`${data?.current?.temp_c == undefined ? data?.current?.temp_c ?? "" : data?.current?.temp_c + celsius} `}</Text>
                
                <Text style={styles.conditionText}>{`${data?.current?.condition?.text ?? ""}`}</Text>
                <Image style={styles.imageIcon} source={{uri: `https//cdn.weatherapi.com/weather/64x64/day/296.png`}} />

                {/* <Image style={styles.imageIcon} source={{uri: `https//cdn.weatherapi.com/weather/64x64/day/296.png`}} /> */}

              </View>
            )}
          {/* </ImageBackground> */}
        </View>
  );
}


function SettingsScreen() {
 
  return (
    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ margin: 5, borderWidth: 2, width: '90%', alignItems: 'center', justifyContent: 'center'  }}>
        <Text>Temperature units</Text>
      </View>
      <View style={{ margin: 5, borderWidth: 2, width: '90%', alignItems: 'center', justifyContent: 'center'  }}>
        <Text>Font Size</Text>
      </View>
      <View style={{ margin: 5, borderWidth: 2, width: '90%', alignItems: 'center', justifyContent: 'center'  }}>
         <Text>Sounds Effects</Text>
      </View>
      <View style={{ margin: 5, borderWidth: 2, width: '90%', alignItems: 'center', justifyContent: 'center'  }}>
        <Text>Brightness</Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="red"
        />
        </View>  
      <View style={{ margin: 5, borderWidth: 2, width: '90%', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Weather Time</Text>
        <Text style={{ fontSize: 10, }}>Version: 1.0</Text>
        <Text style={{ fontSize: 10, }}>Bult date: 27 February 2022</Text>
        <Text style={{ fontSize: 10, }}>Developer: John Pereira</Text>
        <Text style={{ fontSize: 10, }}>Student Number: 16515</Text>
      </View>  
      
      
    </View>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
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
  container: {
    flex: 1,
    backgroundColor: '#cedaeb',
  },

  image: {
    flex: 1,
  },
  imageIcon: {
    resizeMode: 'contain',
    flex: 0.1,
    aspectRatio: 1,
    backgroundColor: '#ffffff'
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 25,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    fontSize: 19,
    borderRadius: 6,
    borderColor: 'rgba(52, 52, 52, 0.8)',
  },
  infoView: {
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 16,
    borderColor: 'transparent',
  },
  cityText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'black',
    fontSize: 15,
    marginVertical: 20,
  },
  tempText: {
    color: 'black',

  },
  conditionText: {
    color: 'black',

  },
  imageIcon: {
    resizeMode: 'contain',
    flex: 0.1,
    aspectRatio: 1,
    backgroundColor: '#ffffff'
  },
});
