import {
  environment
} from "../environment";

class StorageService{

  static getBlobStorage = () =>{
    return environment.production.blobStorage;
  }

}
 
export default StorageService 