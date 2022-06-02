import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SearchService from "../services/search.service";
import {
  environment
} from "../environment";

// displays a page header

export default function Search({ name }) {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimated, setAnimate] = useState(false);
  const [isError, setIsError] = useState(false);
  const fetchSearchData = () => {
    SearchService.getProductsByProductName(name)
      .then((response) => {
        setIsLoading(false);
        setIsError(false);
        setProduct(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  useEffect(() => {
    if(name !== ""){
    fetchSearchData();
    }
  }, [name]);

  setTimeout(function () {
    setAnimate(true)
}, 200)

  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if(name === "" || isError===true){
    return         <div class="noResult">
    <div class="h3">查無資料</div>
    <p>請確認關鍵字輸入是否正確，或試著減少字數搜尋</p>
</div>;
  }
  return (
    
<div >
<div class="h3 mx-5 mt-5 font-weight-bold searchTitle">所有音樂</div>
<div class="albumPanel">

{ products.map((object, i) =>
    
    <Link to={"/album/"+object.AlbumID}><a className={isAnimated ? "albumBlock animation" : "albumBlock"} href="" data-album={object.AlbumID} title={object.AlbumName}>
                <img src={environment.production.blobStorage + object.CoverPath} class="albumCover" />
                <div className="albumContent">
                    <span className="albumTitle">{object.ProductName}</span>
                    <span className="albumDescripion">{object.AlbumName}</span>
                {object.Singer !== null &&
                    <span className="albumDescripion">歌手: {object.Singer}</span>
                }
                {object.ActivityID !== 0 &&
                    <span className="discount">{1-object.Discount}% off!</span>
                }
                </div>
    </a></Link>
            
      )}
        
</div>


</div>

  );
}
