import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

const MyPokemon = () => {
  // Get from local storage
  const userPokemonList = [];

  if (userPokemonList.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Pokemon Found"
          subtitle="Looks like you havent catch any pokemon."
        />
      </ClientOnly>
    );
  }

  return <ClientOnly>List of pokemons</ClientOnly>;
};

export default MyPokemon;
