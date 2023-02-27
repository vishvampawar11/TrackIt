import { FlatList, StyleSheet, Text, View } from "react-native";
import { dateToString } from "../ManageTransaction/DatePicker";
import TransactionItem from "./TransactionItem";

const renderTransactionItem = (itemData) => {
  return <TransactionItem item={itemData.item} />;
};

const TransactionsList = ({ date, items }) => {
  const today = dateToString(new Date());

  return (
    <View>
      <Text style={{ textAlign: "center" }}>
        {date === today ? "Today" : date}
      </Text>
      <FlatList
        style={{ marginBottom: 32 }}
        data={items}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TransactionsList;
