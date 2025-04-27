import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { MovesProps } from "./moves.types";
import { capitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";

export default function Moves({
  movesDialogOpen,
  handleCloseMovesDialog,
  selectedPokemon,
}: MovesProps) {

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentMoves =
    selectedPokemon?.moves.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ) || [];

  return (
    <Dialog open={movesDialogOpen} onClose={handleCloseMovesDialog} maxWidth="lg" fullWidth>
      <DialogContent sx={{ backgroundColor: "#3b3a3f", padding: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          {capitalizeFirstLetter(selectedPokemon?.name) + "'s"} moves list
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: 3,
            maxHeight: 400,
            overflowY: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#f0f0f0", textAlign: "center", fontWeight: "bold" }}>
                  Habilidades
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f0f0f0", textAlign: "center", fontWeight: "bold" }}>
                  Método de Aprendizado
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f0f0f0", textAlign: "center", fontWeight: "bold" }}>
                  Nível de Aprendizado
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f0f0f0", textAlign: "center", fontWeight: "bold" }}>
                  Versão
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentMoves.map((moveObj, index) => {
                console.log("move", moveObj)
                return ( 
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>{moveObj.move.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {moveObj.version_group_details[0].move_learn_method.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {moveObj.version_group_details[0].level_learned_at}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {moveObj.version_group_details[0].version_group.name}
                  </TableCell>
                </TableRow>
                )
})}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={selectedPokemon?.moves.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .MuiTablePagination-selectIcon": { color: "#ffffff" },
            "& .MuiTablePagination-displayedRows": { color: "#ffffff" },
            "& .MuiTablePagination-actions .MuiButtonBase-root": { color: "#ffffff" },
            "& .MuiTablePagination-selectLabel": { color: "#ffffff" },
            "& .MuiTablePagination-select": { color: "#ffffff" },
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
