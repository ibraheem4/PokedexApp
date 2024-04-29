import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import { fetchPokemons } from "../services/pokemonService";

const HomeScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      const newPokemons = await fetchPokemons(offset);
      setPokemons([...pokemons, ...newPokemons]);
      setLoading(false);
    };
    loadPokemons();
  }, [offset]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={pokemons}
      onEndReached={() => setOffset(offset + 20)}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { pokemon: item })}
        >
          <Text>{item.name}</Text>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.name}
    />
  );
};

export default HomeScreen;
