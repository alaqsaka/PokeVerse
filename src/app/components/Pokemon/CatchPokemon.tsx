"use client";

import Image from "next/image";
import { useState } from "react";
import Lottie from "lottie-react";
import pokeballAnimation from "../../../../public/lf20_iwmd6pyr.json";

interface CatchPokemonProps {
  pokemon?: Pokemon;
  img: string;
  id: number;
}

interface Pokemon {
  name: string;
  url: string;
}

const CatchPokemon: React.FC<CatchPokemonProps> = ({ pokemon, img, id }) => {
  const [success, setSuccess] = useState(null);
  const [loading, setloading] = useState(false);

  // Check list of users pokemon in local storage
  let usersPokemon = JSON.parse(localStorage.getItem("usersPokemons"));

  // If there is no list, create new list
  if (usersPokemon == null) {
    localStorage.setItem("usersPokemons", "[]");
  }

  // Check if pokemon already exist in localStorage
  function containsObject(obj: any, list: any) {
    var i;
    for (i = 0; i < list?.length; i++) {
      if (list[i].name == obj.name) {
        return true;
      }
    }
    return false;
  }

  const pokomenExist = containsObject(pokemon, usersPokemon);

  function catchPokemon() {
    const randomNumber = Math.random();
    const isSuccess = randomNumber > 0.5 ? true : false;

    if (isSuccess) {
      // Save to local storage
      const addedPokemon = { name: pokemon?.name, id: parseInt(id) };
      usersPokemon.push(addedPokemon);
      localStorage.setItem("usersPokemons", JSON.stringify(usersPokemon));
    }

    setloading(true);
    setTimeout(() => {
      setSuccess(isSuccess);
      setloading(false);
    }, 3000);
  }

  return (
    <>
      {/* Modal */}
      <button
        className="btn btn-primary w-full mt-3"
        disabled={pokomenExist}
        onClick={() => window.my_modal_1.showModal()}
      >
        {pokomenExist ? "You already catched this pokemon." : "Start Caching!"}
      </button>
      <dialog id="my_modal_1" className="modal px-10">
        <form method="dialog" className="modal-box w-full max-w-full ">
          <div className="mt-10 flex flex-col items-center gap-5">
            <h1 className="text-3xl font-bold">Catch {pokemon?.name}</h1>

            {loading ? (
              <Lottie
                animationData={pokeballAnimation}
                loop={true}
                style={{
                  height: 120,
                }}
              />
            ) : (
              <Image
                src={img}
                height={120}
                width={120}
                alt={`${pokemon?.name}`}
              />
            )}
            <button
              className="btn btn-primary"
              onClick={catchPokemon}
              disabled={success || loading}
            >
              {success == null ? `Catch ${pokemon?.name}` : ""}
              {success == false && `Try Again. Catch  ${pokemon?.name}`}
              {success && `Catched ${pokemon?.name}`}
            </button>

            {success !== null && success == true && !loading
              ? "Congrats! You catch this Pokemon"
              : ""}

            {success !== null && success == false && !loading
              ? "Oh no .. You failed to catch this Pokemon"
              : ""}
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
      {/* Modal */}
    </>
  );
};

export default CatchPokemon;
