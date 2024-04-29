import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { DetailsScreenProps } from "../types";

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name: {pokemon.name}</Text>
      <Text>Type: {pokemon.types.join(", ")}</Text>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default DetailsScreen;
