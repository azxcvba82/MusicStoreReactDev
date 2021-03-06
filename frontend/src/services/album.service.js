import axios from 'axios';
import {
  environment
} from "../environment";

class AlbumService{

  static getAlbumById = (id) =>{
    return axios.get(environment.production.apiEndpoint + '/getAlbumById?id='+id);
  }

  static getProductsByAlbumId = (id) =>{
    return axios.get(environment.production.apiEndpoint + '/getProductsByAlbumId?albumId='+id);
  }

  static getAlbumsByKindId = (id) =>{
    return axios.get(environment.production.apiEndpoint + '/getAlbumsByKindId?kindId='+id);
  }

  static getPlayListByAccount = () =>{
    return axios.get(environment.production.apiEndpoint + '/api/getPlayListByAccount');
  }

  static addPlayLists = (id) =>{
    return axios.get(environment.production.apiEndpoint + '/api/addPlayLists?productId='+id);
  }

  static deletePlayLists = (id) =>{
    return axios.get(environment.production.apiEndpoint + '/api/deletePlayLists?productId='+id);
  }

}
 
export default AlbumService 