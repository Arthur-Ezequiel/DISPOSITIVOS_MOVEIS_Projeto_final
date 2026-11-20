import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: "#47d623" },
                    headerTintColor: "#FFFFFF",
                }}
            >
                <Stack.Screen
                    name="asdads"
                    options={{ title: "Início" }}
                />

                <Stack.Screen
                    name="bestiario"
                    options={{ title: "Criaturas ---" }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}
