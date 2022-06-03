import React, { useState, useEffect } from 'react';
import {
  useParams,
  Link
} from "react-router-dom";
import AlbumService from "../services/album.service";
import StorageService from "../services/storage.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

// displays a page header

export default function KindResult() {
  let { id } = useParams();
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAnimated, setAnimate] = useState(false);
  const fetchAlbumsData = () => {
    AlbumService.getAlbumsByKindId(id)
      .then((response) => {
        setIsLoading(false);
        setAlbums(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAlbumsData();
  }, []);
  setTimeout(function () {
    setAnimate(true)
}, 200)
  if (isLoading) {
    return <div class="loading">
    <FontAwesomeIcon icon={faCircleNotch}></FontAwesomeIcon>
  <span class="sr-only">Loading...</span>
</div>;
  }
  else if(albums===[]){
    return <div></div>;
  }
  return (
    <div class="albumPanel">
          { albums.map((object, i) =>
    
    <Link to={"/album/"+object.AlbumID}><a className={isAnimated ? "albumBlock animation" : "albumBlock"} href="" data-album={object.AlbumID} title={object.AlbumName}>
                <img src={StorageService.getBlobStorage() + object.CoverPath} class="albumCover" />
                <div className="albumContent">
                    <span className="albumTitle">{object.AlbumName}</span>
                    <span className="albumDescripion">{object.Maker}</span>
                </div>
    </a></Link>
            
      )}
      </div>

  );
}
