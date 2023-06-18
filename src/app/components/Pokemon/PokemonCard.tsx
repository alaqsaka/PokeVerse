"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PokemonCardProps {
  name: string;
  url: string | number;
  onAction?: (id: string) => void;
  actionLabel?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  url,
  onAction,
  actionLabel,
}) => {
  let urlString = url;
  if (typeof url === "string") {
    urlString = urlString.slice(0, -1);
    urlString = urlString.substring(34);
  }

  const router = useRouter();
  return (
    <div className="card w-auto bg-base-100 shadow-xl group cursor-pointer h-full">
      <div
        className="
        flex flex-col gap-2 w-full h-full
    "
        onClick={() => router.push(`/pokemon/${urlString}`)}
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
      {onAction && actionLabel && (
        <div>
          <button onClick={onAction} className="btn btn-primary w-full">
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
