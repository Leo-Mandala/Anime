import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!password || !user) {
      setMessage("Veuillez remplir tous les champs");
      return;
    }

    const hashedPassword = CryptoJS.MD5(password).toString();

    fetch("https://api.betaseries.com/members/auth", {
      method: "POST",
      headers: {
        "X-BetaSeries-Key": "4828f680f398",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: user,
        password: hashedPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {

          localStorage.setItem("token", data.token);
          setMessage("Vous êtes connecté");


          setTimeout(() => {
            window.location.href = "/Display"; 
          }, 1000);
        } else {
          setMessage("Identifiant ou mot de passe incorrect");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {

      window.location.href = "/Display"; 
    }
  }, []);

  return (
    <div>
      <h1>Connectez vous avec vos identifiant betaseries</h1>
      <input
        type="text"
        placeholder="Identifiant"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
