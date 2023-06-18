"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-3xl" href="/">
          PokeVerse
        </a>
      </div>
      <div className="navbar-end">
        <Link href="/my-pokemon" className="btn">
          My Pokemons
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
