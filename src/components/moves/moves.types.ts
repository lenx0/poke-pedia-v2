export interface MoveDetails {
    move: {
      name: string;
    };
    version_group_details: Array<{
      move_learn_method: { name: string };
      level_learned_at: number;
      version_group: { name: string };
    }>;
  }
  
  export interface SelectedPokemon {
    name: string;
    version_group_details?: Array<{
      move_learn_method: { name: string };
      level_learned_at: number;
      version_group: { name: string };
    }>;
  }
  
  export interface MovesProps {
    movesDialogOpen: boolean;
    handleCloseMovesDialog: () => void;
    selectedPokemon?: SelectedPokemon | undefined;
  }