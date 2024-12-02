import { EvolutionWithImage, PokemonMove } from "@/services/pokemonService";

export interface BasePokemon {
    name: string;
    image: string;
    shinyImage: string;
    types: string[];
    weight: number;
    height: number;
    description: string | null;
    evolutions: EvolutionWithImage[];
    moves: PokemonMove[];
    stats: { name: string; value: number }[];
  }