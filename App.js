import React, {useState, useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ImageBackground, ActivityIndicator  } from 'react-native';
import axios from 'axios';

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
      <ImageBackground
        source={require('./assets/bg.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View>
        <TextInput 
          placeholder='Enter city name...'
          onChangeText={text => setInput(text)}  
          value={input}
          placeholderTextColor={'#000'}
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
              {`${data?.location?.name}, ${data?.location?.region}, ${data?.location?.country}`}
            </Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>{`${Math.round(data?.current?.temp_c)}°C`}</Text>
            <Text style={styles.conditionText}>{`${data?.current?.condition?.text}`}</Text>
          </View>
        )}
      </ImageBackground>
      
    </View>
    
    
  );
}
console.reportErrorsAsExceptions = false;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
  },

  textInput: {
    height: 10,
    borderWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    fontSize: 19,
    borderRadius: 16,
    borderColor: '#df8e00',
  },
  infoView: {
    alignItems: 'center',
  },
  cityText: {
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'red',
    fontSize: 15,
    marginVertical: 20,
  },
  tempText: {

  },
  conditionText: {

  },
});
