import React, { useState, useEffect } from 'react';
import LoginService from "../services/login.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

// displays a page header

export default function Verify({ token }) {
  const [result, setResult] = useState({});
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
  else if(result==={}){
    return <div></div>;
  }
  return (
<div>{result}</div>
  );
}
