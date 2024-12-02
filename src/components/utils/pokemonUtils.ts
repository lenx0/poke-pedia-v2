import { MoveDetails } from '../moves/moves.types'

export function transformToMoveDetails(pokemonMoves: MoveDetails[]): MoveDetails[] {
  return pokemonMoves.map((move) => ({
    move: move.move,
    version_group_details: [],
  }));
}
