import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: "#493729" },
                    headerTintColor: "#FFFFFF",
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{ title: "Início" }}
                />

                <Stack.Screen
                    name="Drifters"
                    options={{ title: "Drifters" }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}