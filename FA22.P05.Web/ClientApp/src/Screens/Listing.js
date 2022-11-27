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

    

    
    const [activeResponse, setActiveResponse] = useState(null);
   

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
      
      
      {!activeResponse ? "is null" : <Box style = {{width: 500,
          height: 500,
          backgroundColor: 'red'}}>{activeResponse.map(x => 
      <Card key={x.id} style= {{maxWidth: 345, flex: 1, boxShadow: 3 }}>
        <CardContent>
          <Typography  gutterBottom variant="h5" component="div">{x.name}</Typography>
          <Typography>{x.price}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Buy</Button>
        </CardActions>
      </Card>
      )}</Box>}


      



      
    

    </Box>

            
           
           
            
            


        </div>

    )

}