import { useMemo, useState } from "react"
import { IProduct } from "../../types/Types"
import { LocalStorageKeys, useLocalStorage } from "../../utils/useLocalStorage"
import styles from './ShopItem.module.scss'
import classNames from "classnames/bind"
import { toast } from "react-toastify"
import { Button } from "antd";

const cx = classNames.bind(styles)
interface ShopItemProps {
    data: IProduct
}
const ShopItem = ({ data }: ShopItemProps) => {
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [showDetails, setShowDetails] = useState(false);
    const handleAddToCart = () => {
        setShowDetails(true);
    };

    const cartItem: IProduct = useMemo(() => {
        const DUMMY_DATA = {
            id: -1,
            name: '',
            description: '',
            quantity: 0,
            image: '',
            price: 0
        }
        if (!cartProducts) return DUMMY_DATA
        const result = cartProducts.filter((product) => product.id === data.id)[0]
        return result || DUMMY_DATA
    }, [data, cartProducts])


    const handleConfirm = () => {
        // Nếu sản phẩm này chưa có trong giỏ hàng
        if (cartProducts?.findIndex((item: IProduct) => item.id === data.id) === -1) {
            const temporary = [...cartProducts]
            const temporaryData = JSON.parse(JSON.stringify(data))
            temporaryData.quantity = 1;
            temporary.push(temporaryData)
            setCartProducts(temporary)
            setShowDetails(false);

            toast('Đã thêm vào giỏ hàng!', { type: 'success', theme: 'colored' })
        } else {
            toast('Sản phẩm đã có trong giỏ hàng!', { type: 'error', theme: 'colored' })
        }
    }
    const handleDelete = () => {
        if (shopProducts !== null) {
            const updatedCartProducts = shopProducts.filter(product => product.id !== data.id);
            setShopProducts(updatedCartProducts);

            toast("Đã xóa thành công!", { type: 'success', theme: 'colored' })
        }
    }

    const handleCancel = () => {
        setShowDetails(false);
    };


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
                            <div className={cx("product-quantity")}>Số lượng hàng: {data.quantity - cartItem.quantity}</div>
                        )}
                        <div className={cx("product-actions")}>
                            {data.quantity > 0 ? (
                                <Button onClick={() => handleAddToCart()}>Thêm vào giỏ hàng</Button>
                            ) : (
                                <Button className={cx("out-of-stock")} disabled>Thêm vào giỏ hàng</Button>
                            )}
                        </div>
                        <Button onClick={handleDelete} danger type='primary'>Xóa</Button>

                    </td>
                </tr>
            </tbody >
            {showDetails && (
                <tfoot>
                    <tr>
                        <td colSpan={3}>
                            <div className={cx("product-details")}>
                                <p>Chi tiết sản phẩm: <strong>{data.name}</strong></p>
                                <p>Giá: ${data.price}</p>
                                <p>Mô tả: {data.description}</p>
                                <div className={cx("two-button")}>
                                    <Button onClick={handleConfirm}>Xác nhận</Button>
                                    <Button onClick={handleCancel}>Hủy</Button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>

            )}
        </table >

    )
}

export default ShopItem
