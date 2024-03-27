import { useEffect } from "react"
import { LocalStorageKeys, useLocalStorage } from "../utils/useLocalStorage"

const Cart = () => {
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)

    return (
        <h1>Cart</h1>
    )
}

export default Cart