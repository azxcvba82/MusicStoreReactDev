import React, { useState, useEffect } from 'react';
import {
  environment
} from "../environment";
import KindService from "../services/kind.service";
// displays a page header

export default function Kind() {
  const [kinds, setKind] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimated, setAnimate] = useState(false);
  const [isError, setIsError] = useState(false);
  const fetchKindData = () => {
    KindService.allkind()
      .then((response) => {
        setIsLoading(false);
        setKind(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchKindData();
  }, []);

  setTimeout(function () {
    setAnimate(true)
}, 200)

  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if(kinds===[]){
    return <div></div>;
  }
  return (
    
    <div className="kindPage">
    { kinds.map((object, i) =>
    
    <a class="outline">
    <div class="kindBlock" data-kind={object.KindID} data-color={object.Color} >
        <span class="kindName">{object.KindName}</span>

        <div class="photo" className={isAnimated ? "photo fadein" : "photo"} style={{backgroundImage:`url(${environment.production.blobStorage+object.PhotoPath})`}}></div>
    </div>
    </a>
            
      )}

    </div>
  );
}
