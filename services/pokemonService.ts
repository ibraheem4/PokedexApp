import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = async (offset: number, limit: number = 20) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    const pokemonsWithDetails = response.data.results.map(async (pokemon) => {
      const pokemonDetails = await axios.get(pokemon.url);
      return transformPokemonDetails(pokemonDetails.data);
    });
    return await Promise.all(pokemonsWithDetails);
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
    return [];
  }
};

const transformPokemonDetails = (details) => {
  return {
    id: details.id,
    name: details.name,
    image: details.sprites.front_default,
    types: details.types.map((t) => t.type.name),
    abilities: details.abilities.map((a) => ({
      ability: {
        name: a.ability.name,
        url: a.ability.url,
      },
      is_hidden: a.is_hidden,
    })),
    stats: details.stats.map((s) => ({
      base_stat: s.base_stat,
      effort: s.effort,
      stat: {
        name: s.stat.name,
        url: s.stat.url,
      },
    })),
    game_indices: details.game_indices.map((g) => ({
      game_index: g.game_index,
      version: {
        name: g.version.name,
        url: g.version.url,
      },
    })),
  };
};
