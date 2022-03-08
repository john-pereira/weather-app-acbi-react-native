import React, {useState, useCallback} from 'react';
import { 
          StyleSheet,
          Text, View,
          TextInput,
          ActivityIndicator,
          Image,
        } from 'react-native';
import axios from 'axios';

function HomeScreen() {
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const celsius = "°C" || "";
    const weatherTemp = "Temperature: ";
    const weatherTime = "Local Date/Time: ";
    const weatherDesc = "Condiion: ";
  
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
            <Text style={styles.dateText}>{`${data?.location?.localtime == undefined ? data?.location?.localtime ?? "" : weatherTime + data?.location?.localtime }`}</Text>
            <Text style={styles.tempText}>{`${data?.current?.temp_c == undefined ? data?.current?.temp_c ?? "" : weatherTemp + data?.current?.temp_c + celsius} `}</Text>
            <Text style={styles.conditionText}>{`${data?.current?.condition?.text == undefined ? data?.current?.condition?.text ?? "" : weatherDesc + data?.current?.condition?.text}`}</Text>
            <Image style={styles.imageIcon} source={{uri: `https:${data.icon}`}} />
            <View style={styles.viewProvider}>
                <Text style={styles.textProvider}>Thank you for purchasing Weather Time. If you have any issues or feedback, please conact: 1800 123 456.</Text>
                <Text style={styles.textProvider}>Data provide by WeatherTime API. Best efforts are taken to ensure accuracy of the data, but no garantees are made. To view he official data, please vit the ebesite of WeatherTime API</Text>
            </View>
            

            </View>
        )}
      </View>
    );
  }

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
    viewProvider: {
      marginTop: 60,
      
    },
    textProvider: {
      padding: 4,
      fontSize: 10,

    }
  });
  

  export default HomeScreen;