import React, { cloneElement, PropTypes } from 'react';
import { TextInput, UIManager, NativeModules } from 'react-native';
import createReactNativeComponentClass from 'react-native/Libraries/Renderer/src/renderers/native/createReactNativeComponentClass';

export default class extends TextInput {

    static displayName = 'MarkedRangeTextInput';

    static propTypes = {
        ...TextInput.propTypes,
        onMarkedRangeChanged: PropTypes.func
    };

    componentWillMount() {
        this._onMarkedRangeChanged = this.onMarkedRangeChanged.bind(this);
        this._onChange = this.onChange.bind(this);
    }

    _previousMarkedRange = {};

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

        this._lastNativeText = text;
        this.forceUpdate();
    }

    onMarkedRangeChanged(event) {
        const { onChangeText, onMarkedRangeChanged } = this.props;
        const lastNativeText = this._lastNativeText;

        const previousMarkedRange = this._previousMarkedRange;
        const { nativeEvent: { markedRange: { start, end, text } } } = event;

        if (previousMarkedRange.start === start &&
            previousMarkedRange.end === end &&
            previousMarkedRange.text === text) {
            return;
        }

        onMarkedRangeChanged && onMarkedRangeChanged(event);
        start === end && onChangeText && onChangeText(lastNativeText);
    }


    render() {
        const wrapper = super.render();
        const textInput = wrapper.props.children;

        const markedRangeTextInput = (
            <RNMarkedRangeTextInput
                {...textInput.props}
                ref={this._setNativeRef}
                onChange={this._onChange}
                onMarkedRangeChanged={this._onMarkedRangeChanged}
            />
        );

        return cloneElement(wrapper, wrapper.props, markedRangeTextInput);
    }
}

const RNMarkedRangeTextInput = createReactNativeComponentClass({
    validAttributes: {
        ...UIManager.RCTTextField.validAttributes,
        onMarkedRangeChanged: true
    },
    uiViewClassName: 'RNMarkedRangeTextInput'
});
