import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image, } from 'react-native';
import { Header } from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { 
      word: '', 
      definition: ''
      };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <SafeAreaProvider>
      <View>
        <Header
          backgroundColor={'#f8ff9c'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#ffd000', fontSize: 24},
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'Checking Answer Key...',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}>Search</Text>{' '}
        </TouchableOpacity>

        <Text style={{ fontSize: 18, textAlign: "center", color: 'white' }}>{this.state.word}</Text>
        <Text style={{ fontSize: 18, textAlign: "center", color: 'white'  }}>{this.state.definition}</Text>
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'purple',
    color: 'purple'
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'purple',
    backgroundColor: '#ea9cff'
  },
  textIn: {
    textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'purple',
  },
});
