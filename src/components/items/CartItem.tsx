import { IProduct } from "../../types/Types"
import  { useState } from 'react';
import { LocalStorageKeys, useLocalStorage } from "../../utils/useLocalStorage"
import styles from './CartItem.module.scss'
import classNames from "classnames/bind"
const cx = classNames.bind(styles)
interface ShopItemProps {
    dataCart: IProduct
}
const CartItem = ({ dataCart }: ShopItemProps) => {
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [quantity, setQuantity] = useState(1);
    const handleIncrement = () => {
        if (quantity < dataCart.quantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else {
            alert('Đã hết sản phẩm');
        }
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const handleDelete = () => {
        if (cartProducts !== null) {
            const updatedCartProducts = cartProducts.filter(product => product.id !== dataCart.id);
            setCartProducts(updatedCartProducts);
        }
    }


  
    return (
        <table className={cx("cart-item")}>
            <thead>
                <tr>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={cx("cart-product-image-cell")}>
                        <img className={cx("cart-product-image")} src={dataCart.image} alt={dataCart.name} />
                    </td>
                    <td className={cx("cart-product-name")}>{dataCart.name} <br /> Còn: {dataCart.quantity - quantity} </td>
                    <td className={cx("cart-product-price")}>${dataCart.price}</td>
                    <td className={cx("cart-product-quantity")}>
                        <div>{quantity}</div>
                        <button className={cx("button-cart-minus")} onClick={handleDecrement}>-</button>
                        <button className={cx("button-cart-plus")} onClick={handleIncrement}>+</button>
                    </td>
                    <td className={cx("cart-product-total")}>${ dataCart.price * quantity}</td>
                    <td className={cx("cart-product-action")}>
                        <button className={cx("button-cart-delete")} onClick={handleDelete}>Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}

export default CartItem