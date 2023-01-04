import React, { useState, useEffect } from 'react';
import LoginService from "../services/login.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

// displays a page header

export default function Verify({ token }) {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAnimated, setAnimate] = useState(false);

  const verifyToken = () => {
    LoginService.verify(token)
      .then((response) => {
        setIsLoading(false);
        setResult(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setResult(error.response?.data);
        console.log(error);
      });
  };
  useEffect(() => {
    verifyToken();
  }, []);

  setTimeout(function () {
    setAnimate(true)
}, 200);

  if (isLoading) {
    return <div class="loading">
    <FontAwesomeIcon icon={faCircleNotch}></FontAwesomeIcon>
  <span class="sr-only">Loading...</span>
</div>;
  }
  else if(isError === true){
    return <div>
            <h3>
              verify error: {result}<br/>
              <Link to="/"><a href="">click to home</a></Link>
            </h3>
          </div>
  } else
  return (
<div><h3>
  verify success<br/>
<Link to="/"><a href="">click to home</a></Link>
</h3></div>
  );
}
