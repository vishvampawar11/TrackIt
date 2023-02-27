import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTransactions = async () => {
  // await AsyncStorage.removeItem("transactions");
  const transactions = await AsyncStorage.getItem("transactions");
  return JSON.parse(transactions);
};

export const addTransaction = async (transaction) => {
  const existingTransactions = await AsyncStorage.getItem("transactions");
  let newTransactions = JSON.parse(existingTransactions);
  if (!newTransactions) {
    newTransactions = [];
  }
  newTransactions.push(transaction);
  await AsyncStorage.setItem("transactions", JSON.stringify(newTransactions));
};

export const updateTransaction = async (id, transactionData) => {
  let oldTransactions = await getTransactions();
  const index = oldTransactions.findIndex(
    (transaction) => transaction.id === id
  );
  const oldTransaction = oldTransactions[index];
  const newTransaction = { ...oldTransaction, ...transactionData };
  const updatedTransactions = [...oldTransactions];
  updatedTransactions[index] = newTransaction;
  await AsyncStorage.setItem(
    "transactions",
    JSON.stringify(updatedTransactions)
  );
};

export const deleteTransaction = async (id) => {
  let oldTransactions = await getTransactions();
  const newTransactions = oldTransactions.filter(
    (transaction) => transaction.id !== id
  );
  await AsyncStorage.setItem("transactions", JSON.stringify(newTransactions));
};
