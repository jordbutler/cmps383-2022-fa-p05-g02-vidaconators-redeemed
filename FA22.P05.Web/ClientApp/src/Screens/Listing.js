import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function ListingScreen() {

    const [listingResponse, setListingResponse] = useState(null);
    const [activeResponse, setActiveResponse] = useState(null);

    useEffect(() => {
        axios.get('/api/listings/1').then((response) => {
            setActiveResponse(response?.data);
        });
        axios.get('/api/listings/1/items').then((response) => {
          setListingResponse(response?.data);
        });
      }, []);

      console.log(listingResponse);
      console.log(activeResponse);


    return(

        <div>

            {!activeResponse ? "is null" : <ul>{activeResponse.Name}</ul>}
            {!listingResponse ? "is null" : <ul>{listingResponse.map(x => <li key={x.id}>{x.productName}</li>)}</ul>}
           
           
            
            


        </div>

    )

}