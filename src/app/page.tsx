"use client";

import getPokemons from "./actions/getPokemons";
import Container from "./components/Container";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "./components/Pokemon/PokemonCard";
import { Pokemon } from "./types";

export const pokemonList = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  },
  {
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/",
  },
  {
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon/4/",
  },
  {
    name: "charmeleon",
    url: "https://pokeapi.co/api/v2/pokemon/5/",
  },
  {
    name: "charizard",
    url: "https://pokeapi.co/api/v2/pokemon/6/",
  },
  {
    name: "squirtle",
    url: "https://pokeapi.co/api/v2/pokemon/7/",
  },
  {
    name: "wartortle",
    url: "https://pokeapi.co/api/v2/pokemon/8/",
  },
  {
    name: "blastoise",
    url: "https://pokeapi.co/api/v2/pokemon/9/",
  },
  {
    name: "caterpie",
    url: "https://pokeapi.co/api/v2/pokemon/10/",
  },
];

export default async function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  console.log(page);

  const pokemons = await getPokemons(page == null ? 0 : parseInt(page));

  console.log(pokemons.data);

  const onNext = () => {
    console.log("page");
  };

  const onBack = () => {};

  return (
    <main>
      <Container>
        <div>
          <div className="flex justify-between">
            <button
              className="join-item btn btn-outline"
              disabled={!pokemons.data?.previous}
              onClick={() => router.push(`/?page=${parseInt(page) - 1}`)}
            >
              Previous page
            </button>
            {pokemons.data?.next !== null && (
              <button
                className="join-item btn btn-outline"
                onClick={() =>
                  router.push(`/?page=${page == null ? 1 : parseInt(page) + 1}`)
                }
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div
          className="
        pt-6  
        grid 
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        gap-8
      "
        >
          {pokemons.data?.results.map((pokemon: Pokemon) => {
            return (
              <div key={pokemon.name}>
                <PokemonCard name={pokemon.name} url={pokemon.url} />
              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
