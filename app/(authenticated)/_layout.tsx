import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

const Layout = () => {
  return <Stack>
      <Stack.Screen name="(drawer)" options={{headerShown: false}} />
      <Stack.Screen name="details/[id]" />
      </Stack>;
};

export default Layout;
