import React from "react";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { googleSession } from "../Redux/Actions/actions";

const GoogleButton = () => {
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    let user = {
      first_name: response.profileObj?.givenName,
      last_name: response.profileObj?.familyName,
      email: response.profileObj?.email,
      username: response.profileObj?.name,
      id: response.profileObj?.googleId,
    }
    dispatch(googleSession(user));
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
      render={(renderProps) => (
        <button
          type="button"
          className="login--google-btn"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <FcGoogle className="login--google-btn--icon" />
        </button>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleButton;
