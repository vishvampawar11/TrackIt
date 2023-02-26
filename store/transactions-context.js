import { createContext, useEffect, useReducer } from "react";
import uuid from "react-native-uuid";

const DUMMY_TRANSACTIONS = [
  {
    id: "t1",
    amount: 7329,
    description: "Salary",
    isIncome: true,
    date: "April 12, 2022",
  },
  {
    id: "t2",
    amount: 329,
    description: "Car tyre change",
    isIncome: false,
    date: "February 22, 2023",
  },
  {
    id: "t3",
    amount: 4000,
    description: "Furniture",
    isIncome: false,
    date: "February 22, 2023",
  },
];

export const TransactionsContext = createContext({
  transactions: [],
  addTransaction: ({ description, amount, date, isIncome }) => {},
  deleteTransaction: (id) => {},
  updateTransaction: (id, { description, amount, date, isIncome }) => {},
});

const transactionsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = uuid.v4();
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      const index = state.findIndex(
        (transaction) => transaction.id === action.payload.id
      );

      const oldTransaction = state[index];
      const updatedTransaction = { ...oldTransaction, ...action.payload.data };
      const updatedTransactions = [...state];
      updatedTransactions[index] = updatedTransaction;
      return updatedTransactions;

    case "DELETE":
      return state.filter((transaction) => transaction.id !== action.payload);

    default:
      return state;
  }
};

const TransactionsContextProvider = ({ children }) => {
  const [transactionsState, dispatch] = useReducer(
    transactionsReducer,
    DUMMY_TRANSACTIONS
  );

  const addTransaction = (transactionData) => {
    dispatch({ type: "ADD", payload: transactionData });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateTransaction = (id, transactionData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: transactionData } });
  };

  const value = {
    transactions: transactionsState,
    addTransaction: addTransaction,
    deleteTransaction: deleteTransaction,
    updateTransaction: updateTransaction,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContextProvider;
