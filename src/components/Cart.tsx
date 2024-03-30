import { useEffect, useState } from "react"
import { LocalStorageKeys, useLocalStorage } from "../utils/useLocalStorage"
import { IProduct } from "../types/Types"
import CartItem from './items/CartItem'
import styles from "./Cart.module.scss"
import classNames from "classnames/bind"
import { ThreeCircles } from "react-loader-spinner"

const cx = classNames.bind(styles)

const Cart = () => {
    const [cartProducts, setCartProducts] = useLocalStorage(LocalStorageKeys.CART_PRODUCTS)
    const [isQRLoading, setIsQRLoading] = useState(true)
    const [hasProducts, setHasProducts] = useState(false);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        if (cartProducts && cartProducts.length > 0) {
            setHasProducts(true);
        } else {
            setHasProducts(false);
        }
        setIsQRLoading(false)
    }, [cartProducts]);

    useEffect(() => {
        if (hasProducts) {
            setShowQR(true);
        } else {
            setShowQR(false);
        }
    }, [hasProducts]);

    return (
        <div className={cx("container-cart")}>
            <h1>Giỏ hàng Pokémon</h1>
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
                    {hasProducts ? (
                        cartProducts != null && cartProducts.map((item: IProduct, index: number) => (
                            <CartItem
                                key={item.id}
                                dataCart={item}
                            />
                        ))
                    ) : (
                        <tr>
                            <td style={{ margin: '20px' }} colSpan={6}><strong >Chưa có sản phẩm nào trong giỏ hàng.</strong></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <p style={{ marginTop: '40px', textAlign: 'left' }}>
                Có tất cả <strong style={{ color: 'red' }}>{cartProducts?.reduce((total, item) => total + item.quantity, 0)}</strong> sản phẩm trong giỏ hàng.
                Tổng số tiền: <strong style={{ color: 'red' }}>${cartProducts?.reduce((total, item) => total + item.price * item.quantity, 0)}</strong>
            </p>

            {showQR && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <h3>Vui lòng quét mã QR dưới đây để thanh toán mua hàng:</h3>
                    <div style={{ padding: 8, borderRadius: 8, borderWidth: 3, borderStyle: 'solid', borderColor: '#ccc', margin: '20px' }}>
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
                            onLoad={() => {
                                setIsQRLoading(false)
                            }}
                            alt="QR Code"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
