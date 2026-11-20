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

    useEffect(() => {
        buscarCriaturas();
    }, []);

    async function salvarCriaturas() {

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

    function editar(item) {
        setNome(item.nome);
        setHabitat(item.habitat);
        setPerigo(String(item.perigo));
        setPoder(item.poder);
        setIdEditando(item.id);
    }
    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Drifters" }} />

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
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartao}>

                        <View style={styles.informacoes}>
                            <Text style={styles.item}>
                                {item.nome}
                            </Text>

                            <Text style={styles.detalhes}>
                                ID: {item.id}
                            </Text>

                            <Text style={styles.detalhes}>
                                Habitat: {item.habitat}
                            </Text>

                            <Text style={styles.detalhes}>
                                Perigo: {item.perigo}
                            </Text>

                            <Text style={styles.detalhes}>
                                Poder: {item.poder}
                            </Text>
                        </View>

                        <View style={styles.botoes}>
                            <Button
                                title="Editar"
                                color="#2354D6"
                                onPress={() => editar(item)}
                            />

                            <Button
                                title="Excluir"
                                color="#D62828"
                                onPress={() => deletar(item.id)}
                            />
                        </View>

                    </View>
                )}
            />

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    cartao: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F1F3F6",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
    },

    informacoes: {
        flex: 1,
        marginRight: 8,
    },

    item: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 6,
    },

    detalhes: {
        fontSize: 14,
        color: "#4B5563",
        marginBottom: 3,
    },

    botoes: {
        justifyContent: "center",
        gap: 8,
    },
});