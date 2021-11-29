import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput as TRN } from 'react-native';
import { View } from 'react-native-ui-lib';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  value: string;
  placeholder?: string;
  keyForm: string;
  colorBlur?: string;
  colorFocus?: string;
  onChangeText: (key: string) => (value: string) => void;
}

const TextInput: React.FC<Props> = (props) => {
  const {
    value,
    keyForm,
    placeholder,
    colorBlur = 'rgba(0, 0, 0, 0.6)',
    colorFocus = 'red',
    onChangeText,
  } = props;

  const top = useSharedValue(value !== '' ? -10.5 : 10);
  const button = useSharedValue(0);
  const left = useSharedValue(5);
  const size = useSharedValue(15);
  const height = useSharedValue(15);
  const color = useSharedValue(value !== '' ? colorFocus : colorBlur);

  const [lineTextInput, setLineTextInput] = useState(false);

  const handleFocus = () => {
    setLineTextInput(true);
    button.value = 5;
    color.value = colorFocus;
    size.value = 12;
    left.value = 10;
    top.value = -10.5;
    height.value = 16;
  };
  const handleBlur = () => {
    setLineTextInput(false);
    button.value = 0;
    color.value = value !== '' ? colorFocus : colorBlur;
    size.value = 15;
    left.value = 5;
    top.value = value !== '' ? -10.5 : 10;
    height.value = 20;
  };

  const getStyleView = () => ({
    borderWidth: lineTextInput ? 1 : 0.5,
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value),
      bottom: withSpring(button.value),
      color: color.value,
      fontSize: withSpring(size.value),
      left: withSpring(left.value),
    };
  });

  return (
    <View style={[styles.container, getStyleView()]}>
      <Animated.Text style={[styles.title, animatedStyles]}>
        {placeholder}
      </Animated.Text>
      <TRN
        {...props}
        autoCapitalize="characters"
        placeholder=""
        style={styles.input}
        blurOnSubmit={true}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChangeText={onChangeText(keyForm)}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#aaa',
    borderRadius: 5,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 5,
  },
  title: {
    backgroundColor: 'white',
    position: 'absolute',
    paddingHorizontal: 5,
  },
  input: {
    color: 'black',
    marginTop: Platform.OS === 'ios' ? 0 : 2,
    fontSize: 16,
    width: '100%',
  },
});
