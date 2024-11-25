"use client";

import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemText, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import '@fontsource/russo-one';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { label: "Catálogo Pokémon", link: "/catalogo" },
    { label: "Histórias", link: "/historias" },
    { label: "Curiosidades", link: "/curiosidades" },
    { label: "Opções", link: "/opcoes" },
    { label: "Sobre", link: "/sobre" },
    { label: "Contato", link: "/contato" },
  ];

  return (
    <Box sx={{ display: "flex" }}>

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 250 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
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
          onClick={() => setIsOpen(!isOpen)}
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
          Pokémonpédia
        </Box>

        <Divider sx={{ borderColor: "#fff" }} />

        <List>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#dd523a",
                  color: "#fff",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  color: "#fff",
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
