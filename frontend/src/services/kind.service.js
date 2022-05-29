import axios from 'axios';
import {
  environment
} from "../environment";

class KindService{

  static allkind = () =>{
    return axios.get(environment.production.apiEndpoint + '/allkind');
  }

}
 
export default KindService 