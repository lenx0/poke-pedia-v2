'use client'

import { ReactNode, useEffect, useState } from "react";
import { Box, Dialog, DialogContent, Typography, Button, Skeleton } from "@mui/material";
import Sidebar from "@/components/sidebar/sidebar";
import PokemonCard from "@/components/card";
import Pagination from "@/components/pagination";
import { getPokemonDetails, getPokemonList } from "@/services/pokemonService";

interface LayoutProps {
  children: ReactNode;
}

interface SelectedPokemon {
  name: string;
  image: string;
  types: string[];
  weight: number;
  height: number;
  description: string;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>("Catálogo Pokémon");
  const [pokemonList, setPokemonList] = useState<
    { name: string; image: string; types: string[], weight: number, height: number }[]
  >([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const POKEMON_PER_PAGE = 8;

  const loadPokemon = async (currentPage: number) => {
    setLoading(true); // Ativar o loader
    const offset = (currentPage - 1) * POKEMON_PER_PAGE;
    const pokemons = await getPokemonList(POKEMON_PER_PAGE, offset);

    const pokemonDetails = await Promise.all(
      pokemons.map(async (pokemon) => {
        const id = pokemon.url.split("/").slice(-2, -1)[0];
        const details = await getPokemonDetails(Number(id));
        return {
          name: details?.name || pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          types: details?.types.map((type) => type.type.name) || [],
          weight: details?.weight || 0,
          height: details?.height || 0,
        };
      })
    );

    if (currentPage === 1) {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      setTotalPages(Math.ceil(data.count / POKEMON_PER_PAGE));
    }

    setPokemonList(pokemonDetails);
    await new Promise((resolve) => setTimeout(resolve, 500))
    setLoading(false); // Desativar o loader
  };

  useEffect(() => {
    if (selectedOption === "Catálogo Pokémon") {
      loadPokemon(page);
    }
  }, [selectedOption, page]);

  const handleShowDetails = (pokemon: SelectedPokemon) => {
    setSelectedPokemon(pokemon);
    setDialogOpen(true);
  };

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
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onSelect={(option) => setSelectedOption(option)}
      />

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
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                marginBottom: "20px",

              }}
            >
              {loading
                ? Array.from({ length: POKEMON_PER_PAGE }).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "300px",
                      backgroundColor: "#f7f7f7",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      overflow: "hidden",
                      fontFamily: "'Russo One', sans-serif",
                      margin: "10px",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="200px"
                      sx={{
                        borderRadius: "10px 10px 0 0",
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width="100%"
                      height="50px"
                      sx={{

                        borderRadius: "5px",
                      }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="60px"
                      sx={{
                        borderRadius: "0 0 10px 10px",
                      }}
                    />
                  </Box>
                ))
                : pokemonList.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                    weight={pokemon.weight}
                    height={pokemon.height}
                    onDetailsClick={() =>
                      handleShowDetails({
                        name: pokemon.name,
                        image: pokemon.image,
                        types: pokemon.types,
                        weight: pokemon?.weight,
                        height: pokemon?.height,
                        description: `Um incrível Pokémon chamado ${pokemon.name}!`,
                      })
                    }
                  />
                ))}

            </Box>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </Box>
        ) : (
          children
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            fontFamily: "'Russo One', sans-serif",
            backgroundColor: "#f5f5f5",
          }}
        >
          {selectedPokemon && (
            <>
              <Box
                component="img"
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                sx={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  color: "#dd523a",
                  textTransform: "uppercase",
                }}
              >
                {selectedPokemon.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#333",
                  textAlign: "center",
                  maxWidth: "600px",
                }}
              >
                {selectedPokemon.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography>Altura: {selectedPokemon.height / 10} m</Typography>
                <Typography>Peso: {selectedPokemon.weight / 10} kg</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "10px" }}>
                {selectedPokemon.types.map((type) => (
                  <Typography
                    key={type}
                    sx={{
                      backgroundColor: "#3a3a3f",
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "5px 10px",
                    }}
                  >
                    {type}
                  </Typography>
                ))}
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#dd523a",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#bb412f" },
                }}
                onClick={() => setDialogOpen(false)}
              >
                Fechar
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
