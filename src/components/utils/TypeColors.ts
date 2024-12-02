export const typeColors: { [key: string]: string } = {
    bug: "#92BC2C",
    dark: "#595761",
    dragon: "#0C69C8",
    electric: "#F2D94E",
    fire: "#FBA54C",
    fairy: "#EE90E6",
    fighting: "#D3425F",
    flying: "#A1BBEC",
    ghost: "#5F6DBC",
    grass: "#5FBD58",
    ground: "#DA7C4D",
    ice: "#75D0C1",
    normal: "#A0A29F",
    poison: "#B763CF",
    psychic: "#FA8581",
    rock: "#C9BB8A",
    steel: "#5695A3",
    water: "#539DDF",
  };
  export const getBackgroundColor = (types: string[]) => {
    if (types.length === 1) {
      return typeColors[types[0]] || "#3b3a3f"; 
    } else if (types.length === 2) {
      return `linear-gradient(135deg, ${typeColors[types[0]] || "#3b3a3f"}, ${typeColors[types[1]] || "#3b3a3f"})`;
    }
    return "#3b3a3f";
  };
  
  