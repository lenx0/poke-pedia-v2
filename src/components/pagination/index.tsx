"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import '@fontsource/russo-one';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
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

      <Typography
        sx={{
          fontSize: "1.2rem",
          color: "#333",
        }}
      >
        Página {currentPage} de {totalPages}
      </Typography>

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
