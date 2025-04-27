'use client'

import React, { useEffect, useState, useRef } from "react";
import { Box, Dialog, DialogContent, Typography, Grid, Pagination as MuiPagination, Button } from "@mui/material";
import Sidebar from "@/components/sidebar";
import PokemonCard from "@/components/card";
import { getPokemonDetails, getPokemonEvolutionsWithImages, getPokemonList, getPokemonSpecies } from "@/services/pokemonService";
import { EvolutionWithImage, PokemonMove } from "@/services/pokemonService";
import Image from "next/image";
import Moves from "../moves";
import { PokemonCardSkeleton } from "../skeleton";
import { typeColors } from "../utils/TypeColors";
import PokemonFilter from "../pokemonFilter";
import { capitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";

interface LayoutProps {
  children: React.ReactNode;
}

interface BasePokemon {
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

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [movesDialogOpen, setMovesDialogOpen] = useState(false);

  const handleOpenMovesDialog = () => setMovesDialogOpen(true);
  const handleCloseMovesDialog = () => setMovesDialogOpen(false);

  const [selectedOption, setSelectedOption] = useState<string | null>("Catálogo Pokémon");
  const [pokemonList, setPokemonList] = useState<BasePokemon[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<BasePokemon | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [shinyVersion, setShinyVersion] = useState(false)

  const containerRef = useRef<HTMLDivElement | null>(null);

  const CARDS_PER_PAGE = 8;

  const statColors: { [key: string]: string } = {
    hp: "#ec1644ce", // Cor para HP
    attack: "#eb8e36dd", // Cor para Attack
    defense: "#1737f0d5", // Cor para Defense
    "special-attack": "#6f1585be", // Cor para Special Attack
    "special-defense": "#6f1585be", // Cor para Special Defense
    speed: "#1ae75ec8", // Cor para Speed
  };

  const loadPokemon = async (currentPage: number) => {
    setLoading(true);

    const offset = (currentPage - 1) * CARDS_PER_PAGE;
    const pokemons = await getPokemonList(CARDS_PER_PAGE, offset);

    const pokemonDetails = await Promise.all(
      pokemons.map(async (pokemon) => {
        const id = pokemon.url.split("/").slice(-2, -1)[0];
        const details = await getPokemonDetails(Number(id));
        const description = await getPokemonSpecies(Number(id));
        const evolutions = await getPokemonEvolutionsWithImages(Number(id));
        console.log("evolutions api", evolutions);
        console.log("details api", details);
        console.log("description api", description);
        return {
          name: details?.name || pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          shinyImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png` || '',
          types: details?.types.map((type) => type.type.name) || [],
          weight: details?.weight || 0,
          height: details?.height || 0,
          description: description || "No description available",
          evolutions: evolutions || [],
          stats: details?.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })) || [],
          moves: details?.moves || [],
        };
      })
    );

    if (currentPage === 1) {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      setTotalPages(Math.ceil(data.count / CARDS_PER_PAGE));
    }

    setPokemonList(pokemonDetails);
    setLoading(false);
  }

  const handleShowDetails = (pokemon: BasePokemon) => {
    setSelectedPokemon(pokemon);
    console.log("selectedPokemon", pokemon);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPokemon(undefined);
    setShinyVersion(false)
  };

  const handleChangeVersion = () => {
    setShinyVersion((prevState) => !prevState)
  }

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
        height: "100%",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onSelectOption={(option) => setSelectedOption(option)}
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
          padding: { xl: "20px", sm: 0 },
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
            flexDirection: "column",
            marginTop: { xl: 0, xs: 8 },
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
              {/* <PokemonFilter /> */}
              {loading
                ? <PokemonCardSkeleton count={CARDS_PER_PAGE} />
                : pokemonList.map((pokemon) => (
                  <Grid item sx={{ padding: { xl: 4, sm: 0 }, marginBottom: { xl: 0, xs: 5 } }} key={pokemon.name}>
                    <PokemonCard
                      name={pokemon.name}
                      image={pokemon.image}
                      types={pokemon.types}
                      onDetailsClick={() =>
                        handleShowDetails({
                          name: pokemon.name,
                          image: pokemon.image,
                          shinyImage: pokemon.shinyImage,
                          types: pokemon.types,
                          weight: pokemon.weight,
                          height: pokemon.height,
                          description: pokemon.description,
                          evolutions: pokemon.evolutions,
                          moves: pokemon.moves,
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
          null
        )}
        <Moves
          handleCloseMovesDialog={handleCloseMovesDialog}
          movesDialogOpen={movesDialogOpen}
          selectedPokemon={selectedPokemon}
        />
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
          <DialogContent sx={{
            backgroundColor:
              selectedPokemon?.types?.[0] && typeColors[selectedPokemon.types[0]]
                ? typeColors[selectedPokemon.types[0]]
                : "#3b3a3f",
            padding: 4,
          }}>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              {selectedPokemon?.name ? capitalizeFirstLetter(selectedPokemon.name) : 'Nome não disponível'}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                    textAlign: "center",
                    marginBottom: 2,
                  }}
                >
                  {selectedPokemon?.image || selectedPokemon?.shinyImage ? (
                    <Box
                      sx={{
                        width: {
                          xs: 150,
                          sm: 200,
                          md: 250,
                          lg: 300,
                          xl: 300,
                        },
                        height: {
                          xs: 150,
                          sm: 200,
                          md: 307,
                          lg: 307,
                          xl: 307,
                        },
                        position: "relative",
                      }}
                    >
                      <Image
                        src={!shinyVersion ? selectedPokemon?.image : selectedPokemon?.shinyImage}
                        alt="Venusaur"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                  ) : (
                    children
                  )}

                </Box>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: {
                      xs: 150,
                      sm: 200,
                      md: "auto",
                      lg: "auto",
                      xl: "auto",
                    },
                  }}
                >
                  <Box display="flex" justifyContent="center" width="100%">
                    <Grid container spacing={2} justifyContent="center">
                      {/* Primeira coluna */}
                      <Grid item xs={6}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Typography variant="body2">
                            <strong>Weight:</strong> {selectedPokemon?.weight}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Height:</strong> {selectedPokemon?.height}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Segunda coluna */}
                      <Grid item xs={6}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="body2">
                          <strong>Type:</strong>{" "}
                          {selectedPokemon?.types.map((type, index) => (
                            <span key={type} style={{ color: typeColors[type] || "#000" }}>
                              {capitalizeFirstLetter(type)}
                              {index < selectedPokemon.types.length - 1 && ' '}
                            </span>
                          ))}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Evolve to:</strong>{" "}
                          <span>soon</span>
                        </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    mt: 3,
                    gap: 2
                  }}>
                    <Button variant="contained" color="primary" sx={{
                      borderRadius: "5px",
                      width: 100,
                      height: 20,
                    }}
                      onClick={handleOpenMovesDialog}
                    >Moves</Button>
                    <Button variant="contained" color="primary" sx={{
                      borderRadius: "5px",
                      width: 100,
                      height: 20,
                    }}
                      onClick={() => handleChangeVersion()}
                    >{shinyVersion ? "normal" : "shiny"}</Button>
                  </Box>
                </Box>

              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
                    Base Stats
                  </Typography>
                  <Box>
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
                            borderRadius: "10px",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              width: `${stat.value}%`,
                              backgroundColor: statColors[stat.name] || "gray", // Fallback para cor padrão
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: 2,
                    display: "flex",
                    maxHeight: "17vh",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
                    Evoluções
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: (selectedPokemon?.evolutions?.length || 0) > 4 ? "flex-start" : "center",
                      overflowX: "auto",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    {selectedPokemon?.evolutions.map((evolution, index) => (
                      <React.Fragment key={index}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          {evolution.image ? (
                            <Image
                              src={evolution?.image || ""}
                              alt={evolution?.name || ""}
                              width={80}
                              height={80}
                            />
                          ) : (
                            <Typography variant="h6">Imagem não disponível</Typography>
                          )}

                        </Box>
                        {index < selectedPokemon.evolutions.length - 1 && ( // Verifica se não é o último
                          <Typography
                            variant="h6"
                            sx={{ alignSelf: "center", marginX: 1, flexShrink: 0 }}
                          >
                            →
                          </Typography>
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "10px",
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
