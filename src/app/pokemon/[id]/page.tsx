import getPokemonById from "@/app/actions/getPokemonById";
import Container from "@/app/components/Container";
import Image from "next/image";
import React from "react";

interface IParams {
  id?: string;
}

const PokemonPage = async ({ params }: { params: IParams }) => {
  const pokemon = await getPokemonById(params);

  console.log(pokemon.data);

  return (
    <Container>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
        <div>
          {/* Pokemon name & base experience */}
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-3xl capitalize font-semibold">
              {pokemon.data.species.name}
            </h3>
            <h3 className="text-3xl font-semibold text-slate-600">
              #{pokemon.data.base_experience}
            </h3>
          </div>
          {/* Pokemon name & base experience */}

          <div className="flex justify-center">
            <div className="badge badge-outline mt-3 p-3">
              <h1 className="text-lg uppercase">
                {pokemon.data.types[0].type.name}
              </h1>
            </div>
          </div>

          {/* Pokemon Image */}
          <div className="mt-10 flex justify-center">
            <Image
              width={400}
              // fill
              height={400}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${params.id}.svg`}
              alt="Pokemon"
              className="object-contain h-auto min-w-400 min-h-400 max-h-400"
            />
          </div>
          {/* Pokemon Image */}
        </div>
        <div>
          <h2 className="text-xl font-bold">About</h2>
          {/* Versions */}
          <h3 className="text-lg font-bold">Version</h3>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 text-center">
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body items-center">
                <h2 className="card-title">Height</h2>
                <p className="capitalize">{pokemon.data.height}m</p>
              </div>
            </div>

            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body items-center">
                <h2 className="card-title">Weight</h2>
                <p className="capitalize">{pokemon.data.height}kg</p>
              </div>
            </div>

            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body items-center">
                <h2 className="card-title">Types</h2>
                <p className="capitalize">
                  {pokemon.data.types[0]?.type?.name}
                </p>
              </div>
            </div>
          </div>
          {/* Version */}
          {/* Stats */}
          <div className="mt-2">
            <h3 className="text-lg font-bold">Stats</h3>
            <div>
              {pokemon.data.stats.map((stat) => (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                    <div className="flex md:justify-between">
                      {" "}
                      <p className="capitalize mr-2 text-slate-600">
                        {stat.stat.name}
                      </p>
                      <p className="capitalize">{stat.base_stat}</p>
                    </div>
                    <progress
                      className="progress progress-success w-full"
                      value={stat.base_stat}
                      max="100"
                    ></progress>
                  </div>
                </>
              ))}
            </div>
          </div>
          {/* Stats */}
        </div>
      </div>
    </Container>
  );
};

export default PokemonPage;
