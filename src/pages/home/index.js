import { Credential } from "../../Credential";
import Login from "../../components/login";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/tokenSlice";
import { useEffect } from "react";
import { Switch, Route, Redirect, useHistory} from "react-router-dom";
import MyPlaylistPage from "../myPlaylistPage";

const spotify = Credential();
const loginEndPoint = `${spotify.AuthEndPoint}client_id=${
  spotify.ClientId
}&redirect_uri=${spotify.RedirectUrl}&scope=${spotify.Scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const Home = () => {
  const globToken = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  let history = useHistory();

  //get access token from login
  const handleLogin = () => {
    if (!globToken) {
      window.location.href = loginEndPoint;
      console.log("this is no token");
    }
  };

  const getAccessToken = (hash) => {
    const stringAfterHash = hash.substring(1);
    const paramsInUrl = stringAfterHash.split("&");
    return paramsInUrl.reduce((acc, curVal) => {
      const [key, value] = curVal.split("=");
      acc[key] = value;
      return acc;
    }, {});
  };

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getAccessToken(
        window.location.hash
      );
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      dispatch(setToken(access_token));

      history.push("/create-playlist");
      window.location.hash = "";
    }
  }, []);

  return (
    <div className="login-page">
      <Switch>
        <Route path={"/create-playlist"}>
          {globToken ? <MyPlaylistPage /> : <Redirect to={"/"} />}
        </Route>
        <Route exact path={'/'}>
          <Login loginEndPoint={handleLogin} />
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
