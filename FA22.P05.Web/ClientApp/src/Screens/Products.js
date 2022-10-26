import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function ProductsScreen() {

    const [productResponse, setProductsResponse] = useState(null);

    useEffect(() => {

        axios.get('/api/products?').then((response) => {
            setProductsResponse(response?.data);
          });

    }, []);

    console.log(productResponse);


    return(
        
        <div>

            {!productResponse ? "is null" : <ul>{productResponse.map(x => <li key={x.id}>{x.name}</li>)}</ul>}


        </div>

    )

}