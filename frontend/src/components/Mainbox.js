import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import HomepageService from "../services/homepage.service";
import StorageService from "../services/storage.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'


// displays a page header

export default function Mainbox() {
  const [activities, setActivities] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimated, setAnimate] = useState(false);
  const [isError, setIsError] = useState(false);
  const fetchActivitiesData = () => {
    HomepageService.mainActivities()
      .then((response) => {
        setIsLoading(false);
        if (response.data !== null) setActivities(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  const fetchAlbumsData = () => {
    HomepageService.mainAlbums()
      .then((response) => {
        setIsLoading(false);
        if (response.data !== null) setAlbums(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchActivitiesData();
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
  else if(activities===[]){
    return <div></div>;
  }
  return (
    <div>
    <div className="h3 mx-5 mt-5 font-weight-bold">最新音樂</div>
    <div  id="adCarousel">
    <Carousel >
    {activities.map((object, i) => <div><img src={StorageService.getBlobStorage() + object.PhotoPath} class="d-block w-100"/></div>)}
    </Carousel>
    </div>

    <div className="albumPanel">
    { albums.map((object, i) =>
    
    <Link to={"/album/"+object.AlbumID}><a className={isAnimated ? "albumBlock animation" : "albumBlock"} href="" data-album={object.AlbumID} title={object.AlbumName}>
                <img src={StorageService.getBlobStorage() + object.CoverPath} class="albumCover" />
                <div className="albumContent">
                    <span className="albumTitle">{object.AlbumName}</span>
                    <span className="albumDescripion">{object.Maker}</span>
                    <span className="albumDescripion">{object.Kinds}</span>
                </div>
    </a></Link>
            
      )}
    </div>

    </div>
  );
}
