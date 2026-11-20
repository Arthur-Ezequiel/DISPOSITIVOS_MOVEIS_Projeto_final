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
            <View style={styles.perguntas}>
                <Text style={styles.tituloPergunta}>
                    Nome:
                </Text>

                <TextInput
                    style={styles.campo}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Nome da criatura"
                />

                <Text style={styles.tituloPergunta}>
                    Habitat:
                </Text>

                <TextInput
                    style={styles.campo}
                    value={habitat}
                    onChangeText={setHabitat}
                    placeholder="Aonde pode spawnar"
                />

                <Text style={styles.tituloPergunta}>
                    Nivel de perigo:
                </Text>

                <TextInput
                    style={styles.campo}
                    value={perigo}
                    onChangeText={setPerigo}
                    keyboardType="numeric"
                    placeholder="Nivel de perigo"
                />

                <Text style={styles.tituloPergunta}>
                    Poder especial:
                </Text>

                <TextInput
                    style={styles.campo}
                    value={poder}
                    onChangeText={setPoder}
                    placeholder="Fogo, Resistencia, Arremeçar ...."
                />
            </View>
            <Button title="Salvar Criatura" onPress={salvarCriaturas} />


            <FlatList
                style={styles.lista}
                data={bixo}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.espacamento}>
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
                                    color="#596348"
                                    onPress={() => editar(item)}
                                />

                                <Button
                                    title="Excluir"
                                    color="#873F32"
                                    onPress={() => deletar(item.id)}
                                />
                            </View>

                        </View>
                    </View>
                )}
            />

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#25231F",
    },

    perguntas: {
        backgroundColor: "#25231F",
        padding: 16,
    },

    tituloPergunta: {
        color: "#D8C9A7",
        fontSize: 16,
        marginTop: 5,
    },

    campo: {
        backgroundColor: "#D8C9A7",
        color: "#25231F",
        borderWidth: 1,
        borderColor: "#A66D3F",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
    },

    cartao: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#D8C9A7",
        borderRadius: 12,
        padding: 12,
    },

    informacoes: {
        flex: 1,
        marginRight: 8,
    },

    item: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#25231F",
        marginBottom: 6,
    },

    detalhes: {
        fontSize: 14,
        color: "#493729",
        marginBottom: 3,
    },

    botoes: {
        justifyContent: "center",
        gap: 8,
    },

    espacamento: {
        backgroundColor: "#25231F",
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 5,
    },

    lista: {
        flex: 1,
        backgroundColor: "#25231F",
    },
});