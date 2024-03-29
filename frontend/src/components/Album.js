import React, { useState, useEffect } from 'react';
import {
  useParams
} from "react-router-dom";
import {
  Notfound
} from ".";
import AlbumService from "../services/album.service";
import StorageService from "../services/storage.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown,faPlus,faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function Album({result}) {
  let { id } = useParams();
  const [album, setAlbum] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const postPlayListData = (id) => {
    AlbumService.addPlayLists(id)
      .then((response) => {
        result();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAlbumData();
    fetchProductData();
  }, []);

  const handleAddThisSongToPlayList = (amid) => {
    postPlayListData(amid);
  };

  if (isLoading) {
    return <div class="loading">
    <FontAwesomeIcon icon={faCircleNotch}></FontAwesomeIcon>
  <span class="sr-only">Loading...</span>
</div>;
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
    <div class="albumCover"><img src={StorageService.getBlobStorage()+album.CoverPath} /></div>
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
                專輯售價：${album.ALPrice}
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
                <i class="addThisSongToCart fas"><FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon></i>
                <span><i class="addThisSongToPlayList fa" onClick={(e) =>handleAddThisSongToPlayList(object.ProductID)}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></i></span>
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
