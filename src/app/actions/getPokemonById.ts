import axios from "axios";

interface IParams {
  id?: string;
}

export default async function getPokemonById(params: IParams) {
  try {
    const { id } = params;

    const pokemons = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    );

    return pokemons;
  } catch (error: any) {
    throw new Error(error);
  }
}
