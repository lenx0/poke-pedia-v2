'use client'

import { ReactNode, useEffect, useState, useRef } from "react";
import { Box, Dialog, DialogContent, Typography, Skeleton, Grid, Pagination as MuiPagination } from "@mui/material";
import Sidebar from "@/components/sidebar/sidebar";
import PokemonCard from "@/components/card";
import { getPokemonDetails, getPokemonList, getPokemonSpecies } from "@/services/pokemonService";

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
  stats: { name: string; value: number }[];
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>("Catálogo Pokémon");

  const [pokemonList, setPokemonList] = useState<{
    name: string;
    image: string;
    types: string[],
    weight: number,
    height: number,
    description: string;
    stats: { name: string; value: number }[];
  }[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const CARDS_PER_PAGE = 8;

  const loadPokemon = async (currentPage: number) => {
    setLoading(true);

    const offset = (currentPage - 1) * CARDS_PER_PAGE;
    const pokemons = await getPokemonList(CARDS_PER_PAGE, offset);

    const pokemonDetails = await Promise.all(
      pokemons.map(async (pokemon) => {
        const id = pokemon.url.split("/").slice(-2, -1)[0];
        const details = await getPokemonDetails(Number(id));
        const description = await getPokemonSpecies(Number(id));
        console.log("details api", details);
        console.log("description api", description);
        return {
          name: details?.name || pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          types: details?.types.map((type) => type.type.name) || [],
          weight: details?.weight || 0,
          height: details?.height || 0,
          description: description,
          stats: details?.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })) || [],
        };
      })
    );

    if (currentPage === 1) {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      setTotalPages(Math.ceil(data.count / CARDS_PER_PAGE));
    }

    setPokemonList(pokemonDetails);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  useEffect(() => {
    if (selectedOption === "Catálogo Pokémon") {
      loadPokemon(page);
    }
  }, [selectedOption, page]);

  const handleShowDetails = (pokemon: SelectedPokemon) => {
    setSelectedPokemon(pokemon);
    console.log("selectedPokemon", pokemon);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPokemon(null);
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
          marginLeft: isSidebarOpen ? "270px" : "20px",
          marginTop: "20px",
          marginBottom: "20px",
          marginRight: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          transition: "margin 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {selectedOption === "Catálogo Pokémon" ? (
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
          >
            <Grid
              container
              ref={containerRef}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {loading
                ? Array.from({ length: CARDS_PER_PAGE }).map((_, index) => (
                  <Grid item
                    key={index}
                    sx={{ padding: 4, margin: "10px" }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="300px"
                      height="220px"
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
                  </Grid>
                ))
                : pokemonList.map((pokemon) => (
                  <Grid item sx={{ padding: 4 }} key={pokemon.name}>
                    <PokemonCard
                      name={pokemon.name}
                      image={pokemon.image}
                      types={pokemon.types}
                      onDetailsClick={() =>
                        handleShowDetails({
                          name: pokemon.name,
                          image: pokemon.image,
                          types: pokemon.types,
                          weight: pokemon.weight,
                          height: pokemon.height,
                          description: pokemon.description,
                          stats: pokemon.stats,
                        })
                      }
                    />
                  </Grid>
                ))}
            </Grid>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "fixed",
                marginLeft: isSidebarOpen ? "125px" : "",
                bottom: 0,
                left: 0,
                padding: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MuiPagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </Box>
        ) : (
          children
        )}

        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
          <DialogContent sx={{ backgroundColor: "#4CAF50", padding: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              {selectedPokemon?.name}
            </Typography>

            <Grid container spacing={3}>
              {/* Esquerda: Imagem e Informações Básicas */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    padding: 2,
                    textAlign: "center",
                    marginBottom: 2,
                  }}
                >
                  <img
                    src={selectedPokemon?.image}
                    alt="Venusaur"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: 300,
                      margin: "0 auto",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    padding: 2,
                  }}
                >
                  <Typography variant="body2">
                    <strong>Peso:</strong> {selectedPokemon?.weight}kg
                  </Typography>
                  <Typography variant="body2">
                    <strong>Altura:</strong> {selectedPokemon?.height}m
                  </Typography>
                  <Typography variant="body2">
                    <strong>Categoria:</strong> Seed
                  </Typography>
                  <Typography variant="body2">
                    <strong>Abilities:</strong> Overgrow
                  </Typography>
                </Box>
              </Grid>

              {/* Direita: Stats e Evoluções */}
              <Grid item xs={12} md={6}>
                {/* Stats */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
                    Base Stats
                  </Typography>
                  <Box>
                    {/* {[
                      { name: "HP", value: 80, color: "#FF5733" },
                      { name: "Attack", value: 82, color: "#33FF57" },
                      { name: "Defense", value: 83, color: "#3357FF" },
                      { name: "Sp. Atk", value: 100, color: "#F1C40F" },
                      { name: "Sp. Def", value: 100, color: "#8E44AD" },
                      { name: "Speed", value: 80, color: "#E74C3C" },
                    ].map((stat) => ( */}
                    {selectedPokemon?.stats.map((stat) => (
                      <Box key={stat.name} sx={{ marginBottom: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {stat.name}: {stat.value}
                        </Typography>
                        <Box
                          sx={{
                            height: 16,
                            width: "100%",
                            backgroundColor: "#e0e0e0",
                            borderRadius: 8,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              width: `${stat.value}%`,
                              // backgroundColor: stat.color,
                              backgroundColor: "red"
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Evoluções */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    padding: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
                    Evoluções
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                      alt="Bulbasaur"
                      style={{ width: 80, height: 80 }}
                    />
                    <Typography variant="h6" sx={{ alignSelf: "center" }}>
                      →
                    </Typography>
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
                      alt="Ivysaur"
                      style={{ width: 80, height: 80 }}
                    />
                    <Typography variant="h6" sx={{ alignSelf: "center" }}>
                      →
                    </Typography>
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
                      alt="Venusaur"
                      style={{ width: 80, height: 80 }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Descrição */}
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: 4,
                padding: 2,
                marginTop: 4,
              }}
            >
              <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
                Descrição
              </Typography>
              <Typography variant="body2">
                {selectedPokemon?.description}
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}
