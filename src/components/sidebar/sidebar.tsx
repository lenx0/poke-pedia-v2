"use client";

import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemText, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import '@fontsource/russo-one';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSelect: (option: string) => void; // Callback para enviar a opção selecionada
}

export default function Sidebar({ isOpen, toggleSidebar, onSelect }: SidebarProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>('Catálogo Pokémon'); // Opção ativa

  const menuItems = [
    { label: "Catálogo Pokémon", value: "Catálogo Pokémon" },
    { label: "Histórias", value: "Histórias" },
    { label: "Curiosidades", value: "Curiosidades" },
    { label: "Opções", value: "Opções" },
    { label: "Sobre", value: "Sobre" },
    { label: "Contato", value: "Contato" },
  ];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option); // Notifica o Layout
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Botão Flutuante */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 250 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: "30px",
          left: isOpen ? "20px" : "30px",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#dd523a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          }}
          onClick={toggleSidebar}
        >
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "'Russo One', sans-serif",
              fontSize: "1.5rem",
            }}
          >
            ☰
          </Typography>
        </Box>
      </motion.div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "250px",
          backgroundColor: "#3a3a3f",
          boxShadow: "2px 0px 6px rgba(0, 0, 0, 0.2)",
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#dd523a",
            color: "#fff",
            fontFamily: "'Russo One', sans-serif",
            fontSize: "1.5rem",
          }}
        >
          Pokemonpédia
        </Box>
        <Divider sx={{ borderColor: "#fff" }} />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.value}
              sx={{
                padding: "10px 20px",
                backgroundColor: selectedOption === item.value ? "#dd523a" : "transparent",
                color: selectedOption === item.value ? "#fff" : "#ccc",
                "&:hover": {
                  backgroundColor: "#dd523a",
                  color: "#fff",
                },
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
              onClick={() => handleSelect(item.value)}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  fontFamily: "'Russo One', sans-serif",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </motion.div>
    </Box>
  );
}
