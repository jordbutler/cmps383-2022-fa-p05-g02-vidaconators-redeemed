
import { ProductListItem } from "./ProductListItem";
export function ProductList() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <div color="#B5DDA4">
            {array.map((player, key) => {
                return <ProductListItem id={key} key={key} />;
            })}


        </div>

    )
}
