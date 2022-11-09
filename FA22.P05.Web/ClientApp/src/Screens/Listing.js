import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';


export function ListingScreen() {

    

    const [listingResponse, setListingResponse] = useState(null);
    const [activeResponse, setActiveResponse] = useState(null);
    const [listing, setListing] = useState(null);
    const [listings, setListings] = useState(null);
    const [newbaby, setnewbaby] = useState(null);
    const [oldbaby, setoldbaby] = useState(null);

    useEffect(() => {
        axios.get('/api/listings/1').then((response) => {
            setActiveResponse(response?.data);
        });
        axios.get('/api/listings/1/items').then((response) => {
          setListingResponse(response?.data);
        });

        axios.get('/api/listings/2').then((response) => {
          setListing(response?.data);
      });
      axios.get('/api/listings/2/items').then((response) => {
        setListings(response?.data);
      });

      axios.get('/api/listings/3').then((response) => {
        setnewbaby(response?.data);
    });
    axios.get('/api/listings/3/items').then((response) => {
      setoldbaby(response?.data);
    });
      }, []);

      console.log(listingResponse);
      console.log(activeResponse);


    return(

        <div>

            <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 256,
          height: 256,
        },
      }}
    >
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
        {!activeResponse ? "is null" : <ul>{activeResponse.name}</ul>}
        </Typography>
        <Typography variant="body2">
        {!listingResponse ? "is null" : <ul>{listingResponse.map(x => <li key={x.id}>{x.productName}</li>)}</ul>}
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
        {!listing ? "is null" : <ul>{listing.name}</ul>}
        </Typography>
        <Typography variant="body2">
        {!listings ? "is null" : <ul>{listings.map(x => <li key={x.id}>{x.productName}</li>)}</ul>}
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
        {!newbaby ? "is null" : <ul>{newbaby.name}</ul>}
        </Typography>
        <Typography variant="body2">
        {!oldbaby ? "is null" : <ul>{oldbaby.map(x => <li key={x.id}>{x.productName}</li>)}</ul>}
        </Typography>
      </CardContent>
    </Card>

    </Box>

            
           
           
            
            


        </div>

    )

}