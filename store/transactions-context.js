import { createContext, useEffect, useReducer } from "react";

export const TransactionsContext = createContext({
  transactions: [],
  addTransaction: ({ description, amount, date, isIncome }) => {},
  setTransactions: (transactions) => {},
  deleteTransaction: (id) => {},
  updateTransaction: (id, { description, amount, date, isIncome }) => {},
});

const transactionsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload }, ...state];

    case "SET":
      return action.payload;

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
  const [transactionsState, dispatch] = useReducer(transactionsReducer, []);

  const addTransaction = (transactionData) => {
    dispatch({ type: "ADD", payload: transactionData });
  };

  const setTransactions = (transactions) => {
    dispatch({ type: "SET", payload: transactions });
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
    setTransactions: setTransactions,
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
