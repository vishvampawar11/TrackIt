import { useContext } from "react";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { addTransaction, updateTransaction } from "../store/async-storage";
import { GlobalStyles } from "../constants/styles";
import { TransactionsContext } from "../store/transactions-context";
import TransactionForm from "../components/ManageTransaction/TransactionForm";

const ManageTransaction = ({ transactionId, toggleModal }) => {
  const transactionsCtx = useContext(TransactionsContext);

  const isEditing = !!transactionId;

  const selectedTransaction = transactionsCtx.transactions.find(
    (transaction) => transaction.id === transactionId
  );

  const submitHandler = (transactionData) => {
    if (isEditing) {
      updateTransaction(transactionId, transactionData);
      transactionsCtx.updateTransaction(transactionId, transactionData);
    } else {
      const id = uuid.v4();
      transactionData.id = id;
      console.log(transactionData);
      addTransaction(transactionData);
      transactionsCtx.addTransaction(transactionData);
    }
    toggleModal(null);
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

      <Pressable
        onPress={() => {
          toggleModal(null);
        }}
        style={styles.closeButton}
      >
        <Ionicons
          name="close"
          size={24}
          color={GlobalStyles.colors.lightBlack}
        />
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
  closeButton: {
    position: "absolute",
    right: 24,
    top: 12,
  },
});
