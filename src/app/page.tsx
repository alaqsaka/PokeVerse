"use client";

import getPokemons from "./actions/getPokemons";
import Container from "./components/Container";
import { use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "./components/Pokemon/PokemonCard";
import { Pokemon } from "./types";

function makeQueryClient() {
  const fetchMap = new Map<string, Promise<any>>();
  return function queryClient<QueryResult>(
    name: string,
    query: () => Promise<QueryResult>
  ): Promise<QueryResult> {
    if (!fetchMap.has(name)) {
      fetchMap.set(name, query());
    }
    return fetchMap.get(name)!;
  };
}

const queryClient = makeQueryClient();

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const pokemons = use(
    queryClient("pokemon", () =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
          page == null ? 0 : parseInt(page) * 10
        }`
      ).then((res) => res.json())
    )
  );

  console.log("pokemonn ", pokemons);

  // const pokemons = await getPokemons(page == null ? 0 : parseInt(page));

  return (
    <main>
      <Container>
        <div>
          <div className="flex justify-between">
            <button
              className="join-item btn btn-outline"
              disabled={!pokemons.data?.previous}
              onClick={() => {
                router.push(`/?page=${page == null ? 1 : parseInt(page) - 1}`);
                // router.refresh();
              }}
            >
              Previous page
            </button>
            {pokemons.data?.next !== null && (
              <button
                className="join-item btn btn-outline"
                onClick={() => {
                  router.push(
                    `/?page=${page == null ? 1 : parseInt(page) + 1}`
                  );
                  // router.refresh();
                }}
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
          {pokemons.results.map((pokemon: Pokemon) => {
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
