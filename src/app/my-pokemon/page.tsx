"use client";

import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import Container from "../components/Container";
import { useState } from "react";
import PokemonCard from "../components/Pokemon/PokemonCard";

const MyPokemon = () => {
  // Check list of users pokemon in local storage
  const [usersPokemon, setUsersPokemon] = useState(
    JSON.parse(localStorage.getItem("usersPokemons"))
  );

  if (usersPokemon?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Pokemon Found"
          subtitle="Looks like you havent catch any pokemon."
        />
      </ClientOnly>
    );
  }

  const handleDelete = (name: string) => {
    console.log("handle Delete");
    console.log(name);
    setUsersPokemon(usersPokemon.filter((pokemon) => pokemon.name != name));
    localStorage.setItem(
      "usersPokemons",
      JSON.stringify(usersPokemon.filter((pokemon) => pokemon.name != name))
    );
  };

  return (
    <ClientOnly>
      <Container>
        <h1 className="text-3xl font-bold">My Pokemons</h1>
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
          {usersPokemon?.map((pokemon) => (
            <PokemonCard
              name={pokemon.name}
              url={pokemon.id}
              key={pokemon.name}
              onAction={() => handleDelete(pokemon.name)}
              actionLabel="Release Pokemon"
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default MyPokemon;
