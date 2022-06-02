import React, { useState, useEffect } from 'react';
import {
  useParams
} from "react-router-dom";
import {
  Notfound
} from ".";
import {
  environment
} from "../environment";
import AlbumService from "../services/album.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown,faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Album() {
  let { id } = useParams();
  const [album, setAlbum] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const fetchAlbumData = () => {
    AlbumService.getAlbumById(id)
      .then((response) => {
        setIsLoading(false);
        setAlbum(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  const fetchProductData = () => {
    AlbumService.getProductsByAlbumId(id)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAlbumData();
    fetchProductData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if(isError===true){
    return <Notfound />;
  }
  else if(album==={}){
    return <div></div>;
  }
  return (
<div>
<div class="albumset">
    <div class="albumCover"><img src={environment.production.blobStorage+album.CoverPath} /></div>
    <h3 class="albumtext"><b>{album.AlbumName}</b></h3>

    {/* 新增:如有折扣顯示紅字折扣價03/07/2020 */}
    <div class="textBox">
        {album.Discount != 1 &&
            <div class="mb-4">
                專輯售價：
                <del>${album.ALPrice} </del>
                <span class="discount"> ${album.ALPrice * album.Discount} Now!</span>
                <i data-albumid={album.AlbumID} class="fas fa-cart-arrow-down addThisAlbumToCart fa-2x"></i>
            </div>
        }
        {album.Discount == 1 &&
            <div class="mb-4">
                專輯售價：${album.fALPrice}
                <i data-albumid={album.AlbumID} class="fas fa-cart-arrow-down addThisAlbumToCart  fa-2x"></i>
            </div>
        }
        {album.Maker != null &&
            <div>
                <div>— 社團 —</div>
                <div class="mb-4"><b>{album.Maker}</b></div>
            </div>
        }
        <div>— 分類 —</div>
        <div class="mb-4">{}</div>
        <div>— 音樂風格 —</div>
        <div>{album.Kinds}</div>

        <div class="mt-4">
            <small class="font-weight-bolder">上傳者: {album.Account}</small>
        </div>
    </div>

</div>
<div class="musicsPanel">
{ products.map((object, i) =>
    

<div class="container">
            <div style={{display:"inlineBlock"}} class="vbtn dplay">
            </div>
            <h4 style={{display:"inlineBlock"}} class="fold-title">
                <span>{i+1}.</span>
                <span class="foldText">{object.ProductName}</span>
                <i class="addThisSongToCart"><FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon></i>
                <span><i class="addThisSongToPlayList"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></i></span>
            </h4>
            <div class="fold">
                <div class="fold-container">
                    <span style={{color:"white"}}>演唱:{object.Singer}</span>
                    <span style={{color:"white"}}>  /  作曲:{object.Composer}</span>
                    {album.Discount != null &&
                        <span>
                            /  單曲售價:
                            <del>${object.SIPrice}</del>
                            <span class="discount">${object.SIPrice * album.Discount}</span>
                        </span>
                    }
                    {album.Discount === null &&
                        <span>  /  單曲售價:${object.SIPrice}</span>
                    }
                </div>
            </div>
</div>

            
      )}
</div>
</div>
  );
}
