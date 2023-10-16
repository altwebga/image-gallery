import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "@/store";
import PhotosScreen from "@/screens/PhotosScreen";
import PhotoViewScreen from "@/screens/PhotoViewScreen";
import { RootStackParamList } from "@/models/navigation";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PhotosScreen">
          <Stack.Screen
            name="PhotosScreen"
            component={PhotosScreen}
            options={{ title: "Photos" }}
          />
          <Stack.Screen
            name="PhotoViewScreen"
            component={PhotoViewScreen}
            options={{ title: "Photo View" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
