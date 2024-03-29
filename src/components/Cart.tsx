import { useEffect, useState } from "react"
import { LocalStorageKeys, useLocalStorage } from "../utils/useLocalStorage"
import { IProduct } from "../types/Types"
import CartItem from "./items/CartItem"
import styles from "./Cart.module.scss"
import classNames from "classnames/bind"
import QRCode from 'qrcode'
import { ThreeCircles } from "react-loader-spinner"

const cx = classNames.bind(styles)

const Cart = () => {
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)
    const [priceSum, setPriceSum] = useState(0)
    const [isQRLoading, setIsQRLoading] = useState(true)
    const [hasProducts, setHasProducts] = useState(false);
    const [showQR, setShowQR] = useState(false); // State để kiểm tra hiển thị mã QR

    useEffect(() => {
        if (cartProducts && cartProducts.length > 0) {
            setHasProducts(true);
        } else {
            setHasProducts(false);
        }
        setIsQRLoading(true)
    }, [cartProducts]);

    useEffect(() => {
        // Kiểm tra nếu có sản phẩm trong giỏ hàng thì hiển thị mã QR
        if (hasProducts) {
            setShowQR(true);
        } else {
            setShowQR(false);
        }
    }, [hasProducts]);

    const handleGenerateQRCode = () => {
        window.location.href = `https://img.vietqr.io/image/MB-0566181526-qr_only.png?amount=${cartProducts?.reduce((total, item) => total + item.price * item.quantity * 23000, 0)}`
    }

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
            {showQR && (

                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <h3>Vui lòng quét mã QR dưới đây để thanh toán mua hàng:</h3>

                    <div style={{ padding: 8, borderRadius: 8, borderWidth: 3, borderStyle: 'solid', borderColor: '#ccc' }}>
                        <ThreeCircles
                            visible={isQRLoading}
                            height="200"
                            width="200"
                            color="#4fa94d"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        <img
                            src={`https://img.vietqr.io/image/MB-0566181526-qr_only.png?amount=${cartProducts?.reduce((total, item) => total + item.price * item.quantity * 23000, 0)}`}
                            style={{ width: '200px', height: '200px', display: isQRLoading ? 'none' : 'block' }}
                            onLoad={(e) => {
                                setIsQRLoading(false)
                            }}
                        />
                    </div>
                </div>
            )}
            <div className="cart-total" style={{ marginTop: '40px', textAlign: 'right' }}>
            </div>
        </div>
    )
}

export default Cart
