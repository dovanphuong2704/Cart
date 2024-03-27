import { IProduct } from "../../types/Types"
import { LocalStorageKeys, useLocalStorage } from "../../utils/useLocalStorage"
import styles from './ShopItem.module.scss'
import classNames from "classnames/bind"

const cx = classNames.bind(styles)
interface ShopItemProps {
    data: IProduct
}
const ShopItem = ({ data }: ShopItemProps) => {
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)

    const handleAddToCart = () => {
        // Nếu sản phẩm này chưa có trong giỏ hàng
        if (cartProducts?.findIndex((item: IProduct) => item.id == data.id) == -1) {
            const temporary = [...cartProducts]
            temporary.push(data)
            setCartProducts(temporary)
        } else {
            const idx = cartProducts?.findIndex((item: IProduct) => item.id == data.id)
            console.log(idx)
        }
    }

    return (
        <div></div>
    )
}

export default ShopItem