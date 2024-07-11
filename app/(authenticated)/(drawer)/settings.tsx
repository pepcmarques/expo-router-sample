import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { View, Text, Button } from "react-native";

const Settings = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <View>
      <Text>Settings</Text>
      <Button title="Toggle" onPress={onToggle}></Button>
    </View>
  );
};

export default Settings;
