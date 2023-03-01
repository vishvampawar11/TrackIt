import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const IconButton = ({ icon, size, color, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.button}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.accent,
    height: 56,
    width: 56,
    borderRadius: 20,
  },
});

export default IconButton;
