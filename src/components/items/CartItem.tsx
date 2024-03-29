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
    const [newQuantity, setNewQuantity] = useState<number>(dataCart.quantity)
    const [remainingQuantity, setRemainingQuantity] = useState<number>(0)


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
    const handleDelete = () => {
        if (cartProducts !== null) {
            const updatedCartProducts = cartProducts.filter(product => product.id !== dataCart.id);
            setCartProducts(updatedCartProducts);
        }
    }
    const handleUpdate = () => {
        if (newQuantity <= shopItem.quantity) {

            const updatedShopProducts = [...shopProducts || []]
            const idx = updatedShopProducts.findIndex(product => product.id === dataCart.id);
            const remainingQuantity = idx !== -1 ? updatedShopProducts[idx].quantity - newQuantity : 0;
            if (idx !== -1) {
                const updatedProductCopy = { ...updatedShopProducts[idx] };
                updatedProductCopy.quantity = remainingQuantity;
                updatedShopProducts[idx] = updatedProductCopy;
                setShopProducts(updatedShopProducts);
                setRemainingQuantity(remainingQuantity);
                if (cartProducts !== null) {
                    const updatedProductIndex = cartProducts.findIndex(product => product.id === dataCart.id);
                    const updatedProduct = { ...cartProducts[updatedProductIndex] };
                    updatedProduct.quantity = newQuantity;
                    const updatedCartProducts = [...cartProducts];
                    updatedCartProducts[updatedProductIndex] = updatedProduct;
                    setCartProducts(updatedCartProducts);

                }
            }

            alert("Đã cập nhật thành công")
        } else {
            alert("Không đủ số lượng hàng");
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
                    <td className={cx("cart-product-name")}>
                        {dataCart.name} <br />
                        Còn: {shopItem.quantity}
                    </td>
                    <td className={cx("cart-product-price")}>${dataCart.price}</td>
                    <td className={cx("cart-product-quantity")}>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={newQuantity.toString()}
                            onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                            min="1"

                        />
                    </td>
                    <td className={cx("cart-product-total")}>${dataCart.price * dataCart.quantity}</td>
                    <td className={cx("cart-product-action")}>
                        <button className={cx("button-cart-update")} onClick={handleUpdate}>update</button>

                        <button className={cx("button-cart-delete")} onClick={handleDelete}>Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}

export default CartItem;