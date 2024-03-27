import ShopController from "../controllers/ShopController"
import { IProduct } from "../types/Types"
import { LocalStorageKeys, useLocalStorage } from "../utils/useLocalStorage"
import ShopItem from "./items/ShopItem"

const Shop = () => {
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)

    return (
        <div>
            <ShopController />
            <h1>Shop</h1>
            {shopProducts != null && shopProducts.map((item: IProduct, index: number) => {
                return (
                    <ShopItem 
                        key={item.id}
                        data={item}
                    />
                )
            })}
        </div>
    )
}

export default Shop