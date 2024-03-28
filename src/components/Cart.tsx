import { useEffect, useState } from "react"
import { LocalStorageKeys, useLocalStorage } from "../utils/useLocalStorage"
import { IProduct } from "../types/Types"
import CartItem from "./items/CartItem"
import styles from "./Cart.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

const Cart = () => {
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)
    const [priceSum, setPriceSum] = useState(0)
    const [hasProducts, setHasProducts] = useState(false);


    useEffect(() => {
        if (cartProducts && cartProducts.length > 0) {
            setHasProducts(true);
        } else {
            setHasProducts(false);
        }
    }, [cartProducts]);

    useEffect(() => {
        // if (cartProducts == null) return;

        // let sum = 0;

        // console.log(cartProducts)
        // cartProducts.map((product) => {
        //     sum += 
        // })
    }, [])


    return (

        <div className={cx("container-cart")}>
            <h1>Giỏ hàng Pokémon</h1>
            {hasProducts ? (
                cartProducts != null && cartProducts.map((item: IProduct, index: number) => {
                    return (
                        <div className={cx("container-cart-item")} key={index} >
                            <CartItem
                                key={item.id}
                                dataCart={item}
                            />

                        </div>
                    )

                })

            ) : (
                <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
            )}
                <p style={{ marginTop: '40px' }}>Tổng tiền:  ${cartProducts?.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
            <div className="cart-total" style={{ marginTop: '40px', textAlign: 'right' }}>
                <button className='button-pay'>Thanh toán</button>
            </div>
        </div>

    )
}

export default Cart