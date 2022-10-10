
import { Typography } from "@mui/material"
import { WebAppBar } from "../Components/AppBar"
// import ProductCard from "../Components/ProductCard"
export function ProductListItem(props) {
    return (
        <div color="#B5DDA4">
            <Typography> {`List Item ${props.id} `}</Typography>

        </div>

    )
}
