// import MarkedRangeTextInput from './MarkedRangeTextInput';
// export default MarkedRangeTextInput;


import React, { cloneElement, PropTypes } from 'react';
import { TextInput, UIManager, NativeModules } from 'react-native';
import createReactNativeComponentClass from 'react-native/Libraries/Renderer/src/renderers/native/createReactNativeComponentClass';

export default class extends TextInput {

    static displayName = 'MarkedRangeTextInput';

    static propTypes = {
        ...TextInput.propTypes,
        onMarkedRangeChanged: PropTypes.func,
        onChangeText: PropTypes.func
    };

    componentWillMount() {
        this._onMarkedRangeChanged = this.onMarkedRangeChanged.bind(this);
        this._onChange = this.onChange.bind(this);
        this._onChangeText = this.onChangeText.bind(this);
    }

    _previousMarkedRange = {};
    _previousInput = "";
    _previousText = "";

    onChange(event) {
        const { text, eventCount } = event.nativeEvent;
        // Make sure to fire the mostRecentEventCount first so it is already set on
        // native when the text value is set.
        if (this._inputRef) {
            this._inputRef.setNativeProps({
                mostRecentEventCount: eventCount,
            });
        }

        this.props.onChange && this.props.onChange(event);

        if (!this._inputRef) {
            // calling `this.props.onChange` or `this.props.onChangeText`
            // may clean up the input itself. Exits here.
            return;
        }

        this.forceUpdate();
    }

    onChangeText(event) {
        const { onChangeText } = this.props;
        const previousText = this._previousText;
        const { nativeEvent: { text: text } } = event;

        if (previousText === text) {
            return;
        }
        onChangeText && onChangeText(text);
        this._previousText = text;
        this.forceUpdate();
    }

    onMarkedRangeChanged(event) {
        const { onMarkedRangeChanged } = this.props;

        const previousMarkedRange = this._previousMarkedRange;
        const { nativeEvent: { markedRange: { start, end, markedText, text } } } = event;

        if (previousMarkedRange.start === start &&
            previousMarkedRange.end === end &&
            previousMarkedRange.text === text) {
            return;
        }

        onMarkedRangeChanged && onMarkedRangeChanged(event);
        this._previousMarkedRange = { start, end, markedText, text };
        this.forceUpdate();
    }

    render() {
        const wrapper = super.render();
        const textInput = wrapper.props.children;

        let markedRangeTextInput = null;
        const props = {
            ...textInput.props,
            ref: this._setNativeRef,
            onChange: this._onChange,
            onChangeText: this._onChangeText,
            onMarkedRangeChanged: this._onMarkedRangeChanged
        };

        let NativeTextInput;

        if (this.props.multiline) {
            NativeTextInput = RNMarkedRangeTextView;
        } else {
            NativeTextInput = RNMarkedRangeTextField;
        }
        return cloneElement(wrapper, wrapper.props, <NativeTextInput {...props} />);
    }
}

const RNMarkedRangeTextField = createReactNativeComponentClass({
    validAttributes: {
        ...UIManager.RCTTextField.validAttributes,
        onMarkedRangeChanged: true,
        onChangeText: true
    },
    uiViewClassName: 'RNMarkedRangeTextField'
});

const RNMarkedRangeTextView = createReactNativeComponentClass({
    validAttributes: {
        ...UIManager.RCTTextView.validAttributes,
        onMarkedRangeChanged: true,
        onChangeText: true
    },
    uiViewClassName: 'RNMarkedRangeTextView'
});
