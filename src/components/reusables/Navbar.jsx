import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { ImSearch } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import NavbarButtons from "./NavbarButtons";

function Navbar({ user }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [games, setGames] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/games");
        const gamesData = await res.json();
        setGames(gamesData);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    const fetchSuggestions = () => {
      if (query.length > 1) {
        const filtered = games.filter((game) =>
          game.title.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, games]);

  const handleSelect = (game) => {
    navigate(`/product/${game.id}`, {
      state: {
        id: game.id,
        title: game.title,
        image: game.thumbnail,
        description: game.short_description,
        rating: Math.floor(Math.random() * 3) + 3.5,
      },
    });
    setQuery("");
    setSuggestions([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return;

    const matchedGame = games.find((game) =>
      game.title.toLowerCase().includes(trimmedQuery)
    );

    if (matchedGame) {
      navigate(`/product/${matchedGame.id}`, {
        state: {
          id: matchedGame.id,
          title: matchedGame.title,
          image: matchedGame.thumbnail,
          description: matchedGame.short_description,
          rating: Math.floor(Math.random() * 3) + 3.5,
        },
      });
      setQuery("");
      setSuggestions([]);
    } else {
      alert("No matching game found.");
    }
  };

  return (
    <div className="relative w-full bg-gray-800 shadow-md">
      <div className="flex items-center justify-between md:px-6 py-4 h-16 sm:py-4 h-16">
        <Link to="/">
          <img src={logo} className="size-[80px] md:size-[100px] sm:size-[40px] mt-6 mr-4" />
        </Link>

        <form
          className="relative flex items-center md:ml-4 py-1 space-x-0 sm:py-1 mr-4"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 bg-gray-900 md:px-3 py-2 text-white border border-white opacity-40 rounded-md focus:outline-none placeholder-white placeholder-opacity-70 sm:w-[300px] md:w-[400px] lg:w-[500px]"
            placeholder="Search Games..."
          />

          <button
            type="submit"
            className="h-9 w-9 flex items-center justify-center border border-white rounded-md hover:bg-black opacity-50 transition"
          >
            <ImSearch className="h-5 w-5 text-white" />
          </button>

          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 bg-white bg-opacity-90 text-black rounded-md shadow-lg w-[500px] max-w-full max-h-[200px] overflow-y-auto z-50">
              {suggestions.map((game) => (
                <div
                  key={game.id}
                  onClick={() => handleSelect(game)}
                  className="p-2 hover:bg-gray-400 cursor-pointer text-sm"
                >
                  {game.title}
                </div>
              ))}
            </div>
          )}
        </form>

        <div className="hidden md:flex">
          <NavbarButtons user={user} />
        </div>

        <div className="md:hidden mt-2">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-white"
          >
            {showMenu ? <HiX size={32} /> : <HiMenu size={44} />}
          </button>
        </div>
      </div>

      <div
        className={`absolute top-16 left-0 w-full bg-gray-800 z-40 md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          showMenu ? "max-h-[500px] py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <NavbarButtons user={user} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
