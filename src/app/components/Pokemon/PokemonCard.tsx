"use client";
import Image from "next/image";

interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  let urlString = url;
  urlString = urlString.slice(0, -1);
  urlString = urlString.substring(34);
  return (
    <div className="card w-auto bg-base-100 shadow-xl group cursor-pointer h-full">
      <div
        className="
        flex flex-col gap-2 w-full h-full
    "
      >
        <figure className="bg-slate-100 h-full p-4">
          <Image
            width={200}
            // fill
            height={200}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${urlString}.svg`}
            alt="Pokemon"
            className="object-contain h-auto min-w-200 min-h-200 max-h-200"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
