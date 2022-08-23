import axios from 'axios';
import {
  environment
} from "../environment";

// displays a page header
class LoginService {
  static login(account, password) {
    return axios.post(environment.production.apiEndpoint +'/login',{
      account,
      password
   })
  }
  static signup(account, password, email) {
    return axios.post(environment.production.apiEndpoint +'/signup',{
      account,
      password,
      email
   })
  }
  static getSSOConfig() {
    return axios.get(environment.production.apiEndpoint +'/getSSOConfig')
  }
  static ssoLogin(stateBase64, idTokenBase64) {
    return axios.post(environment.production.apiEndpoint +'/ssoLogin',{stateBase64, idTokenBase64})
  }
}
 
export default LoginService 