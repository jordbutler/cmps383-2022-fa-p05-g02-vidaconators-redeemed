import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
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
        axios.get('api/listings?').then((response) => {
            setActiveResponse(response?.data);
        });
        axios.get('api/listings?').then((response) => {
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
      {activeListing.map(x =>
        <Card key={x.id}>        
          <CardContent>
            <Typography variant="h5" component="div">
            {x.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Buy</Button>
          </CardActions>
        </Card>
      )}


    </Box>

            
           
           
            
            


        </div>

    )

}