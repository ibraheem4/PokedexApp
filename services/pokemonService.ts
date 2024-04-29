import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = async (offset: number, limit: number = 20) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    const pokemonsWithDetails = response.data.results.map(async (pokemon) => {
      const pokemonDetails = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        image: pokemonDetails.data.sprites.front_default,
        types: pokemonDetails.data.types.map((type) => type.type.name),
      };
    });
    return await Promise.all(pokemonsWithDetails);
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
  }
};
