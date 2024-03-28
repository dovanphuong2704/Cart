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
        if (cartProducts?.findIndex((item: IProduct) => item.id === data.id) === -1) {
            const temporary = [...cartProducts]
            temporary.push(data)
            setCartProducts(temporary)
        } else {
            const idx = cartProducts?.findIndex((item: IProduct) => item.id == data.id)
            alert('Sản phẩm đã có trong giỏ hàng'); 
        }
    }

    return (
        <table className={cx("shop-item")}>
            <tbody>
                <tr key={data.id} className={cx("product-item", { "out-of-stock": data.quantity === 0 })}>
                    <td>
                        <img src={data.image} alt={data.name} className={cx("product-image")} />
                    </td>
                    <td className={cx("container-product")}>
                        <div className={cx("product-info")}>
                            <p className={cx("product-name")}>{data.name}</p>
                            <span className={cx("product-description")}>{data.description}</span>
                        </div>
                    </td>
                    <td className={cx("container-quantity")}>
                        <div className={cx("product-price")} > ${data.price} / con</div>
                        {data.quantity === 0 ? (
                            <div className={cx("product-quantity")} style={{ color: '#8B0000' }}>Đã hết hàng</div>
                        ) : (
                            <div className={cx("product-quantity")}>Số lượng hàng: {data.quantity}</div>
                        )}
                        <div className={cx("product-actions")}>
                            {data.quantity > 0 ? (
                                <button onClick={() => handleAddToCart()}>Thêm vào giỏ hàng</button>
                            ) : (
                                <button className={cx("out-of-stock")} disabled>Thêm vào giỏ hàng</button>
                            )}
                        </div>
                    </td>
                </tr>
            </tbody >
        </table >

    )
}

export default ShopItem
