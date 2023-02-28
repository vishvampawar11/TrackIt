import { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BottomSheet } from "react-native-btr";

import { TransactionsContext } from "../store/transactions-context";
import { getTransactions } from "../store/async-storage";
import { GlobalStyles } from "../constants/styles";
import ManageTransaction from "./ManageTransaction";
import TransactionsListContainer from "../components/TransactionsOutput/TransactionsListContainer";
import TransactionSummary from "../components/TransactionsOutput/TransactionSummary";
import IconButton from "../components/UI/IconButton";
import TransactionDetail from "./TransactionDetail";

const windowHeight = Dimensions.get("window").height;

const AllTransactions = ({ navigation }) => {
  const transactionsCtx = useContext(TransactionsContext);

  const [transactionDetailId, setTransactionDetailId] = useState();
  const [transactionEditId, setTransactionEditId] = useState(null);

  const [addTransactionModalIsVisible, setAddTransactionModalIsVisible] =
    useState(false);

  const toggleAddTransactionModal = (transactionId) => {
    console.log(transactionId);
    setAddTransactionModalIsVisible((prev) => !prev);
    if (transactionId) {
      setTransactionEditId(transactionId);
    }
  };

  const [transactionDetailModalIsVisible, setTransactionDetailModalIsVisible] =
    useState(false);

  const toggleTransactionDetailModal = (transactionId) => {
    setTransactionDetailModalIsVisible((prev) => !prev);
    if (transactionId) {
      setTransactionDetailId(transactionId);
    }
  };

  useEffect(() => {
    const getExpensesHelper = async () => {
      const fetchedTransactions = await getTransactions();
      if (fetchedTransactions) {
        transactionsCtx.setTransactions(fetchedTransactions);
      }
    };

    getExpensesHelper();
  }, []);

  let income = 0;
  let expense = 0;

  transactionsCtx.transactions.forEach((transaction) => {
    if (transaction.isIncome) income += transaction.amount;
    else expense += transaction.amount;
  });

  return (
    <View style={styles.container}>
      <TransactionSummary income={income} expense={expense} />
      <TransactionsListContainer
        transactions={transactionsCtx.transactions}
        toggleModal={toggleTransactionDetailModal}
      />
      <View style={styles.button}>
        <IconButton
          icon="add"
          size={32}
          color="white"
          onPress={() => {
            toggleAddTransactionModal(null);
          }}
        />
      </View>

      <BottomSheet
        visible={addTransactionModalIsVisible}
        onBackButtonPress={toggleAddTransactionModal}
        onBackdropPress={toggleAddTransactionModal}
      >
        <View style={styles.modalContainer}>
          <ManageTransaction
            transactionId={transactionEditId}
            toggleModal={toggleAddTransactionModal}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        visible={transactionDetailModalIsVisible}
        onBackButtonPress={toggleTransactionDetailModal}
        onBackdropPress={toggleTransactionDetailModal}
      >
        <View style={styles.modalContainer}>
          <TransactionDetail
            transactionId={transactionDetailId}
            toggleDetailModal={toggleTransactionDetailModal}
            toggleEditModal={toggleAddTransactionModal}
          />
        </View>
      </BottomSheet>
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
  modalContainer: {
    flex: (windowHeight - 70) / windowHeight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: GlobalStyles.colors.white,
  },
});

export default AllTransactions;
