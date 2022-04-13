import ButtonCustom from '../module/buttonCustom'
// import Button from '@mui/material/Button'

const Login = ({loginEndPoint}) => (
  <>
    <img
      src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
      alt="logo-spotify"
      className="logo-spotify"
    />
    <ButtonCustom name={'LOG IN'} onClick={loginEndPoint}/>
  </>
);

export default Login;
