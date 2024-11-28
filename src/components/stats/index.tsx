import React from "react";
import { Box, Typography } from "@mui/material";

interface StatBarProps {
  name: string;
  value: number;
  color: string;
}

const StatBar: React.FC<StatBarProps> = ({ name, value, color }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {name.toUpperCase()}: {value}
      </Typography>
      <Box
        sx={{
          height: 16,
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${value}%`,
            backgroundColor: color,
          }}
        />
      </Box>
    </Box>
  );
};

export default StatBar;
