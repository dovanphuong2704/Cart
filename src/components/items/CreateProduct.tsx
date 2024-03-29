import { useState } from "react";
import { IProduct } from "../../types/Types";
import { LocalStorageKeys, useLocalStorage } from "../../utils/useLocalStorage";
import styles from './CreateProduct.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CreateProduct = () => {
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState<IProduct>({
        id: Number(''),
        name: '',
        price: 0,
        description: '',
        image: '',
        quantity: 0
    });

    const generateNewId = () => {
        if (shopProducts) {
            const maxId = Math.max(...shopProducts.map(product => product.id));
            return maxId + 1;
        } else {
            return 1;
        }
    };

    const addNewProductToList = () => {
        const newId = generateNewId();
        const temporaryShopProducts = [...shopProducts || [], { ...newProduct, id: newId }];
        setShopProducts(temporaryShopProducts);
        setShowAddProductForm(false);
    };

    console.log(newProduct);


    return (
        <>
            <button className={cx("button-new")} onClick={() => setShowAddProductForm(!showAddProductForm)}>
                {showAddProductForm ? "Đóng form" : "Thêm sản phẩm mới"}
            </button>
            {
                showAddProductForm && (
                    <div className={cx("new-product-form")}>
                        <h2>Thêm sản phẩm mới</h2>
                        <form>
                            <label>
                                Tên sản phẩm:
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </label>
                            <label>
                                Giá: 
                                <input
                                    type="text"
                                    value={newProduct.price}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '' || /^\d*$/.test(value)) { // Kiểm tra xem giá trị nhập vào có phải là số không
                                            const price = value === '' ? 0 : parseInt(value); // Chuyển đổi giá trị thành số nguyên
                                            setNewProduct({ ...newProduct, price });
                                        }
                                    }}
                                />

                            </label>
                            <label>
                                Mô tả:
                                <input
                                    type="text"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                            </label>
                            <label>
                                Đường dẫn hình ảnh:
                                <input
                                    type="text"
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                />
                            </label>
                            <label>
                                Số lượng:
                                <input
                                    type="text"
                                    value={newProduct.quantity}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '' || /^\d*$/.test(value)) { // Kiểm tra xem giá trị nhập vào có phải là số không
                                            const quantity = value === '' ? 0 : parseInt(value); // Chuyển đổi giá trị thành số nguyên
                                            setNewProduct({ ...newProduct, quantity });
                                        }
                                    }}
                                />

                            </label>
                            <button onClick={() => addNewProductToList()} type="button">Thêm sản phẩm</button>
                        </form>
                    </div>
                )
            }
        </>

    );
}

export default CreateProduct;
