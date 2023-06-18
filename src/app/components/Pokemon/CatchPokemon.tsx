"use client";

import Image from "next/image";
import { useState } from "react";
import Loader from "../Loader";

interface CatchPokemonProps {
  pokemon?: Pokemon;
  img: string;
}

interface Pokemon {
  name: string;
  url: string;
}

const CatchPokemon: React.FC<CatchPokemonProps> = ({ pokemon, img }) => {
  const [success, setSuccess] = useState(null);
  const [loading, setloading] = useState(false);
  const [showModal, setshowModal] = useState(true);

  console.log(success);
  // Check if pokemon already exist in localStorage

  function catchPokemon() {
    const randomNumber = Math.random();
    const isSuccess = randomNumber > 0.5 ? true : false;
    setloading(true);
    setTimeout(() => {
      console.log("loading ..");
      setSuccess(isSuccess);
      setloading(false);
    }, 3000);
  }

  return (
    <>
      {/* Modal */}
      {/* Open the modal using ID.showModal() method */}
      <button
        className="btn btn-primary w-full"
        onClick={() => window.my_modal_1.showModal()}
      >
        Start Catching!
      </button>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <div className="mt-10 flex flex-col items-center gap-5">
            <h1 className="text-3xl font-bold">Catch {pokemon?.name}</h1>

            {loading ? (
              <Loader />
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
