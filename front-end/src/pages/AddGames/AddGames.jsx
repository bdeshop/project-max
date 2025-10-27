import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddGames() {
  const [submenus, setSubmenus] = useState([]);
  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [providers, setProviders] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    fetchSubmenus();
    fetchProviders();
  }, []);

  useEffect(() => {
    if (selectedSubmenu) {
      fetchSavedGames();
    }
  }, [selectedSubmenu, page]);

  const fetchProviders = async () => {
    try {
      const response = await axios.get(
        "https://apigames.oracleapi.net/api/providers",
        {
          headers: {
            "x-api-key":
              "300cc0adfcfb041c25c4a8234e3c0e312a44c7570677d64bdb983412f045da67",
          },
        }
      );
      setProviders(response.data.data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const fetchSubmenus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/games/get-submenus`
      );
      setSubmenus(response.data.submenus);
    } catch (error) {
      console.error("Error fetching submenus:", error);
    }
  };

  const fetchSavedGames = async () => {
    if (!selectedSubmenu) return;

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/games/get-games?subMenuId=${selectedSubmenu}&page=${page}&limit=10`
      );
      setSavedGames(response.data.games);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching saved games:", error);
    }
  };

  const fetchGamesFromProvider = async (providerId) => {
    setLoading(true);
    try {
      // First get saved games to check which ones are already saved
      const savedResponse = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/games/get-games?subMenuId=${selectedSubmenu}&limit=1000`
      );
      const savedGamesMap = savedResponse.data.games.reduce((acc, game) => {
        acc[game.game_uuid] = game;
        return acc;
      }, {});

      // Then fetch games from the API
      const response = await axios.get(
        `https://apigames.oracleapi.net/api/games/pagination?page=1&limit=50&provider=${providerId}`,
        {
          headers: {
            "x-api-key":
              "300cc0adfcfb041c25c4a8234e3c0e312a44c7570677d64bdb983412f045da67",
          },
        }
      );

      // Merge API data with saved game data
      const mergedGames = (response.data.data || []).map((game) => {
        const savedGame = savedGamesMap[game.game_uuid];
        if (savedGame) {
          return {
            ...game,
            savedImage: savedGame.image,
            isSaved: true,
            isHomeShow: savedGame.isHomeShow,
            _savedId: savedGame._id,
          };
        }
        return { ...game, isSaved: false };
      });

      setGames(mergedGames);
    } catch (error) {
      console.error("Error fetching games:", error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmenuChange = async (e) => {
    const submenuId = e.target.value;
    setSelectedSubmenu(submenuId);
    setPage(1); // Reset to first page when changing submenu

    const selectedSubmenuData = submenus.find((s) => s._id === submenuId);
    if (selectedSubmenuData) {
      await fetchGamesFromProvider(selectedSubmenuData.providerId);
    }
  };

  const handleSaveGame = async (game, customImage = null) => {
    try {
      const formData = new FormData();
      formData.append("game_uuid", game._id);
      formData.append("providerName", game.provider.name);
      formData.append("gameName", game.name);
      formData.append("gameApiImage", game.image);
      formData.append("subMenuId", selectedSubmenu);
      formData.append("isHomeShow", "false");

      if (customImage) {
        formData.append("image", customImage);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/games/add-game`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the games list immediately with the new data
      setGames(
        games.map((g) => {
          if (g._id === game._id) {
            return {
              ...g,
              isSaved: true,
              savedImage: response.data.game.image,
              _savedId: response.data.game._id,
              isHomeShow: false,
            };
          }
          return g;
        })
      );

      await fetchSavedGames(); // Update saved games list
      alert("Game saved successfully!");
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Error saving game");
    }
  };

  const handleUpdateGame = async (gameId, isHomeShow, customImage = null) => {
    try {
      const formData = new FormData();
      formData.append("isHomeShow", isHomeShow.toString());
      if (customImage) {
        formData.append("image", customImage);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/games/update-game/${gameId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update both games and savedGames lists immediately
      const updatedGame = response.data.game;

      setSavedGames(
        savedGames.map((game) =>
          game._id === gameId ? { ...game, ...updatedGame } : game
        )
      );

      setGames(
        games.map((game) => {
          if (game.isSaved && game._savedId === gameId) {
            return {
              ...game,
              savedImage: updatedGame.image,
              isHomeShow: updatedGame.isHomeShow,
            };
          }
          return game;
        })
      );

      alert("Game updated successfully!");
    } catch (error) {
      console.error("Error updating game:", error);
      alert("Error updating game");
    }
  };

  const handleDeleteGame = async (gameId) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/games/delete-game/${gameId}`
        );

        // Update both games and savedGames lists immediately
        setSavedGames(savedGames.filter((game) => game._id !== gameId));

        setGames(
          games.map((game) => {
            if (game.isSaved && game._savedId === gameId) {
              return {
                ...game,
                isSaved: false,
                savedImage: null,
                _savedId: null,
                isHomeShow: false,
              };
            }
            return game;
          })
        );

        alert("Game deleted successfully!");
      } catch (error) {
        console.error("Error deleting game:", error);
        alert("Error deleting game");
      }
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Games</h2>

      {/* Submenu Selection */}
      <div className="mb-6">
        <label className="block mb-2">Select Sub Category:</label>
        <select
          value={selectedSubmenu}
          onChange={handleSubmenuChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Sub Category</option>
          {submenus.map((submenu) => {
            const provider = providers.find(
              (p) => p._id === submenu.providerId
            );
            return (
              <option key={submenu._id} value={submenu._id}>
                {submenu.menuName} ({provider?.name || "Unknown Provider"})
              </option>
            );
          })}
        </select>
      </div>

      {/* Available Games List */}
      {loading ? (
        <div>Loading games...</div>
      ) : (
        <>
          <h3 className="text-xl font-bold mb-4">Available Games</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {games.map((game) => (
              <div key={game._id} className="border rounded-lg p-4 shadow-sm">
                <img
                  src={
                    game.isSaved && game.savedImage
                      ? game.savedImage.startsWith("http")
                        ? game.savedImage
                        : `${import.meta.env.VITE_API_URL}/uploads/${
                            game.savedImage
                          }`
                      : game.image
                  }
                  alt={game.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="font-bold">{game.name}</h4>
                <div className="mt-2">
                  {game.isSaved ? (
                    <div className="text-center">
                      <span className="text-green-500 font-semibold">
                        ✓ Already Saved
                      </span>
                      {game.isHomeShow && (
                        <span className="block text-blue-500 text-sm mt-1">
                          (Showing on Home)
                        </span>
                      )}
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleSaveGame(game, e.target.files[0])
                        }
                        className="w-full p-1 border rounded mb-2"
                      />
                      <button
                        onClick={() => handleSaveGame(game)}
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                      >
                        Save Game
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Saved Games List */}
          <h3 className="text-xl font-bold mb-4">Saved Games</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {savedGames.map((game) => (
              <div key={game._id} className="border rounded-lg p-4 shadow-sm">
                <img
                  src={
                    game.image.startsWith("http")
                      ? game.image
                      : `${import.meta.env.VITE_API_URL}/uploads/${game.image}`
                  }
                  alt={game.gameName}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="font-bold">{game.gameName}</h4>
                <p className="text-sm text-gray-600">{game.providerName}</p>

                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={game.isHomeShow}
                      onChange={(e) =>
                        handleUpdateGame(game._id, e.target.checked)
                      }
                      className="mr-2"
                    />
                    <label>Show on Home</label>
                  </div>

                  <input
                    type="file"
                    onChange={(e) =>
                      handleUpdateGame(
                        game._id,
                        game.isHomeShow,
                        e.target.files[0]
                      )
                    }
                    className="w-full p-1 border rounded"
                  />

                  <button
                    onClick={() => handleDeleteGame(game._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  fetchSavedGames();
                }}
                className={`px-3 py-1 rounded ${
                  page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
