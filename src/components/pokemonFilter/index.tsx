import React, { useEffect, useState } from "react";
import { filterPokemonByType } from "@/services/pokemonService";
import api from "@/services/api";

interface PokemonType {
  name: string;
  url: string;
}

const PokemonFilter: React.FC = () => {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

  const fetchPokemonTypes = async () => {
    try {
      const response = await api.get("/type");
      setTypes(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar os tipos de Pokémon:", error);
    }
  };

  const handleTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    setSelectedType(type);

    if (type) {
      console.log(`Filtrando Pokémon do tipo: ${type}`);
      await filterPokemonByType(type);
    }
  };

  useEffect(() => {
    fetchPokemonTypes();
  }, []);

  return (
    <div>
      <h3>Filtro por Tipo de Pokémon</h3>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Selecione um tipo</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonFilter;
