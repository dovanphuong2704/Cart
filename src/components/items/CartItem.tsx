import { IProduct } from "../../types/Types"
import { useMemo, useState } from 'react';
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

    const shopItem: IProduct = useMemo(() => {
        const DUMMY_DATA = {
            id: -1,
            name: '',
            description: '',
            quantity: 0,
            image: '',
            price: 0
        }
        if (shopProducts == null) return DUMMY_DATA
        const result = shopProducts.filter((product) => product.id == dataCart.id)[0]
        if (result != undefined) {
            return result
        }
        return DUMMY_DATA
    }, [dataCart, shopProducts])

    const updateQuantity = (newQuantity: number) => {
        const idx = cartProducts?.findIndex(item => item.id == dataCart.id)
        if (idx == undefined) return;

        const newCart = JSON.parse(JSON.stringify([...cartProducts || []]));
        newCart[idx].quantity = newQuantity;
        setCartProducts(newCart);
    };


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
                    <td className={cx("cart-product-name")}>{dataCart.name} <br /> Còn: {shopItem && shopItem?.quantity - dataCart.quantity} </td>
                    <td className={cx("cart-product-price")}>${dataCart.price}</td>
                    <td className={cx("cart-product-quantity")}>
                    <div>{dataCart.quantity}</div>
                                        <button className='buton-cart' onClick={() => updateQuantity(Math.max(dataCart.quantity - 1, 1))}>-</button>
                                        <button className='buton-cart' onClick={() => {
                                            if (dataCart.quantity >= shopItem.quantity) {
                                                alert('Hết hàng!');
                                            } else {
                                                updateQuantity(dataCart.quantity + 1);
                                            }
                                        }}>+</button>
                    </td>
                    <td className={cx("cart-product-total")}>${dataCart.price * dataCart.quantity}</td>
                    <td className={cx("cart-product-action")}>
                        <button className={cx("button-cart-delete")} onClick={handleDelete}>Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}

export default CartItem;