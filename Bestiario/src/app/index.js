
import { StyleSheet, Text, View, Button } from "react-native";
import { Link, Stack } from "expo-router";

export default function Index() {
    return (
        <View style={styles.tela}>

            <Stack.Screen options={{ title: "Início" }} />

            <View style={styles.conteudo}>

                <View style={styles.botao}>
                    <Link href="/Drifters" asChild>
                        <Button
                            title="Entrar no Bestiário"
                            color="#2354D6"
                        />
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    tela: {
        flex: 1,
        backgroundColor: "#101827",
        justifyContent: "center",
        padding: 25,
    },

    conteudo: {
        alignItems: "center",
    },

    icone: {
        fontSize: 75,
        marginBottom: 15,
    },

    titulo: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFFFFF",
        letterSpacing: 4,
        marginBottom: 10,
    },

    subtitulo: {
        fontSize: 16,
        color: "#A9C4FF",
        textAlign: "center",
    },

    divisor: {
        width: 100,
        height: 3,
        backgroundColor: "#47D623",
        marginVertical: 25,
        borderRadius: 5,
    },

    descricao: {
        fontSize: 16,
        color: "#E5E7EB",
        textAlign: "center",
        lineHeight: 25,
        marginBottom: 30,
    },

    botao: {
        width: "80%",
        marginBottom: 35,
    },

    rodape: {
        color: "#8B98AB",
        fontSize: 13,
        letterSpacing: 2,
    },

});
