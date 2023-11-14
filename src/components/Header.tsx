import React from "react";

function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="bg-black h-16 w-full flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/Display" className="text-white font-bold text-2xl ml-4 hover:text-blue-300">
              [ ChaudTime ]
            </a>
          </div>
        </div>
        {localStorage.getItem("token") !== null ? (
        <div className="flex items-center">
          <div className="flex items-center">
            <a href="/Display" className="text-white font-bold text-2xl ml-4 hover:text-blue-300">
              Voir les animes
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="/List"
              className="text-white font-bold text-2xl ml-4 hover:text-blue-300"
            >
              Ma liste
            </a>
          </div>
          <div className="flex items-center">
            <a
            onClick={logout}
              className="text-white font-bold text-2xl ml-4 hover:text-blue-300 cursor-pointer"
            >
              Se déconnecter
            </a>
          </div>
        </div>
        ) : (
          <div className="flex items-center">
            <a
              href="/"
              className="text-white font-bold text-2xl ml-4 hover:text-blue-300"
            >
              Se connecter
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;