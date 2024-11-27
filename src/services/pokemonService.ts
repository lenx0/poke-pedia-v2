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

interface PokemonDetails {
  id: number;
  name: string;
  types: PokemonType[];
  weight: number;
  height: number;
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
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do Pokémon com ID ${id}:`, error);
    return null;
  }
}

// Função para obter a descrição/história de um Pokémon
export async function getPokemonSpecies(id: number): Promise<string | null> {
  try {
    const response = await api.get<PokemonSpecies>(`/pokemon-species/${id}`);
    // Filtrar o texto na linguagem inglesa
    const flavorText = response.data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    return flavorText ? flavorText.flavor_text.replace(/[\n\r\f]/g, " ") : null; // Limpar quebras de linha
  } catch (error) {
    console.error(`Erro ao buscar história do Pokémon com ID ${id}:`, error);
    return null;
  }
}
