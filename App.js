import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import Onboarding from "./screens/Onboarding";
import Menu from "./screens/Menu";
import Welcome from "./screens/Welcome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <View style={styles.container}>
              <Stack.Navigator initialRouteName="Welcome">
                  <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Menu" component={Menu} />
              </Stack.Navigator>
            </View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
});

