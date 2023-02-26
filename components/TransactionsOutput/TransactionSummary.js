import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const TransactionSummary = ({ income, expense }) => {
  const balance = income - expense;
  return (
    <View style={styles.summaryOuterContainer}>
      <View style={styles.summaryContainer}>
        <View style={styles.amountContainer}>
          <Text style={{ color: GlobalStyles.colors.lightBlack }}>Balance</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color:
                balance >= 0
                  ? GlobalStyles.colors.balance
                  : GlobalStyles.colors.accent,
            }}
          >
            $ {balance}
          </Text>
        </View>
        <View style={styles.divider}></View>
        <View>
          <View style={styles.amountContainer}>
            <Text
              style={{ fontSize: 10, color: GlobalStyles.colors.lightBlack }}
            >
              Income
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: GlobalStyles.colors.income,
              }}
            >
              $ {income}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: GlobalStyles.colors.expense,
              }}
            >
              $ {expense}
            </Text>
            <Text
              style={{ fontSize: 10, color: GlobalStyles.colors.lightBlack }}
            >
              Expense
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryOuterContainer: {
    padding: 13,
    backgroundColor: GlobalStyles.colors.white,
  },
  summaryContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.grey,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  amountContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 1,
    backgroundColor: GlobalStyles.colors.grey,
  },
});

export default TransactionSummary;
