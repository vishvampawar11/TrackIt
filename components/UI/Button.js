import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable onPress={onPress}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.accent,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
  flat: {
    backgroundColor: "transparent",
  },
  flatText: {
    fontWeight: "700",
    color: GlobalStyles.colors.accent,
  },
});

export default Button;
