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
            const temporaryData = JSON.parse(JSON.stringify(data))
            temporaryData.quantity = 1;
            temporary.push(temporaryData)
            setCartProducts(temporary)
        } else {
            const temporary = JSON.parse(JSON.stringify(cartProducts || []))
            const idx = cartProducts?.findIndex((item: IProduct) => item.id == data.id)
            if (idx != undefined && idx != -1) {
                if (temporary[idx].quantity < data.quantity) {
                    temporary[idx].quantity = temporary[idx].quantity + 1
                } else { // Nếu sản phẩm hêt hàng (Số lượng trong giỏ hàng vượt quá hàng tồn kho)
                    alert('Hết hàng!')
                }
            }
            setCartProducts(temporary)
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
