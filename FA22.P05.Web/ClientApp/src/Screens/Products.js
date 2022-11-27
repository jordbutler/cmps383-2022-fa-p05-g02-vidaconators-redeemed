import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
//import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';

export function ProductsScreen() {

    const path = "api/products?search=";
    
    

    const [productResponse, setProductsResponse] = useState(null);
    const [searchResponse] = useState(null);

    const onSearch = (e) => {
        e.preventDefault();
        const search = e.target.value;
        const url = path + search;
        

        axios.get(url).then((response) => {
            setProductsResponse(response?.data);
        });

        console.log(productResponse);

        

    };

    

    useEffect(() => {

        
        axios.get(path).then((response) => {
            setProductsResponse(response?.data);
        });

    }, []);

    console.log(productResponse);


    return(

        
        
        <div>

            {!productResponse ? "is null" : <ul>{productResponse.map(x => <li key={x.id}>{x.name}</li>)}</ul>}
            

            


            
          <TextField
            type="text"
            className="form-control"
            name="Search"
            value={searchResponse}
            onChange={onSearch}
            
          />

            
          
        




        </div>

    )

}