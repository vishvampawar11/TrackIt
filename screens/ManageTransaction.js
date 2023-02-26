import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

// import { addTransaction } from "../store/async-storage";
import { GlobalStyles } from "../constants/styles";
import { TransactionsContext } from "../store/transactions-context";
import TransactionForm from "../components/ManageTransaction/TransactionForm";

const ManageTransaction = ({ navigation, route }) => {
  const transactionsCtx = useContext(TransactionsContext);

  const transactionId = route.params?.transactionId;
  const isEditing = !!transactionId;

  const selectedTransaction = transactionsCtx.transactions.find(
    (transaction) => transaction.id === transactionId
  );

  const submitHandler = (transactionData) => {
    if (isEditing) {
      transactionsCtx.updateTransaction(transactionId, transactionData);
    } else {
      // addTransaction(transactionData);
      transactionsCtx.addTransaction(transactionData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? "Edit" : "Add"} Income/Expense
      </Text>
      <TransactionForm
        defaultValues={selectedTransaction}
        onSubmit={submitHandler}
      />

      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="exit" />
      </Pressable>
    </View>
  );
};

export default ManageTransaction;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: GlobalStyles.colors.lightBlack,
  },
});
