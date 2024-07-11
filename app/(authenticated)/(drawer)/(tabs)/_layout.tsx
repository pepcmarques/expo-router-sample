import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Alert, Pressable } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useAuth } from "@/context/AuthContext";

const Layout = () => {
  const { onLogout } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: "#fff",
        headerRight: () => (
          <Pressable onPress={onLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </Pressable>
        ),
        headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="action"
        options={{
          title: "Action",
          tabBarLabel: "Action",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="contract-outline" size={size} color={color} />
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            Alert.alert("Action", "This is an action tab!!!");
          },
        })}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabBarLabel: "List",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
