import React, { useState, useEffect } from 'react';
import {
  useParams,
  Link
} from "react-router-dom";
import {
  environment
} from "../environment";
import AlbumService from "../services/album.service";

// displays a page header

export default function KindResult() {
  let { id } = useParams();
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    return <div>Loading...</div>;
  }
  else if(albums===[]){
    return <div></div>;
  }
  return (
    <div class="albumPanel">
          { albums.map((object, i) =>
    
    <Link to={"/album/"+object.AlbumID}><a className={isAnimated ? "albumBlock animation" : "albumBlock"} href="" data-album={object.AlbumID} title={object.AlbumName}>
                <img src={environment.production.blobStorage + object.CoverPath} class="albumCover" />
                <div className="albumContent">
                    <span className="albumTitle">{object.AlbumName}</span>
                    <span className="albumDescripion">{object.Maker}</span>
                </div>
    </a></Link>
            
      )}
      </div>

  );
}
