import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import TextInput from 'react-native-marked-range-text-input';

export default class MarkedRangeTextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markedRange: {
                start: 0,
                end: 0,
                text: null
            },
            input: null,
            text: null
        };
    }

    componentWillMount() {
        this._onMarkedRangeChanged = this._onMarkedRangeChanged.bind(this);
        this._onChangeText = this._onChangeText.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    _onMarkedRangeChanged({ nativeEvent: { markedRange } }) {
        this.setState({
            markedRange
        });
    }

    _onChangeText(text) {
        this.setState({
            text
        });
    }

    _onChange({ nativeEvent: { text } }) {
        this.setState({
            input: text
        });
    }

    render() {
        const { markedRange, input, text } = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onMarkedRangeChanged={this._onMarkedRangeChanged}
                    onChangeText={this._onChangeText}
                    onChange={this._onChange}
                />
                <Text style={styles.text}>
                    Marked Range: {markedRange.start + ''} - {markedRange.end + ''} ({markedRange.text + ''})
                </Text>
                <Text style={styles.text}>
                    Input: {input || ''}
                </Text>
                <Text style={styles.text}>
                    Text: {text || ''}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '40%',
        backgroundColor: '#F5FCFF',
    },
    input: {
        alignSelf: 'center',
        width: 200,
        height: 40,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff'
    },

    text: {
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 18,
    }
});

AppRegistry.registerComponent('MarkedRangeTextInput', () => MarkedRangeTextInput);
