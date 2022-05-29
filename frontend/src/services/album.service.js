import axios from 'axios';
import {
  environment
} from "../environment";

class AlbumService{

  static getAlbumById = (id) =>{
    return axios.get(environment.production.apiEndpoint + '/getAlbumById?id='+id);
  }

}
 
export default AlbumService 