import { Box, Typography } from "@mui/material";
import Image from "next/image";

export const EvolutionDisplay = ({ evolutions }: { evolutions: string[] }) => (
    <Box sx={{ backgroundColor: "#fff", borderRadius: "10px", padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>Evolutions</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        {evolutions.map((evolution, index) => (
          <Image key={index} src={evolution.image} alt={`Evolution ${index + 1}`} width={100} height={100} />
        ))}
      </Box>
    </Box>
  );
  