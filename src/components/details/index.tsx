import { Box, Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import Image from "next/image";

export const PokemonDetailsDialog = ({
    open,
    onClose,
    pokemon,
    shinyVersion,
    onToggleVersion,
    onShowMoves,
  }: {
    open: boolean;
    onClose: () => void;
    pokemon: SelectedPokemon | null;
    shinyVersion: boolean;
    onToggleVersion: () => void;
    onShowMoves: () => void;
  }) => (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent sx={{ backgroundColor: "#3b3a3f", padding: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", textAlign: "center", fontWeight: "bold", marginBottom: 4 }}>
          {pokemon?.name}
        </Typography>
        <Grid container spacing={3}>
          {/* Esquerda */}
          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: "#fff", borderRadius: "10px", padding: 2, textAlign: "center", marginBottom: 2 }}>
              <Image src={shinyVersion ? pokemon?.shinyImage : pokemon?.image} alt={pokemon?.name || ""} width={300} height={300} />
            </Box>
            <Box sx={{ backgroundColor: "#fff", borderRadius: "10px", padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Informações básicas */}
              <Grid container marginLeft={14}>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Peso:</strong> {pokemon?.weight}kg</Typography>
                  <Typography variant="body2"><strong>Altura:</strong> {pokemon?.height}m</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Categoria:</strong> Seed</Typography>
                  <Typography variant="body2"><strong>Abilities:</strong> Overgrow</Typography>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
                <Button variant="contained" color="primary" onClick={onShowMoves}>Moves</Button>
                <Button variant="contained" color="primary" onClick={onToggleVersion}>{shinyVersion ? "Normal" : "Shiny"}</Button>
              </Box>
            </Box>
          </Grid>
          {/* Direita */}
          <Grid item xs={12} md={6}>
            <StatsDisplay stats={pokemon?.stats || []} />
            <EvolutionDisplay evolutions={pokemon?.evolutions || []} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
  