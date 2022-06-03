import axios from 'axios';
import {
  environment
} from "../environment";

class SearchService{

  static getProductsByProductName = (id) =>{
    return axios.get(environment.production.apiEndpoint + '/getProductsByProductName?name='+id);
  }

  static allAlbumType = () =>{
    return axios.get(environment.production.apiEndpoint + '/allAlbumType');
  }

}
 
export default SearchService 