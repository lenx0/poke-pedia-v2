import { Grid, Skeleton } from "@mui/material";

export const PokemonCardSkeleton = ({ count }: { count: number }) => (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item key={index} sx={{ padding: 4, margin: "10px" }}>
          <Skeleton variant="rectangular" width="300px" height="220px" sx={{ borderRadius: "10px 10px 0 0" }} />
          <Skeleton variant="text" width="100%" height="50px" sx={{ borderRadius: "5px" }} />
          <Skeleton variant="rectangular" width="100%" height="60px" sx={{ borderRadius: "0 0 10px 10px" }} />
        </Grid>
      ))}
    </>
  );
  