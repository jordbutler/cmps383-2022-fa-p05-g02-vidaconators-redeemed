import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
//import PS5 from './PS5.jpg';
//import PS from './PS.png';
//import Xbox from './Xbox.jpg';
//import Steam from './Steam.jpg';

export function ListingScreen() {

    

  const path = "api/listings?search=";
  //const photos = [{PS5}, {PS}, {Xbox}];
    
  const [activeResponse, setActiveResponse] = useState(null);  
  const [searchResponse] = useState(null);

  const onSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    const url = path + search;
    

    axios.get(url).then((response) => {
        setActiveResponse(response?.data);
    });

    console.log(activeResponse);

    

};


    useEffect(() => {
        axios.get('api/listings?').then((response) => {
            setActiveResponse(response?.data);
        });
      }, []);

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
       <TextField
            type="text"
            className="form-control"
            name="Search"
            align = "right"
            value={searchResponse}
            onChange={onSearch}
          />

      <br></br>

      {!activeResponse ? "is null": activeResponse.map(x =>
        <Card sx={{ minWidth: 350, height: 500 }} key={x.id}>
          
          <CardMedia
        
        
        
      />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {x.name}
            </Typography>
            <Typography>
              {x.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {x.itemsForSale.map(x => <li key={x.id}>{x.productName}</li>)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button style= {{align: "center"}}>Buy</Button>
          </CardActions>
        </Card>)}

        

        
       

        
        

      
    

    </Box>

            
           
           
            
            


        </div>

    )

}