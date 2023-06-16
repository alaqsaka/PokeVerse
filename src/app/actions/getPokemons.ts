import axios from "axios";

export interface IPokemonsParams {
  offset?: number;
}

export default async function getPokemons(page: number) {
  try {
    const pokemons = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 10}`
    );

    return pokemons;
  } catch (error: any) {
    throw new Error(error);
  }
}
