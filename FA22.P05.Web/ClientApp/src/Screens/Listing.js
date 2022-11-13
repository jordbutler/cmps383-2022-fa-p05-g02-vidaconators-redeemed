import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';


export function ListingScreen() {

    

    const [listingResponse, setListingResponse] = useState(null);
    const [activeResponse, setActiveResponse] = useState(null);
    const [activeListing, setActiveListing] = useState([{name:'hi', id:1}])


    useEffect(() => {
        axios.get('/api/listings').then((response) => {
            setActiveResponse(response?.data);
        });
        axios.get('api/listings?').then((response) => {
         setListingResponse(response?.data);
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