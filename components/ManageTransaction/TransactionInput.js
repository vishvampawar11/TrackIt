import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const TransactionInput = ({ textInputConfig }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isFocused
              ? GlobalStyles.colors.accent
              : GlobalStyles.colors.grey,
          },
        ]}
        {...textInputConfig}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default TransactionInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    width: 330,
    borderRadius: 8,
    marginVertical: 11,
    paddingLeft: 16,
  },
});
