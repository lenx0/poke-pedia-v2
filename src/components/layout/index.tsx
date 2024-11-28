'use client'

import { ReactNode, useEffect, useState, useRef } from "react";
import { Box, Dialog, DialogContent, Typography, Button, Skeleton, Grid, Pagination as MuiPagination } from "@mui/material";
import Sidebar from "@/components/sidebar/sidebar";
import PokemonCard from "@/components/card";
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
  
  const [pokemonList, setPokemonList] = useState<{
    name: string;
    image: string;
    types: string[],
    weight: number,
    height: number
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
                      weight={pokemon.weight}
                      height={pokemon.height}
                      onDetailsClick={() =>
                        handleShowDetails({
                          name: pokemon.name,
                          image: pokemon.image,
                          types: pokemon.types,
                          weight: pokemon.weight,
                          height: pokemon.height,
                          description: `Um incrível Pokémon chamado ${pokemon.name}!`,
                        })
                      }
                    />
                  </Grid>
                ))}
            </Grid>

            {/* Paginação fixa */}
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

        {/* Diálogo de detalhes */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogContent>
            {selectedPokemon && (
              <Box sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src={selectedPokemon.image}
                  alt={selectedPokemon.name}
                  sx={{ width: "200px", height: "200px", marginBottom: "16px" }}
                />
                <Typography variant="h5" gutterBottom>
                  {selectedPokemon.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Tipos: {selectedPokemon.types.join(", ")}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Peso: {selectedPokemon.weight} kg
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Altura: {selectedPokemon.height} m
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {selectedPokemon.description}
                </Typography>
                <Button
                  onClick={handleCloseDialog}
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "16px" }}
                >
                  Fechar
                </Button>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}
