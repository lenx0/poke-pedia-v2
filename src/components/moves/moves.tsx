import { useState } from 'react';
import { Dialog, DialogContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";

export default function Moves({ movesDialogOpen, handleCloseMovesDialog, selectedPokemon }) {
    // Estado para gerenciar a paginação
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Defina quantas linhas você quer por página

    // Função para lidar com a mudança de página
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Função para lidar com a mudança de linhas por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Voltar para a primeira página após mudar a quantidade de linhas
    };

    // Calcular as linhas a serem exibidas na página atual
    const currentMoves = selectedPokemon?.moves.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [];

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
                    Lista de habilidades de {selectedPokemon?.name}
                </Typography>

                <TableContainer
                    component={Paper}
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: 3,
                        maxHeight: 400, // Define uma altura máxima para a tabela
                        overflowY: "auto", // Adiciona rolagem vertical se necessário
                    }}
                >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: "#f0f0f0", width: "20%", textAlign: "center", fontWeight: "bold" }}>Habilidades</TableCell>
                                <TableCell sx={{ backgroundColor: "#f0f0f0", width: "30%", textAlign: "center", fontWeight: "bold" }}>Método de Aprendizado</TableCell>
                                <TableCell sx={{ backgroundColor: "#f0f0f0", width: "30%", textAlign: "center", fontWeight: "bold" }}>Nível de Aprendizado</TableCell>
                                <TableCell sx={{ backgroundColor: "#f0f0f0", width: "30%", textAlign: "center", fontWeight: "bold" }}>Versão</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentMoves.map((moveObj, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ fontFamily: "Arial", textAlign: "center" }}>{moveObj.move.name}</TableCell>
                                    <TableCell sx={{ fontFamily: "Arial", textAlign: "center" }}>{moveObj.version_group_details[0].move_learn_method.name}</TableCell>
                                    <TableCell sx={{ fontFamily: "Arial", textAlign: "center" }}>{moveObj.version_group_details[0].level_learned_at}</TableCell>
                                    <TableCell sx={{ fontFamily: "Arial", textAlign: "center" }}>{moveObj.version_group_details[0].version_group.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Componente de paginação */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={selectedPokemon?.moves.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        "& .MuiTablePagination-selectIcon": {
                            color: "#ffffff" // Cor do ícone de seleção (exemplo)
                        },
                        "& .MuiTablePagination-displayedRows": {
                            color: "#ffffff" // Cor do texto de exibição de linhas (exemplo)
                        },
                        "& .MuiTablePagination-actions .MuiButtonBase-root": {
                            color: "#ffffff" // Cor dos ícones de navegação (exemplo)
                        },
                        "& .MuiTablePagination-selectLabel": {
                            color: "#ffffff" // Cor do texto da label do seletor de linhas por página
                        },
                        "& .MuiTablePagination-select": {
                            color: "#ffffff", // Cor do texto do seletor de linhas por página

                        }
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
