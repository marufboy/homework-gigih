import { useEffect, useState } from 'react';
import './App.css';
import { Credential } from './Credential'

const spotify = Credential();
const loginEndPoint = `${spotify.AuthEndPoint}client_id=${spotify.ClientId}&redirect_uri=${spotify.RedirectUrl}&scope=${spotify.Scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;



function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokens = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    // check token & hash
    if(!token && hash){
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      console.log(_token);
    }else{
      console.log(tokens);
      setToken(tokens);
    }
  }, [])
  return (
    <div className="App">
        <div className="login-page">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="logo-spotify"
            className="logo"
          />
          <a href={loginEndPoint}>
            <div className="login-btn">LOG IN</div>
          </a>
      </div>
    </div>
  );
}

export default App;
