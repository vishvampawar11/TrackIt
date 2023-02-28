import { Pressable, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "./constants/styles";
import TransactionsContextProvider from "./store/transactions-context";
import AllTransactions from "./screens/AllTransactions";
import ManageTransaction from "./screens/ManageTransaction";
import ProfileScreen from "./screens/ProfileScreen";
import TransactionDetail from "./screens/TransactionDetail";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar />
      {/* <Provider store={store}> */}
        <TransactionsContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitle: "TrackIt",
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.accent,
                },
                headerTintColor: "white",
                cardStyle: { backgroundColor: "#e5e5e5" },
              }}
            >
              <Stack.Group
                screenOptions={({ navigation }) => ({
                  headerRight: () => (
                    <Pressable
                      onPress={() => {
                        navigation.navigate("Profile");
                      }}
                    >
                      <Ionicons
                        style={{ marginRight: 20 }}
                        name="person-circle-outline"
                        size={28}
                        color={GlobalStyles.colors.white}
                      />
                    </Pressable>
                  ),
                })}
              >
                <Stack.Screen
                  name="AllTransactions"
                  component={AllTransactions}
                />
                <Stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{ headerRight: () => null }}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </TransactionsContextProvider>
      {/* </Provider> */}
    </>
  );
};

export default App;
