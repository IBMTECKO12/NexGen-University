import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../features/authSlice';

export default function GoogleAuth() {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        dispatch(googleLogin(credentialResponse.credential));
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
    />
  );
}