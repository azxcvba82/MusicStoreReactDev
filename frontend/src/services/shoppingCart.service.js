import axios from 'axios';
import {
  environment
} from "../environment";

class ShoppingCartService{

  static getProductsByProductName = () =>{
    return axios.get(environment.production.apiEndpoint + '/api/getShoppingCartByAccount');
  }

}
 
export default ShoppingCartService 