import { StyleSheet, Text, View } from "react-native";
import TransactionsList from "./TransactionsList";

const TransactionsListContainer = ({ transactions }) => {
  const transactionList = {};

  transactions.map((transaction) => {
    if (!transactionList[transaction.date])
      transactionList[transaction.date] = [];
    transactionList[transaction.date].push(transaction);
  });

  if (Object.keys(transactionList).length === 0) {
    return (
      <View style={styles.infoText}>
        <Text style={{ fontSize: 18 }}>No transactions present</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 13 }}>
      {Object.entries(transactionList).map(([date, items]) => (
        <TransactionsList key={date} date={date} items={items} />
      ))}
    </View>
  );
};

export default TransactionsListContainer;

const styles = StyleSheet.create({
  infoText: {
    paddingTop: 100,
    alignItems: "center",
  },
});
