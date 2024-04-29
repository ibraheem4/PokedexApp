import React from "react";
import { View, Text, Button, Image } from "react-native";

const DetailsScreen = ({ route, navigation }) => {
  const { pokemon } = route.params;

  return (
    <View>
      <Text>Name: {pokemon.name}</Text>
      <Text>Type: {pokemon.types.join(", ")}</Text>
      <Image
        source={{ uri: pokemon.image }}
        style={{ width: 200, height: 200 }}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;
