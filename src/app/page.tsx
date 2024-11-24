"use client";

import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import '@fontsource/russo-one';
import Image from "next/image";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >

      {/* left-decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 4 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 0, 0, 0.527)",
            zIndex: 0,
          }}
        />
      </motion.div>

      {/* right-decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 4 }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(183, 219, 23, 0.623)",
            zIndex: 0,
          }}
        />
      </motion.div>

      {/* title */}
      <Box sx={{ paddingTop: "50px", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: { lg: "7.5rem", xs: "2.5rem", sm: "3.5rem" },
            }}
          >
            Pokémon Pédia
          </Typography>
        </motion.div>

        {/* subtitle-1 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: { xs: "1rem", sm: "1.25rem" },

            }}
          >
            O guia definitivo para treinadores e entusiastas Pokémon!
          </Typography>
        </motion.div>

        {/* subtitle-2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 4 }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Explore o universo Pokémon, conheça as criaturas e suas habilidades!
          </Typography>
        </motion.div>

        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 10 }}
        >
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Button variant="contained">Explorar</Button>
        </div>
        </motion.div>
        
      </Box>

      {/* float-button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 8 }}
      >
        <Button
          href="/explore"
          sx={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            padding: 0,
            minWidth: "unset",
            backgroundColor: "transparent",
            border: "none",
            animation: "bounce 1.5s infinite",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Image
            src="/images/pokeball.png"
            alt="Entrar"
            width={80}
            height={80}
          />
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 6 }}
      >
        <Box
          component="footer"
          sx={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "#3a3a3fe6",
            padding: "10px 20px",
            color: "white",
          }}
        >
          <Typography variant="h6">
            Este site utiliza imagens e informações oficiais de propriedade da{" "}
            <strong>The Pokémon Company</strong>. Todos os direitos são reservados aos seus respectivos proprietários.
          </Typography>
        </Box>
      </motion.div>

      <style jsx global>{`
          @keyframes bounce {
            0%,
            20%,
            50%,
            80%,
            100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }
        `}</style>
    </Box>
  );
}
