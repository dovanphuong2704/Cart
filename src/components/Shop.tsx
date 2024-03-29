import ShopController from "../controllers/ShopController"
import { IProduct } from "../types/Types"
import { LocalStorageKeys, useLocalStorage } from "../utils/useLocalStorage"
import ShopItem from "./items/ShopItem"
import classNames from "classnames/bind"
import styles from "./shop.module.scss"
import CreateProduct from './items/CreateProduct'


const cx = classNames.bind(styles)

const Shop = () => {
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)

    return (
        <div>
            <h1>Danh sách sản phẩm Pokémon</h1>
            <ShopController />
            <CreateProduct />

            {shopProducts != null && shopProducts.map((item: IProduct, index: number) => {
                return (
                    <div className={cx("container-list")} key={index} >
                        <ShopItem
                            key={item.id}
                            data={item}
                        />
                    </div>
                )
            })}
            {shopProducts && shopProducts.length === 0 && (
                <div className={cx("empty-list")}>Không có sản phẩm</div>
            )}
        </div>

    )
}

export default Shop