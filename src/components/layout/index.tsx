"use client";

import { ReactNode, useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "@/components/sidebar/sidebar";
import PokemonCard from "@/components/card";
import { getPokemonList } from "@/services/pokemonService";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const POKEMON_PER_PAGE = 8;

  // Função para carregar Pokémon
  const loadPokemon = async (currentPage: number) => {
    const offset = (currentPage - 1) * POKEMON_PER_PAGE;
    const pokemons = await getPokemonList(POKEMON_PER_PAGE, offset);
    setPokemonList(pokemons);

    // Calcula o total de páginas com base no total de Pokémon
    if (currentPage === 1) {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      setTotalPages(Math.ceil(data.count / POKEMON_PER_PAGE));
    }
  };

  // Carrega os Pokémon sempre que a página ou a opção selecionada mudar
  useEffect(() => {
    if (selectedOption === "Catálogo Pokémon") {
      loadPokemon(page);
    }
  }, [selectedOption, page]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onSelect={(option) => setSelectedOption(option)} // Passa a opção selecionada
      />

      {/* Janela de Conteúdo */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: isSidebarOpen ? "260px" : "20px",
          marginTop: "20px",
          marginBottom: "20px",
          marginRight: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          transition: "margin 0.3s ease-in-out",
        }}
      >
        {selectedOption === "Catálogo Pokémon" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Cards */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {pokemonList.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url
                    .split("/")
                    .slice(-2, -1)}.png`}
                  description="Descrição do Pokémon carregada futuramente."
                />
              ))}
            </Box>

            {/* Paginação */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                fontFamily: "'Russo One', sans-serif",
              }}
            >
              {/* Botão Anterior */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#dd523a",
                  "&:hover": { backgroundColor: "#bf3f2a" },
                }}
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                Anterior
              </Button>

              {/* Número da Página */}
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                Página {page} de {totalPages}
              </Typography>

              {/* Botão Próximo */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#dd523a",
                  "&:hover": { backgroundColor: "#bf3f2a" },
                }}
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Próximo
              </Button>
            </Box>
          </Box>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}
