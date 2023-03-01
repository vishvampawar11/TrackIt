import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { fetchUsers } from "../util/http";

const ProfileScreen = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUserHelper = async () => {
      const fetchedUsers = await fetchUsers();
      setUser(fetchedUsers[0]);
    };
    getUserHelper();
  }, []);

  return (
    <>
      {user && (
        <View style={styles.container}>
          <Ionicons
            name="person-circle"
            size={144}
            color={GlobalStyles.colors.lightBlack}
          />
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.text}>{user.email}</Text>
          <Text style={styles.text}>
            {user.address.street}, {user.address.suite}, {user.address.city}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 55,
  },
  username: {
    fontSize: 28,
  },
  text: {
    fontSize: 16,
    color: "#707070",
  },
});

export default ProfileScreen;
