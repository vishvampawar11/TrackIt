import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { TransactionsContext } from "../store/transactions-context";
import TransactionsListContainer from "../components/TransactionsOutput/TransactionsListContainer";
import TransactionSummary from "../components/TransactionsOutput/TransactionSummary";
import IconButton from "../components/UI/IconButton";

const AllTransactions = ({ navigation }) => {
  const transactionsCtx = useContext(TransactionsContext);

  let income = 0;
  let expense = 0;

  transactionsCtx.transactions.forEach((transaction) => {
    if (transaction.isIncome) income += transaction.amount;
    else expense += transaction.amount;
  });

  return (
    <View style={styles.container}>
      <TransactionSummary income={income} expense={expense} />
      <TransactionsListContainer transactions={transactionsCtx.transactions} />
      <View style={styles.button}>
        <IconButton
          icon="add"
          size={32}
          color="white"
          onPress={() => navigation.navigate("ManageTransaction")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
});

export default AllTransactions;
