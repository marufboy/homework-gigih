const Login = ({loginEndPoint}) => (
  <>
    <img
      src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
      alt="logo-spotify"
      className="logo-spotify"
    />
    {/* <a href={loginEndPoint}>
      <div className="login-btn">LOG IN</div>
    </a> */}
    <button className="login-btn" onClick={loginEndPoint}>LOG IN</button>
  </>
);

export default Login;
