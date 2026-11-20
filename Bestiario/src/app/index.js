import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function criaturas() {
    const [bixo, setBixo] = useState([]);
    const [nome, setNome] = useState("");
    const [habitat, setHabitat] = useState("");
    const [perigo, setPerigo] = useState("");
    const [poder, setPoder] = useState("");
    const [idEditando, setIdEditando] = useState(0);

    async function buscarCriaturas() {
        const resposta = await fetch(
            "https://6afce76c2a9c141d36b7d734.mockapi.io/criaturas",
        );
        const dados = await resposta.json();
        setBixo(dados);
    }

    async function salvarCriaturas() {

        // VALIDAÇÃO
        if (nome.trim() === "" || habitat.trim() === "" || perigo.trim() === "") {
            alert("Preencha nome, habitat e perigo!");
            return;
        }

        const nivelPerigo = Number(perigo);

        if (nivelPerigo < 1 || nivelPerigo > 5 || !Number.isInteger(nivelPerigo)) {
            alert("O perigo deve ser um número inteiro entre 1 e 5!");
            return;
        }

        if (idEditando === 0) {

            await fetch("https://6afce76c2a9c141d36b7d734.mockapi.io/criaturas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: nome,
                    habitat: habitat,
                    perigo: nivelPerigo,
                    poder: poder,
                }),
            });

        } else {

            await fetch("https://6afce76c2a9c141d36b7d734.mockapi.io/criaturas/" + idEditando, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: nome,
                    habitat: habitat,
                    perigo: nivelPerigo,
                    poder: poder,
                }),
            });

        }

        setNome("");
        setHabitat("");
        setPerigo("");
        setPoder("");
        setIdEditando(0);

        buscarCriaturas();
    }
    async function deletar(id) {
        await fetch(`https://6afce76c2a9c141d36b7d734.mockapi.io/criaturas/${id}`, {
            method: "DELETE",
        });

        buscarCriaturas();
    }
    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Criaturas ---" }} />

            <TextInput
                style={styles.campo}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome da criatura"
            />
            <TextInput
                style={styles.campo}
                value={habitat}
                onChangeText={setHabitat}
                placeholder="Habitat da criatura"
            />
            <TextInput
                style={styles.campo}
                value={perigo}
                onChangeText={setPerigo}
                keyboardType="numeric"
                placeholder="Nivel de perigo"
            />
            <TextInput
                style={styles.campo}
                value={poder}
                onChangeText={setPoder}
                placeholder="Poder especial"
            />

            <Button title="Salvar Criatura" onPress={salvarCriaturas} />

            <FlatList
                style={styles.lista}
                data={bixo}
                renderItem={({ item }) => (
                    <Text style={styles.item}>
                        {item.id} - {item.nome} - {item.habitat} - {item.perigo} - {item.poder}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    campo: {
        borderWidth: 1,
        borderColor: "#D9DDE3",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: "#111827",
        marginBottom: 12,
    },

    lista: {
        flex: 1,
        marginTop: 16,
    },

    item: {
        backgroundColor: "#F1F3F6",
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        fontSize: 15,
        color: "#111827",
    },
});