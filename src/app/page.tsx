"use client";

import getPokemons from "./actions/getPokemons";
import Container from "./components/Container";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "./components/Pokemon/PokemonCard";
import { Pokemon } from "./types";

export default async function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") as unknown as number;

  const pokemons = await getPokemons(page == null ? 0 : page);

  console.log(pokemons.data);

  return (
    <main>
      <Container>
        <div>
          <div className="flex justify-between">
            <button
              className="join-item btn btn-outline"
              disabled={!pokemons.data?.previous}
              onClick={() =>
                router.push(
                  `/?page=${pokemons.data?.previous !== null && page - 1}`
                )
              }
            >
              Previous page
            </button>
            {pokemons.data?.next !== null && (
              <button
                className="join-item btn btn-outline"
                onClick={() =>
                  router.push(`/?page=${page == null ? 1 : page + 1}`)
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
