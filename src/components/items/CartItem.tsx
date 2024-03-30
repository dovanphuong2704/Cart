import { IProduct } from "../../types/Types"
import { useEffect, useMemo, useState } from 'react';
import { LocalStorageKeys, useLocalStorage } from "../../utils/useLocalStorage"
import styles from './CartItem.module.scss'
import classNames from "classnames/bind"
import { toast } from "react-toastify";
const cx = classNames.bind(styles)
import { Button, InputNumber } from "antd";

interface ShopItemProps {
    dataCart: IProduct
}

const CartItem = ({ dataCart }: ShopItemProps) => {
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [newQuantity, setNewQuantity] = useState<number>(dataCart.quantity)
    const shopItem: IProduct = useMemo(() => {
        const DUMMY_DATA = {
            id: -1,
            name: '',
            description: '',
            quantity: 0,
            image: '',
            price: 0
        }
        if (!shopProducts) return DUMMY_DATA
        const result = shopProducts.filter((product) => product.id === dataCart.id)[0]
        return result || DUMMY_DATA
    }, [dataCart, shopProducts])

    const handleDelete = () => {
        if (cartProducts) {
            const updatedCartProducts = cartProducts.filter(product => product.id !== dataCart.id)
            setCartProducts(updatedCartProducts)

            toast("Đã xóa thành công!", { type: 'success', theme: 'colored' })

        }
    }


    // khi xóa trong list của shop thì trong giỏ hàng cũng không có
    useEffect(() => {
        if (cartProducts && shopProducts) {
            const isProductInShop = shopProducts.some(shopProduct => shopProduct.id === dataCart.id);
            if (!isProductInShop) {
                const updatedCartProducts = cartProducts.filter(product => product.id !== dataCart.id);
                setCartProducts(updatedCartProducts);
            }
        }
    }, [cartProducts, shopProducts, dataCart.id, setCartProducts]);


    const handleUpdate = () => {
        if (newQuantity <= shopItem.quantity) {
            const updatedCartProducts: IProduct[] = cartProducts?.map(product => {
                if (product.id === dataCart.id) {
                    return { ...product, quantity: newQuantity };
                }
                return product;
            }) || [];
            setCartProducts(updatedCartProducts);

            toast('Đã cập nhật thành công!', { type: 'success', theme: 'colored' })
        } else {
            toast('Không đủ số lượng hàng!', { type: 'error', theme: 'colored' })
        }
    }

    return (
        <tr style={{height: "140px", border: '1px solid #ccc'}}>
            <td className={cx("cart-product-image-cell")}>
                <img className={cx("cart-product-image")} src={dataCart.image} alt={dataCart.name} />
            </td>
            <td className={cx("cart-product-name")}>
                {dataCart.name} <br />
                Còn: {shopItem.quantity - dataCart.quantity}
            </td>
            <td className={cx("cart-product-price")}>${dataCart.price}</td>
            <td className={cx("")} style={{ textAlign: "center" }}>
                <InputNumber
                    id="quantity"
                    name="quantity"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e || 1)}
                    min={1}
                />
            </td>
            <td className={cx("cart-product-total")}>${dataCart.price * dataCart.quantity}</td>
            <td className={cx("cart-product-action")}>
                <Button className={cx("button-cart-update")} onClick={handleUpdate} type='primary' style={{ marginRight: 8 }}>Cập nhật</Button>
                <Button className={cx("")} onClick={handleDelete} type='primary' danger>Xóa</Button>
            </td>
        </tr>
    )
}

export default CartItem;
