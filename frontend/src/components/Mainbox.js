import React, { useState, useEffect } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {
  Album
} from ".";

// displays a page header

export default function Mainbox() {
  const [activities, setActivities] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimated, setAnimate] = useState(false);
  const [isError, setIsError] = useState(false);
  const fetchActivitiesData = () => {
    axios.get('https://api.azxcvba99.net/mainActivities')
      .then((response) => {
        setIsLoading(false);
        setActivities(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  const fetchAlbumsData = () => {
    axios.get('https://api.azxcvba99.net/mainAlbums')
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
    fetchActivitiesData();
    fetchAlbumsData();
  }, []);

  setTimeout(function () {
    setAnimate(true)
}, 200)

  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if(activities===[]){
    return <div></div>;
  }
  return (
    <div>
    <div className="h3 mx-5 mt-5 font-weight-bold">最新音樂</div>
    <div  id="adCarousel">
    <Carousel >
    {activities.map((object, i) => <div><img src={"https://staticdatahenry.blob.core.windows.net/images/"+object.PhotoPath} class="d-block w-100"/></div>)}
    </Carousel>
    </div>

    <div className="albumPanel">
    { albums.map((object, i) =>
    
    <Link to={"/album?amid="+object.AlbumID}><a className={isAnimated ? "albumBlock animation" : "albumBlock"} href="" data-album={object.AlbumID} title={object.AlbumName}>
                <img src={"https://staticdatahenry.blob.core.windows.net/images/"+object.CoverPath} class="albumCover" />
                <div className="albumContent">
                    <span className="albumTitle">{object.AlbumName}</span>
                    <span className="albumDescripion">{object.Maker}</span>
                    <span className="albumDescripion">{object.Kinds}</span>
                </div>
    </a></Link>
            
      )}
    </div>
    <Switch>

        <Route path="/:id">
        <Album />
        </Route>
    </Switch>
    </div>
  );
}
