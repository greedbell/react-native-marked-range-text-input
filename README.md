# react-native-marked-range-text-input

一个 TextInput 组件的拓展
增加 onMarkedRangeChanged 回调，用于标记输入法选区的变化
同时 onChangeText 只会在输入法选区结束之后才会触发

```
import TextInput from 'react-native-marked-range-text-input';

...
    <TextInput
        style={styles.input}
        onMarkedRangeChanged={this._onMarkedRangeChanged}
        onChangeText={this._onChangeText}
    />
...

```
