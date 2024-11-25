"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import '@fontsource/russo-one';

interface PokemonCardProps {
  name: string;
  image: string;
  description: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, description }) => {
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
      {/* Imagem do Pokémon */}
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "contain",
          backgroundColor: "#ddd",
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
