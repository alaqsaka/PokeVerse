"use client";

import getPokemons from "./actions/getPokemons";
import Container from "./components/Container";
import { use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "./components/Pokemon/PokemonCard";
import { Pokemon } from "./types";

async function getData(page: number) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 10}}`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  // const pokemons = await getPokemons(page == null ? 0 : parseInt(page));
  const data = await getData(page == null ? 0 : parseInt(page));

  console.log("pokemon data ", data);

  return (
    <main>
      <Container>
        <div>
          <div className="flex justify-between">
            <button
              className="join-item btn btn-outline"
              disabled={!data?.previous}
              onClick={() => {
                router.push(`/?page=${page == null ? 1 : parseInt(page) - 1}`);
                router.refresh();
              }}
            >
              Previous page
            </button>
            {data?.next !== null && (
              <button
                className="join-item btn btn-outline"
                onClick={() => {
                  router.push(
                    `/?page=${page == null ? 1 : parseInt(page) + 1}`
                  );
                  router.refresh();
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
          {data?.results.map((pokemon: Pokemon) => {
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
