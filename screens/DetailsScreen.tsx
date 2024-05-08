import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
// Import custom TypeScript types
import { DetailsScreenProps } from "../types";

// Define the DetailsScreen component as a functional component with typed props
const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  // Extract the pokemon object from route parameters
  const { pokemon } = route.params;

  // Render the UI elements for the Pokemon details screen within a ScrollView
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        // Display the name of the pokemon
        <Text style={styles.title}>Name: {pokemon.name}</Text>
        // Display the image of the pokemon
        <Image source={{ uri: pokemon.image }} style={styles.image} />
        // List the types of the pokemon
        <Text style={styles.section}>Type: {pokemon.types.join(", ")}</Text>
        // List the abilities of the pokemon
        <Text style={styles.section}>Abilities:</Text>
        {pokemon.abilities.map((ability, index) => (
          <Text key={index} style={styles.details}>
            {ability.ability.name} (Hidden: {ability.is_hidden ? "Yes" : "No"})
          </Text>
        ))}
        // List the stats of the pokemon
        <Text style={styles.section}>Stats:</Text>
        {pokemon.stats.map((stat, index) => (
          <Text key={index} style={styles.details}>
            {stat.stat.name}: {stat.base_stat}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

// Stylesheet for the DetailsScreen
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DetailsScreen;
