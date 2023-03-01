import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const TransactionItem = ({ item, toggleModal }) => {
  const isIncome = item.isIncome;

  const pressHandler = () => {
    toggleModal(item.id);
  };

  return (
    <Pressable onPress={pressHandler}>
      <View style={styles.container}>
        <Text
          style={{
            color: GlobalStyles.colors.lightBlack,
            fontWeight: isIncome ? "700" : "400",
          }}
        >
          {item.description}
        </Text>
        <Text
          style={{
            color: isIncome
              ? GlobalStyles.colors.income
              : GlobalStyles.colors.expense,
          }}
        >
          ${item.amount}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default TransactionItem;
