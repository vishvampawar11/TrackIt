import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ dateChangeHandler }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    dateChangeHandler(date);
  };

  return (
    <View>
      <Pressable onPress={() => setShowPicker(true)}>
        <View style={styles.input}>
          <Text style={styles.text}>Date</Text>
        </View>
      </Pressable>
      {showPicker && <DateTimePicker value={date} onChange={onChange} />}
    </View>
  );
};

export default DatePicker;

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
