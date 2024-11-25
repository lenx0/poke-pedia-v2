import api from "./api";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: Pokemon[];
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
