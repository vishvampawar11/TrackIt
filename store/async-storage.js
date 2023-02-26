import AsyncStorage from "@react-native-community/async-storage";

export const addTransaction = async (transaction) => {
  const existingTransactions = await AsyncStorage.getItem("transactions");
  let newTransactions = JSON.parse(existingTransactions);
  if (!newTransactions) {
    newTransactions = [];
  }
  newTransactions.push(transaction);
  await AsyncStorage.setItem("transactions", JSON.stringify(newTransactions));
};
