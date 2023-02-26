import { FlatList, StyleSheet, Text, View } from "react-native";
import TransactionItem from "./TransactionItem";

const renderTransactionItem = (itemData) => {
  return <TransactionItem item={itemData.item} />;
};

const TransactionsList = ({ date, items }) => {
  return (
    <View>
      <Text style={{ textAlign: "center" }}>{date}</Text>
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
