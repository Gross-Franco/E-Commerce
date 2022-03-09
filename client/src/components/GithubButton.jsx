import React from "react";
import { BsGithub } from "react-icons/bs";


const GithubButton = () => {
  
  return (
    <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user`}
        className="login--github-btn"
    >
      <BsGithub size={30} className="login--github-btn--icon"/>
    </a>
  );
};

export default GithubButton;
