import { SectionList, StyleSheet, Text, View } from "react-native";

import { dateToString, stringToDate } from "../ManageTransaction/DatePicker";
import TransactionItem from "./TransactionItem";

const TransactionsListContainer = ({ transactions, toggleModal }) => {
  const transactionList = {};
  const today = dateToString(new Date());

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

  const sections = [];
  Object.entries(transactionList).forEach(([date, items]) => {
    const newItem = {
      title: date,
      data: items,
    };
    sections.push(newItem);
  });

  sections.sort((sectionA, sectionB) => {
    const dateA = stringToDate(sectionA.title);
    const dateB = stringToDate(sectionB.title);
    return dateA < dateB ? 1 : -1;
  });

  return (
      <SectionList
      style={styles.container}
        sections={sections}
        renderItem={({ item }) => <TransactionItem item={item} toggleModal={toggleModal} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.infoText}>
            {section.title === today ? "Today" : section.title}
          </Text>
        )}
        keyExtractor={(item) => item.id}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  infoText: {
    paddingTop: 15,
    textAlign: "center",
  },
});

export default TransactionsListContainer;
