"use client";

import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import '@fontsource/russo-one';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
            background: "rgb(235, 17, 17)",
            zIndex: 0,
          }}
        />
      </motion.div>

      {/* right-decoration */}
      {!isMobile && (
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
              background: "rgb(201, 243, 16)",
              zIndex: 0,
            }}
          />
        </motion.div>
      )}

      {/* title */}
      <Box sx={{ paddingTop: "50px", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            Pokémonpédia
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
              margin: "10px 10px 20px 10px",
            }}
          >
            Explore o universo Pokémon, conheça as criaturas e suas habilidades!
          </Typography>
        </motion.div>

        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 10 }}
          >
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Link href="/explore" passHref>
                <Button variant="contained">Explorar</Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 8 }}
          >
            <Button
              href="/explore"
              sx={{
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
        )}
      </Box>

      {/* float-button */}
      {!isMobile && (
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
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 6 }}
      >
        <Box
          component="footer"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
            backgroundColor: "#3a3a3fe6",
            padding: "10px 20px",
            color: "white",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{
            marginTop: "10px",
            marginBottom: "10px",
            width: { sm: "50%" },
          }}>
            <Typography variant="h6" sx={{ fontSize: { xs: "0.6rem" } }}>
              Este site utiliza imagens e informações oficiais de propriedade da{" "}
              <strong>The Pokémon Company</strong>.<br /> Todos os direitos são reservados aos seus respectivos proprietários.
            </Typography>
          </Box>
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
