import React, { useState } from "react";
import LoginService from "../services/login.service";
// displays a page header

export default function Modal({
  action,
  result
}) {
  let display = "";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMes, setErrorMes] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  function validateLoginForm() {
    return account.length > 0 && password.length > 0;
  }
  function validateSignupForm() {
    return account.length > 0 && password.length > 0 && email.length > 3 && email.indexOf('@')> -1 && nickname.length > 0;
  }
  const handleLoginSubmit = e => {
    e.preventDefault();
    if(validateLoginForm()===true){
    postLoginData();
    }else{
      setIsError(true);
      setErrorMes("account or password not allow empty")
    }
  };

  const handleSignupSubmit = e => {
    e.preventDefault();
    if(validateSignupForm()===true){
    postSignupData();
    }else{
      setIsError(true);
      setErrorMes("account, password and nickname not allow empty. mail format error")
    }
  };

  const postLoginData = () => {
    LoginService.login(account,password)
     .then((response) => {
       setPassword("")
       setIsLoading(false);
       setIsError(false);
       setErrorMes("")
       localStorage.setItem("user",JSON.stringify({account: account,token: response.data.token,expiresAt: response.data.expiresAt}));
       result(account);
     })
     .catch((error) => {
       setPassword("")
       setIsLoading(false);
       setIsError(true);
       setErrorMes(error.response.data.message)
     });
  };

  const postSignupData = () => {
    LoginService.login(account,password,email)
      .then((response) => {
        setPassword("")
        setIsLoading(false);
        setIsError(false);
        setErrorMes("")
        localStorage.setItem("user",JSON.stringify({account: account,token: response.data.token}));
        result(account);
      })
      .catch((error) => {
        setPassword("")
        setIsLoading(false);
        setIsError(true);
        setErrorMes(error.response.data.message)
      });
  };
    if(action==="login"){
      display = (
        <form  method="post" id="LoginForm" >
          <div className="box">
              <div className="h2">????????????</div>
              <div className="col-xs-12">
                  <input type="text" name="txtAccount" placeholder="????????????" className="form-control" value={account} onChange={(e) => setAccount(e.target.value)}/>
              </div>
              <div class="form-input-password">
                  <input type="password" name="txtPassword" placeholder="??????" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="error">{errorMes}</div>
              <div className="loingBtn" type="submit" onClick={handleLoginSubmit}>??????</div>
          </div>
        </form>
    );
    }else if(action==="signup"){
      display =  (
        <form  method="post" id="LoginForm">
                <div  className="box" id="register">
                    <div className="h2">????????????</div>
                    <div className="col-xs-12">
                        <input type="text" name="fAccount" placeholder="??????" className="form-control" value={account} onChange={(e) => setAccount(e.target.value)}/>
                    </div>
                    <div className="form-input-password">
                        <input type="password" name="fPassword" placeholder="??????" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-input-password">
                        <input type="email" name="fEmail" placeholder="??????" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-input-password">
                        <input type="text" name="fNickName" placeholder="??????" className="form-control" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                    </div>
                    <div className="error">{errorMes}</div>
                    <div className="loingBtn" type="submit"onClick={handleSignupSubmit}>??????</div>
                </div>
        </form>
      )
    }else{
      
      display =  (<div></div>)
    }
    return  display;
}
