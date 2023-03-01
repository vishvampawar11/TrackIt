import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import DateTimePicker from "@react-native-community/datetimepicker";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateToString = (date) => {
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
};

export const stringToDate = (dateString) => {
  let [month, day, year] = dateString.split(" ");
  day = parseInt(day.substring(0, day.length - 1));
  month = months.findIndex((item) => item === month);
  year = parseInt(year);
  return new Date(year, month, day);
};

const DatePicker = ({ onSubmit, defaultDate }) => {
  const [date, setDate] = useState(new Date());
  const [dateInput, setDateInput] = useState(defaultDate || "Date");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateChangeHandler = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
    }

    setDate(selectedDate);

    if (event.type == "set") {
      setShowDatePicker(false);
      const dateString = dateToString(selectedDate);
      setDateInput(dateString);
      onSubmit(dateString);
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          setShowDatePicker(true);
          Keyboard.dismiss();
        }}
      >
        <View style={styles.input}>
          <Text style={styles.text}>{dateInput}</Text>
        </View>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          onChange={dateChangeHandler}
          on
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    width: 330,
    borderRadius: 8,
    borderColor: GlobalStyles.colors.grey,
    marginVertical: 11,
    paddingLeft: 16,
    justifyContent: "center",
  },
  text: {
    color: "grey",
  },
});

export default DatePicker;
