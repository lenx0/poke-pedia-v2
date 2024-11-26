"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import '@fontsource/russo-one';

interface PaginationProps {
  currentPage: number; // Página atual
  totalPages: number; // Total de páginas
  onNext: () => void; // Função para avançar para a próxima página
  onPrevious: () => void; // Função para retroceder para a página anterior
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontFamily: "'Russo One', sans-serif",
        marginTop: "20px",
      }}
    >
      {/* Botão Anterior */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#dd523a",
          "&:hover": { backgroundColor: "#bf3f2a" },
        }}
        disabled={currentPage === 1}
        onClick={onPrevious}
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
        Página {currentPage} de {totalPages}
      </Typography>

      {/* Botão Próximo */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#dd523a",
          "&:hover": { backgroundColor: "#bf3f2a" },
        }}
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Próximo
      </Button>
    </Box>
  );
};

export default Pagination;
