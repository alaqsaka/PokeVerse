const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-3xl" href="/">
          PokeVerse
        </a>
      </div>
      <div className="navbar-end">
        <a className="btn bg-slate-100">For You Page</a>
      </div>
    </div>
  );
};

export default Navbar;
