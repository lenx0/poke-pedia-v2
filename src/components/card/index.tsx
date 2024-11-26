"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import '@fontsource/russo-one';

import "./styles.css";

interface PokemonCardProps {
  name: string;
  image: string;
  description: string;
  types: string[];
}

const typeIcons: Record<string, string> = {
  fire: "/icons/fire.svg",
  water: "/icons/water.svg",
  grass: "/icons/grass.svg",
  bug: "/icons/bug.svg",
  normal: "/icons/normal.svg",
  ground: "/icons/ground.svg",
  fairy: "/icons/fairy.svg",
  psychic: "/icons/psychic.svg",
  rock: "/icons/rock.svg",
  ice: "/icons/ice.svg",
  dragon: "/icons/dragon.svg",
  ghost: "/icons/ghost.svg",
  dark: "/icons/dark.svg",
  steel: "/icons/steel.svg",
  fighting: "/icons/fighting.svg",
  electric: "/icons/electric.svg",
  poison: "/icons/poison.svg",
  flying: "/icons/flying.svg",
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, description, types }) => {
  return (
    <Box
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
      <Box position="absolute" margin={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          {types.map((type) => (
            <Box
              className={`icon ${type}`}
              key={type}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textTransform: "capitalize",
              }}
            >
              <Box
                component="img"
                src={typeIcons[type] || "/icons/default.svg"}
                alt={type}
                sx={{ width: "24px", height: "24px" }}
              />
              {/* <Typography sx={{ fontSize: "0.875rem", color: "#333" }}>{type}</Typography> */}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Imagem do Pokémon */}
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "contain",
          // backgroundColor: "#ddd",
        }}
      />

      {/* Nome do Pokémon */}
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          padding: "10px 0",
          backgroundColor: "#dd523a",
          color: "#fff",
          textTransform: "uppercase",
        }}
      >
        {name}
      </Typography>

      {/* Descrição */}
      <Box
        sx={{
          padding: "10px",
          backgroundColor: "#fff",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#333",
            textAlign: "center",
            maxHeight: "100px",
            overflowY: "auto",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default PokemonCard;
