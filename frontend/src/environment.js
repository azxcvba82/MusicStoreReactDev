// displays a page header

export const environment =  {
  production : {
    apiEndpoint: process.env.REACT_APP_API_ENDPOINT,
        //apiEndpoint: "http://localhost:80",
    blobStorage:  "https://staticdatahenry.blob.core.windows.net/images/"
  },
  develop : {
    apiEndpoint: process.env.REACT_APP_API_ENDPOINT,
    blobStorage:  "https://staticdatahenry.blob.core.windows.net/images/"
  }
};