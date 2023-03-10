import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import TransactionInput from "./TransactionInput";
import DatePicker from "./DatePicker";

const TransactionForm = ({ defaultValues, onSubmit }) => {
  const [amount, setAmount] = useState(
    defaultValues ? defaultValues.amount.toString() : ""
  );
  const [description, setDescription] = useState(
    defaultValues ? defaultValues.description : ""
  );
  const [date, setDate] = useState(defaultValues ? defaultValues.date : "");
  const [isIncome, setIsIncome] = useState(
    defaultValues ? defaultValues.isIncome : true
  );

  const amountChangeHandler = (amount) => setAmount(amount);
  const descriptionChangeHandler = (description) => setDescription(description);
  const dateChangeHandler = (date) => setDate(date);

  const submitHandler = () => {
    const transactionData = {
      amount: +amount,
      date: date,
      description: description,
      isIncome: isIncome,
    };

    const amountIsValid =
      !isNaN(transactionData.amount) && transactionData.amount > 0;
    const descriptionIsValid = transactionData.description.trim().length > 0;

    if (!amountIsValid || !descriptionIsValid) {
      Alert.alert("Invalid Input", "Please check your values");
      return;
    }

    onSubmit(transactionData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => setIsIncome(true)}
          style={[
            styles.button,
            {
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              backgroundColor: isIncome
                ? GlobalStyles.colors.accent
                : GlobalStyles.colors.lightGrey,
            },
          ]}
        >
          <Text>Income</Text>
        </Pressable>
        <Pressable
          onPress={() => setIsIncome(false)}
          style={[
            styles.button,
            {
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              backgroundColor: isIncome
                ? GlobalStyles.colors.lightGrey
                : GlobalStyles.colors.accent,
            },
          ]}
        >
          <Text>Expense</Text>
        </Pressable>
      </View>
      <TransactionInput
        textInputConfig={{
          placeholder: "Amount",
          value: amount,
          onChangeText: amountChangeHandler,
          keyboardType: "decimal-pad",
        }}
      />
      <TransactionInput
        textInputConfig={{
          placeholder: "Description",
          value: description,
          onChangeText: descriptionChangeHandler,
        }}
      />
      <DatePicker onSubmit={dateChangeHandler} defaultDate={date} />

      <View>
        <Button onPress={submitHandler} mode="flat">
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 26,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 26,
  },
  button: {
    height: 40,
    width: 80,
    backgroundColor: GlobalStyles.colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TransactionForm;
