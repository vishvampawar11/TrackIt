import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TransactionsContext } from "../store/transactions-context";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";

const TransactionDetail = ({ navigation, route }) => {
  const transactionsCtx = useContext(TransactionsContext);

  const transactionId = route.params?.transactionId;

  const transaction = transactionsCtx.transactions.find(
    (transaction) => transaction.id === transactionId
  );

  const deleteTransactionHandler = () => {
    transactionsCtx.deleteTransaction(transactionId);
    navigation.goBack();
  };

  if (transaction !== undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {transaction["isIncome"] ? "Income" : "Expense"}
        </Text>
        <Text
          style={[
            styles.amount,
            {
              fontWeight: "700",
              color: transaction["isIncome"]
                ? GlobalStyles.colors.income
                : GlobalStyles.colors.expense,
            },
          ]}
        >
          $ {transaction["amount"]}
        </Text>
        <Text style={styles.description}>{transaction["description"]}</Text>
        <Text style={styles.date}>{transaction["date"]}</Text>
        <Button
          onPress={() => {
            navigation.navigate("ManageTransaction", { transactionId });
          }}
        >
          Edit
        </Button>
        <Button onPress={deleteTransactionHandler} mode="flat">
          Delete
        </Button>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="exit" size={24} />
        </Pressable>
      </View>
    );
  }
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 28,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
  amount: {
    fontSize: 32,
    marginTop: 56,
    marginBottom: 48,
  },
  description: {
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 28,
  },
});

export default TransactionDetail;
