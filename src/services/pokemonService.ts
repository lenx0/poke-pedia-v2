import api from "./api";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: Pokemon[];
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
  };
  version_group_details: Array<{
    move_learn_method: { name: string };
    level_learned_at: number;
    version_group: { name: string };
  }>;
}

interface PokemonDetails {
  id: number;
  name: string;
  types: PokemonType[];
  weight: number;
  height: number;
  stats: PokemonStat[];
  moves: PokemonMove[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
}

export interface EvolutionWithImage {
  name: string;
  image: string;
}

interface EvolutionChainNode {
  species: {
    name: string;
  };
  evolves_to: EvolutionChainNode[]; // Nó recursivo
}

interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

export async function getPokemonList(limit = 20, offset = 0): Promise<Pokemon[]> {
  try {
    const response = await api.get<PokemonListResponse>(`/pokemon`, {
      params: { limit, offset },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar lista de Pokémon:", error);
    return [];
  }
}

export async function getPokemonDetails(id: number): Promise<PokemonDetails | null> {
  try {
    const response = await api.get<PokemonDetails>(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do Pokémon com ID ${id}:`, error);
    return null;
  }
}

export async function getPokemonSpecies(id: number): Promise<string | null> {
  try {
    const response = await api.get<PokemonSpecies>(`/pokemon-species/${id}`);
    const flavorText = response.data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    return flavorText ? flavorText.flavor_text.replace(/[\n\r\f]/g, " ") : null;
  } catch (error) {
    console.error(`Erro ao buscar história do Pokémon com ID ${id}:`, error);
    return null;
  }
}

export async function getPokemonEvolutionsWithImages(id: number): Promise<EvolutionWithImage[]> {
  try {
    // 1. Obter a URL da cadeia de evolução
    const speciesResponse = await api.get(`/pokemon-species/${id}`);
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

    // 2. Buscar a cadeia de evolução
    const evolutionResponse = await api.get(evolutionChainUrl);
    const chain = evolutionResponse.data.chain;

    // 3. Função recursiva para coletar nomes das evoluções
    const fetchEvolutions = async (chainNode: EvolutionChainNode): Promise<EvolutionWithImage[]> => {
      const evolutions: EvolutionWithImage[] = [];

      // Obter o nome do Pokémon atual
      const name = chainNode.species.name;

      // 4. Buscar a imagem do Pokémon
      const pokemonResponse = await api.get(`/pokemon/${name}`);
      const image = pokemonResponse.data.sprites.front_default;

      evolutions.push({ name, image });

      // Buscar as próximas evoluções
      for (const next of chainNode.evolves_to) {
        evolutions.push(...(await fetchEvolutions(next)));
      }

      return evolutions;
    };

    return await fetchEvolutions(chain);
  } catch (error) {
    console.error(`Erro ao buscar evoluções do Pokémon com ID ${id}:`, error);
    return [];
  }
}
