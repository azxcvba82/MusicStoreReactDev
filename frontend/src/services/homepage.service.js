import axios from 'axios';
import {
  environment
} from "../environment";

class HomepageService{

  static mainActivities = () =>{
    return axios.get(environment.production.apiEndpoint + '/mainActivities');
  }

  static mainAlbums = () =>{
    return axios.get(environment.production.apiEndpoint + '/mainAlbums');
  }

}
 
export default HomepageService 